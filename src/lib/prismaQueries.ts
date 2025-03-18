import { Prisma } from "@prisma/client";

export const fullUserInclude = (userId: string) =>
  Prisma.validator<Prisma.UserInclude>()({
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
        skill: {
          name: "asc",
        },
      },
    },
    projects: {
      where: {
        status: true,
      },
      include: {
        project: {
          include: {
            profiles: {
              distinct: ["employeeId"],
              include: {
                employee: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    },
  });

export const getFullUser = (userId: string) => ({
  where: { id: userId },
  include: fullUserInclude(userId),
});
