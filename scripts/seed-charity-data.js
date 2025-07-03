const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed charity data...');

  // Create charity stats
  const stats = [
    {
      key: 'families_supported',
      value: '1,250',
      label: 'Families Supported',
      description: 'Direct assistance to Armenian families in need',
      icon: 'Users',
      color: 'from-red-500 to-red-600'
    },
    {
      key: 'children_helped',
      value: '3,400',
      label: 'Children Helped',
      description: 'Educational and healthcare support for Armenian children',
      icon: 'Heart',
      color: 'from-blue-500 to-blue-600'
    },
    {
      key: 'total_distributed',
      value: '$485K',
      label: 'Total Distributed',
      description: 'Verified charitable contributions to date',
      icon: 'TrendingUp',
      color: 'from-amber-500 to-amber-600'
    },
    {
      key: 'partner_organizations',
      value: '45',
      label: 'Partner Organizations',
      description: 'Verified Armenian charitable organizations',
      icon: 'Building',
      color: 'from-green-500 to-green-600'
    }
  ];

  // Create charity projects
  const projects = [
    {
      title: 'Artsakh Family Emergency Relief',
      date: new Date('2024-12-01'),
      amount: '$125,000',
      beneficiaries: '350 families',
      description: 'Emergency housing and food assistance for displaced families from Artsakh.',
      status: 'COMPLETED',
      image: '🏠'
    },
    {
      title: 'Children\'s Education Program',
      date: new Date('2024-11-01'),
      amount: '$85,000',
      beneficiaries: '500 children',
      description: 'School supplies, books, and educational technology for Armenian children.',
      status: 'ONGOING',
      image: '📚'
    },
    {
      title: 'Healthcare Support Initiative',
      date: new Date('2024-10-01'),
      amount: '$95,000',
      beneficiaries: '200 families',
      description: 'Medical assistance and healthcare coverage for families in need.',
      status: 'COMPLETED',
      image: '🏥'
    },
    {
      title: 'Winter Clothing Drive',
      date: new Date('2024-09-01'),
      amount: '$45,000',
      beneficiaries: '800 individuals',
      description: 'Warm clothing and winter supplies for Armenian families.',
      status: 'COMPLETED',
      image: '🧥'
    }
  ];

  // Create charity partners
  const partners = [
    {
      name: 'Armenian Relief Society',
      focus: 'Family Support & Emergency Aid',
      established: '1910',
      description: 'Providing comprehensive support to Armenian families worldwide.'
    },
    {
      name: 'Fund for Armenian Relief',
      focus: 'Healthcare & Education',
      established: '1993',
      description: 'Supporting healthcare and educational initiatives in Armenia.'
    },
    {
      name: 'Artsakh Children\'s Fund',
      focus: 'Child Welfare',
      established: '2020',
      description: 'Dedicated to supporting children and families from Artsakh.'
    },
    {
      name: 'Armenian General Benevolent Union',
      focus: 'Community Development',
      established: '1906',
      description: 'Preserving Armenian identity and supporting community development.'
    }
  ];

  // Create charity allocations
  const allocations = [
    {
      category: 'Artsakh Families',
      percentage: 40,
      description: 'Direct support for displaced families from Artsakh',
      icon: '🏠'
    },
    {
      category: 'Children Education',
      percentage: 30,
      description: 'Educational programs and scholarships for Armenian children',
      icon: '📚'
    },
    {
      category: 'Healthcare Support',
      percentage: 20,
      description: 'Medical assistance and healthcare programs',
      icon: '🏥'
    },
    {
      category: 'Emergency Relief',
      percentage: 10,
      description: 'Emergency assistance for urgent community needs',
      icon: '🚨'
    }
  ];

  // Create admin user if it doesn't exist
  const adminEmail = 'admin@armeniancoin.org';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  let adminId;
  if (!existingAdmin) {
    console.log('Creating admin user...');
    try {
      const admin = await prisma.user.create({
        data: {
          email: adminEmail,
          name: 'Admin User',
          role: 'ADMIN',
          emailVerified: new Date(),
          // In a real app, you would hash the password
          password: '$2a$12$k8Y1Jq1rWpO/Vz/Jh/UOB.jvGJ3a.yMCbHJD4L.3LPwOzrZnK4N2O' // hashed 'password123'
          // Note: We're not setting walletAddress here to avoid the unique constraint issue
        }
      });
      adminId = admin.id;
      console.log('Admin user created with ID:', adminId);
    } catch (error) {
      console.error('Error creating admin user:', error);
      // If we can't create the admin, try to find an existing user to use
      const anyUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
      });
      
      if (anyUser) {
        adminId = anyUser.id;
        console.log('Using existing admin user with ID:', adminId);
      } else {
        throw new Error('Could not create or find an admin user');
      }
    }
  } else {
    adminId = existingAdmin.id;
    console.log('Admin user already exists with ID:', adminId);
  }

  // Insert stats
  console.log('Creating charity stats...');
  for (const stat of stats) {
    const existingStat = await prisma.charityStat.findUnique({
      where: { key: stat.key }
    });

    if (!existingStat) {
      await prisma.charityStat.create({
        data: stat
      });
      console.log(`Created stat: ${stat.key}`);
    } else {
      console.log(`Stat ${stat.key} already exists, skipping...`);
    }
  }

  // Insert projects
  console.log('Creating charity projects...');
  for (const project of projects) {
    // Check if project with same title and date exists
    const existingProject = await prisma.charityProject.findFirst({
      where: {
        title: project.title,
        date: project.date
      }
    });

    if (!existingProject) {
      await prisma.charityProject.create({
        data: {
          ...project,
          createdById: adminId
        }
      });
      console.log(`Created project: ${project.title}`);
    } else {
      console.log(`Project ${project.title} already exists, skipping...`);
    }
  }

  // Insert partners
  console.log('Creating charity partners...');
  for (const partner of partners) {
    // Check if partner with same name exists
    const existingPartner = await prisma.charityPartner.findFirst({
      where: {
        name: partner.name
      }
    });

    if (!existingPartner) {
      await prisma.charityPartner.create({
        data: partner
      });
      console.log(`Created partner: ${partner.name}`);
    } else {
      console.log(`Partner ${partner.name} already exists, skipping...`);
    }
  }

  // Insert allocations
  console.log('Creating charity allocations...');
  for (const allocation of allocations) {
    // Check if allocation with same category exists
    const existingAllocation = await prisma.charityAllocation.findFirst({
      where: {
        category: allocation.category
      }
    });

    if (!existingAllocation) {
      await prisma.charityAllocation.create({
        data: allocation
      });
      console.log(`Created allocation: ${allocation.category}`);
    } else {
      console.log(`Allocation ${allocation.category} already exists, skipping...`);
    }
  }

  console.log('Charity data seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding charity data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });