import { Prisma } from "@prisma/client";

export const fullUserInclude = Prisma.validator<Prisma.UserInclude>()({
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
  projects: true,
  
});


export const getFullUser = (userId: string) => ({
  where: { id: userId },
  include: fullUserInclude,
});
