import { useRouter } from "next/navigation";
import { skillsData } from "./data";

export const useViewWork = () => {
  const router = useRouter();
  return () => {
    router.push("/project");
  };
};

export const useConnect = () => {
  const router = useRouter();
  return () => {
    router.push("/contact");
  };
};

export const useAboutMe = () => {
  const router = useRouter();
  return () => {
    router.push("/about");
  };
};

export const useSkills = () => {
  const router = useRouter();
  return () => {
    router.push("/skills");
  };
};

// Calculate Skill stats
export const totalSkills = skillsData.reduce(
  (total, category) => total + category.skills.length,
  0
);
export const expertSkills = skillsData.reduce(
  (total, category) =>
    total + category.skills.filter((skill) => skill.level >= 90).length,
  0
);

// Helper function to get skill level info
export const getSkillInfo = (level: number) => {
  if (level >= 90) return { color: "#00ff99", text: "Expert" };
  if (level >= 80) return { color: "#00d4ff", text: "Advanced" };
  if (level >= 70) return { color: "#fbbf24", text: "Intermediate" };
  return { color: "#f87171", text: "Beginner" };
};
