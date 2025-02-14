import { Prisma } from "@prisma/client";

export const fullUserInclude =(userId: string)=> Prisma.validator<Prisma.UserInclude>()({
  additionalInfo: true,
  userSkills: {
    where: {
      level: {
        gt: 0,
      },
    },
    include: {
      skill: true,
    },
    orderBy: {
      level: "desc",
    },
  },
  projects: {
    include:{
      project: {
        include: {
          profiles:{
            distinct: ["employeeId"]
          }
        }
      }
    }
  }
  
  
});


export const getFullUser = (userId: string) => ({
  where: { id: userId },
  include: fullUserInclude(userId),
});
