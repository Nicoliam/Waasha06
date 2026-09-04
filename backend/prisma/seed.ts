import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Roles
  for (const role of [
    { code: 'CUSTOMER', name: 'Customer' },
    { code: 'PROVIDER', name: 'Provider' },
    { code: 'TRAINING_CENTRE', name: 'Training Centre' },
    { code: 'ADMIN', name: 'Admin' },
  ]) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {},
      create: role,
    });
  }

  // Provider tiers
  for (const tier of [
    { code: 'T1', name: 'Individual', sortOrder: 1 },
    { code: 'T2', name: 'Team', sortOrder: 2 },
    { code: 'T3', name: 'Business', sortOrder: 3 },
  ]) {
    await prisma.providerTier.upsert({
      where: { code: tier.code },
      update: {},
      create: tier,
    });
  }

  // Service categories — exactly 5 per blueprint
  for (const cat of [
    { code: 'BARBERS', name: 'Barbers', sortOrder: 1 },
    { code: 'HAIR_SALONS_STYLISTS', name: 'Hair Salons & Stylists', sortOrder: 2 },
    { code: 'NAIL_TECHNICIANS', name: 'Nail Technicians', sortOrder: 3 },
    { code: 'BEAUTY_SERVICES', name: 'Beauty Services', sortOrder: 4 },
    { code: 'CAR_WASH', name: 'Car Wash', sortOrder: 5 },
  ]) {
    await prisma.serviceCategory.upsert({
      where: { code: cat.code },
      update: {},
      create: cat,
    });
  }

  // Admin settings — radius vertical slice
  const settings: Array<{ settingKey: string; settingValue: string; valueType: string; description: string }> = [
    {
      settingKey: 'default_discovery_radius_km',
      settingValue: '10',
      valueType: 'NUMBER',
      description: 'Default customer discovery radius (km)',
    },
    {
      settingKey: 'max_discovery_radius_km',
      settingValue: '20',
      valueType: 'NUMBER',
      description: 'Absolute maximum customer discovery radius (km)',
    },
    {
      settingKey: 'allowed_customer_radii_km',
      settingValue: JSON.stringify([10, 15, 20]),
      valueType: 'JSON',
      description: 'Allowed customer discovery radii (km) — ordered expansion sequence',
    },
    {
      settingKey: 'allowed_provider_coverages_km',
      settingValue: JSON.stringify([10, 15, 20]),
      valueType: 'JSON',
      description: 'Allowed provider service coverage radii (km)',
    },
    {
      settingKey: 'max_provider_coverage_km',
      settingValue: '20',
      valueType: 'NUMBER',
      description: 'Absolute maximum provider coverage (km)',
    },
    {
      settingKey: 'default_platform_commission',
      settingValue: '25',
      valueType: 'NUMBER',
      description: 'Default platform commission % (configurable)',
    },
    {
      settingKey: 'max_service_images',
      settingValue: '3',
      valueType: 'NUMBER',
      description: 'Max images per service/style',
    },
    {
      settingKey: 'max_custom_request_images',
      settingValue: '3',
      valueType: 'NUMBER',
      description: 'Max images per custom request',
    },
  ];

  for (const s of settings) {
    await prisma.adminSetting.upsert({
      where: { settingKey: s.settingKey },
      update: { settingValue: s.settingValue, valueType: s.valueType, description: s.description },
      create: s,
    });
  }

  console.log('Seed completed: roles, tiers, categories, admin_settings');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
