import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const characters = [
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=640&q=80',
    name: 'Aria Voss',
    status: 'ALIVE',
    gender: 'FEMALE',
    description: 'An orbital botanist growing resilient gardens for the first Mars settlement.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=80',
    name: 'Bram Cole',
    status: 'DEAD',
    gender: 'MALE',
    description: 'A legendary deep-sea cartographer whose final maps changed marine science.',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=640&q=80',
    name: 'Celeste Rowan',
    status: 'ALIVE',
    gender: 'FEMALE',
    description: 'A museum conservator with a talent for identifying lost works of art.',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=640&q=80',
    name: 'Dorian Pike',
    status: 'UNKNOWN',
    gender: 'MALE',
    description: 'A missing signal engineer last seen investigating an impossible broadcast.',
  },
  {
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=640&q=80',
    name: 'Elara Finch',
    status: 'ALIVE',
    gender: 'FEMALE',
    description: 'A field linguist documenting endangered languages along remote trade routes.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=640&q=80',
    name: 'Felix Hart',
    status: 'DEAD',
    gender: 'MALE',
    description: 'A daring rescue pilot remembered for his calm during the Aurora storm.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=640&q=80',
    name: 'Gale Mercer',
    status: 'UNKNOWN',
    gender: 'UNKNOWN',
    description: 'An anonymous archivist who leaves meticulously indexed notes in public libraries.',
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80',
    name: 'Hana Idris',
    status: 'ALIVE',
    gender: 'FEMALE',
    description: 'A renewable-energy scientist building community microgrids across the coast.',
  },
  {
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=640&q=80',
    name: 'Ivo Grant',
    status: 'ALIVE',
    gender: 'MALE',
    description: 'A historian who reconstructs everyday life from damaged satellite records.',
  },
  {
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=640&q=80',
    name: 'Juniper Vale',
    status: 'UNKNOWN',
    gender: 'FEMALE',
    description: 'A quiet traveler whose journals describe towns that do not appear on any map.',
  },
  {
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=640&q=80',
    name: 'Kellan Moss',
    status: 'DEAD',
    gender: 'MALE',
    description: 'An urban ecologist who transformed abandoned rail yards into thriving wetlands.',
  },
  {
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&q=80',
    name: 'Lyra Sen',
    status: 'ALIVE',
    gender: 'FEMALE',
    description: 'A systems designer making complex civic services easier for everyone to use.',
  }
] as const;

async function main() {
  await prisma.character.deleteMany();
  await prisma.character.createMany({ data: characters });
  console.log(`Seeded ${characters.length} characters.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

