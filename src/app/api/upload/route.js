import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Define the file path where the skill data is saved
    const filePath = path.join(process.cwd(), 'public', 'skill.json');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ error: 'Skill file not found' }),
        { status: 404 }
      );
    }

    // Read the file and parse its contents
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const skills = JSON.parse(fileContent);

    // Insert skills into the Skill table
    const importedSkills = [];
    for (const skill of skills) {
      console.log(skill)
    
      const importedSkill = await prisma.skill.upsert({
        where: { id: skill.id }, // Check if the skill already exists by its ID
        update: {
          // Update fields if the skill exists (optional, you can skip this)
          name: skill.name,
          categoryId: skill.categoryId,
          updatedAt: new Date(skill.updatedAt),
        },
        create: {
          id: skill.id,
          name: skill.name,
          categoryId: skill.categoryId,
          createdAt: new Date(skill.createdAt),
          updatedAt: new Date(skill.updatedAt),
        },
      });

      
      importedSkills.push(importedSkill);
    }

    // Respond with a success message
    return new Response(
      JSON.stringify({
        message: 'Skills data successfully imported into the database!',
        skills: importedSkills,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error importing data:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to import skill data' }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
