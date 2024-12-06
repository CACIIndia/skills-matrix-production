import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Fetch data from staging database
    const certifications = await prisma.skillCategory.findMany();

    // Save data to a JSON file in the 'public' directory
    const filePath = path.join(process.cwd(), 'public', 'skillCategory.json');
    fs.writeFileSync(filePath, JSON.stringify(certifications, null, 2));

    // Respond with success message and file path
    return new Response(
      JSON.stringify({
        message: 'Data successfully exported!',
        filePath: '/public/certifications.json',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error exporting data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to export data' }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
