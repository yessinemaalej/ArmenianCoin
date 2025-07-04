import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { SiweMessage } from 'siwe'
import { getCsrfToken } from 'next-auth/react'
import { getAddress } from 'ethers'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email & Password Provider
    CredentialsProvider({
      id: 'credentials',
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        twoFactorCode: { label: '2FA Code', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        // Check 2FA if enabled
        if (user.twoFactorEnabled) {
          if (!credentials.twoFactorCode) {
            throw new Error('2FA code required')
          }

          const { verifyTwoFactorCode } = await import('./two-factor')
          const isValidCode = await verifyTwoFactorCode(user.id, credentials.twoFactorCode)
          
          if (!isValidCode) {
            throw new Error('Invalid 2FA code')
          }
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        })

        // Log successful login
        await prisma.loginHistory.create({
          data: {
            userId: user.id,
            method: 'EMAIL',
            success: true,
            timestamp: new Date()
          }
        })

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          role: user.role,
          walletAddress: user.walletAddress ?? undefined
        }
      }
    }),

    // Wallet Provider (SIWE)
    CredentialsProvider({
      id: 'ethereum',
      name: 'Ethereum',
      credentials: {
        message: { label: 'Message', type: 'text' },
        signature: { label: 'Signature', type: 'text' }
      },
      async authorize(credentials, req) {
        try {
          console.log('Ethereum auth provider called with credentials:', {
            message: credentials?.message ? 'present' : 'missing',
            signature: credentials?.signature ? 'present' : 'missing'
          })
          
          if (!credentials?.message || !credentials?.signature) {
            console.error('Message or signature missing')
            throw new Error('Message and signature required')
          }

          const siwe = new SiweMessage(JSON.parse(credentials.message))
          console.log('SIWE message parsed:', {
            address: siwe.address,
            domain: siwe.domain,
            statement: siwe.statement,
            uri: siwe.uri,
            version: siwe.version,
            chainId: siwe.chainId,
            nonce: siwe.nonce
          })
          
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!)
          console.log('NextAuth URL host:', nextAuthUrl.host)
          
          // Get CSRF token
          const csrfToken = await getCsrfToken({ req })
          console.log('CSRF token:', csrfToken)
          
          // Verify the signature
          console.log('Verifying SIWE message with options:', {
            signature: credentials.signature.substring(0, 10) + '...',
            domain: nextAuthUrl.host,
            nonce: csrfToken || 'no-csrf-token'
          })
          
          // Verify the signature without any address conversion
          const result = await siwe.verify({
            signature: credentials.signature,
            domain: nextAuthUrl.host,
            nonce: csrfToken
          })

          console.log('SIWE verification result:', result)

          if (!result.success) {
            console.error('SIWE verification failed:', result)
            throw new Error('Invalid signature')
          }

          // For database operations, always use lowercase
          const walletAddress = siwe.address.toLowerCase()
          console.log('Normalized wallet address (lowercase for DB):', walletAddress)

          // Find or create user with wallet
          let user = await prisma.user.findUnique({
            where: { walletAddress }
          })

          console.log('Existing user found?', !!user)

          if (!user) {
            console.log('Creating new user with wallet address')
            console.log(walletAddress)
            user = await prisma.user.create({
              data: {
                walletAddress,
                walletVerified: true,
                name: `User ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
              }
            })
            console.log(user)
            console.log('New user created:', user.id)
          } else {
            // Update last login and verify wallet
            console.log('Updating existing user:', user.id)
            await prisma.user.update({
              where: { id: user.id },
              data: { 
                lastLoginAt: new Date(),
                walletVerified: true
              }
            })
          }

          // Log successful login
          await prisma.loginHistory.create({
            data: {
              userId: user.id,
              method: 'WALLET',
              success: true,
              timestamp: new Date()
            }
          })
          console.log('Login history recorded')

          console.log('Auth successful, returning user:', {
            id: user.id,
            email: user.email || 'none',
            name: user.name || 'none',
            role: user.role,
            walletAddress: user.walletAddress
          })

          return {
            id: user.id,
            email: user.email ?? undefined,
            name: user.name ?? undefined,
            role: user.role,
            walletAddress: user.walletAddress ?? undefined
          }
        } catch (error) {
          console.error('Wallet auth error:', error)
          return null
        }
      }
    })
  ],
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, account }) {
      console.log('JWT callback called with:', {
        tokenSub: token.sub,
        userId: user?.id,
        accountType: account?.type
      })
      
      if (user) {
        token.role = user.role
        token.walletAddress = user.walletAddress
        console.log('Updated token with user data:', {
          role: user.role,
          walletAddress: user.walletAddress || 'none'
        })
      }
      return token
    },

    async session({ session, token }) {
      console.log('Session callback called with token sub:', token.sub)
      
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.walletAddress = token.walletAddress as string
        console.log('Updated session with token data:', {
          id: token.sub,
          role: token.role,
          walletAddress: token.walletAddress || 'none'
        })
      }
      return session
    }
  },

  pages: {
    signIn: '/auth/signin',
    //signUp: '/auth/signup',
    error: '/auth/error'
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log('Sign in event:', {
        userId: user.id,
        accountType: account?.type,
        isNewUser
      })
    },
    async signOut({ session, token }) {
      console.log('Sign out event for user:', token?.sub)
    }
  },
  
  debug: process.env.NODE_ENV === 'development',
}