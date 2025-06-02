import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
   // Seeding the database with initial data for the 2025 Formula 1 season
  // Create the 2025 season
    const season2025 = await prisma.season.create({
      data: {
          year: 2025,
          name: 'F1 2025 Season',
          races: {
            create: [
              {
                name: 'Australian Grand Prix',
                place: 'Melbourne',
                circuit: 'Albert Park Grand Prix Circuit',
                date: new Date('2025-03-16')
              },
              {
                name: 'Chinese Grand Prix',
                place: 'Shanghai',
                circuit: 'Shanghai International Circuit',
                date: new Date('2025-03-23')
              },
              {
                name: 'Japanese Grand Prix',
                place: 'Suzuka',
                circuit: 'Suzuka Circuit',
                date: new Date('2025-04-06')
              },
              {
                name: 'Bahrain Grand Prix',
                place: 'Sakhir',
                circuit: 'Bahrain International Circuit',
                date: new Date('2025-04-13')
              },
              {
                name: 'Saudi Arabian Grand Prix',
                place: 'Jeddah',
                circuit: 'Jeddah Corniche Circuit',
                date: new Date('2025-04-20')
              },
              {
                name: 'Miami Grand Prix',
                place: 'Miami',
                circuit: 'Miami International Autodrome',
                date: new Date('2025-05-04')
              },
              {
                name: 'Emilia Romagna Grand Prix',
                place: 'Imola',
                circuit: 'Autodromo Internazionale  Enzo e Dino Ferrari',
                date: new Date('2025-05-18')
              }
            ]
          }
      }
   });


  // Create McLaren team and drivers
  const mclarenTeam = await prisma.team.create({
    data: {
      name: "McLaren",
      fullName: "McLaren Formula 1 Team",
      country: "United Kingdom",
      teamChief: "Andrea Stella",
      entryYear: 1966,
      worldChamps: 9,
      active: true,
      logoUrl: "https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/mclaren",
    }
  });

  const maclarenDriver1 = await prisma.driver.create({
    data: {
      name: 'Oscar Piastri',
      number: 81,
      country: 'Australia',
      podiums: 18,
      birthDate: new Date('2001-04-06'),
      imageUrl: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/piastri",
      active: true,
      teamId: mclarenTeam.id,
    }
  });

  const maclarenDriver2 = await prisma.driver.create({
    data: {
      name: 'Lando Norris',
      number: 4,
      country: 'United Kingdom',
      podiums: 34,
      birthDate: new Date('1999-11-13'),
      imageUrl: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/norris",
      active: true,
      teamId: mclarenTeam.id,
    }
  });

  // Create Ferrari team and drivers
  const ferrariTeam = await prisma.team.create({
    data: {
      name: "Ferrari",
      fullName: "Scuderia Ferrari HP",
      country: "Italy",
      teamChief: "Frédéric Vasseur",
      entryYear: 1950,
      worldChamps: 16,
      active: true,
      logoUrl: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/ferrari",
    }
  });

  const ferrariDriver1 = await prisma.driver.create({
    data: {
      name: 'Charles Leclerc',
      number: 16,
      country: 'Monaco',
      podiums: 46,
      birthDate: new Date('1997-10-16'),
      imageUrl: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/leclerc",
      active: true,
      teamId: ferrariTeam.id,
    }
  });

  const ferrariDriver2 = await prisma.driver.create({
    data: {
      name: 'Lewis Hamilton',
      number: 44,
      country: 'United Kingdom',
      podiums: 202,
      worldChamps: 7,
      birthDate: new Date('1985-01-07'),
      imageUrl: "https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/drivers/2025Drivers/hamilton",
      active: true,
      teamId: ferrariTeam.id,
    }
  });

  // Create results for the Australian Grand Prix
  const races2025 = await prisma.race.findMany({
     where: { seasonId: season2025.id },
  });

  const australianRace2025 = races2025.find(race => race.name === 'Australian Grand Prix');
  if (!australianRace2025) {
    throw new Error("Australian Grand Prix race not found for 2025 season.");
  }

  await prisma.result.create({
    data: {
      position: 1,
      points: 25,
      time: '1:42:06.304',
      driverId: maclarenDriver2.id,
      raceId: australianRace2025.id
    }
  })

  // Create results for the Chinese Grand Prix
  const chineseRace2025 = races2025.find(race => race.name === 'Chinese Grand Prix');
  if (!chineseRace2025) {
    throw new Error("Chinese Grand Prix race not found for 2025 season.");
  }
  await prisma.result.createMany({
    data: [
      {
        position: 1,
        points: 25,
        time: '1:30:55.026',
        driverId: maclarenDriver1.id,
        raceId: chineseRace2025.id
      },
      {
        position: 2,
        points: 18,
        time: '+9.748s',
        driverId: maclarenDriver2.id,
        raceId: chineseRace2025.id
      }
    ]
  });

  console.log("🌱 Database seeded successfully.");
}

main()
  .catch(e => { 
    console.log(`Error: ${e}`);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
