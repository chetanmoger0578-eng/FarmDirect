import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Clearing existing data...');
    try {
        await prisma.product.deleteMany();
        await prisma.farmer.deleteMany();
        console.log('Database cleared. Ready for new registrations.');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
