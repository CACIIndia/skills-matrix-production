import { SelectedSkill } from "@/components/views/profile/Skills";
import { UserSkill } from "@prisma/client";

const userSkillsMapper = (userSkills: UserSkill[]): SelectedSkill[] => {
  return userSkills.map((userSkill) => ({
    userId: userSkill.userId,
    skillId: userSkill.skillId,
    level: userSkill.level,
  }));
};

export default userSkillsMapper;
