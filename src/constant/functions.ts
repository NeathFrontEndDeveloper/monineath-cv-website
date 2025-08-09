import { useEffect, useState } from "react";
import { titles } from "./data";
import { useRouter } from "next/navigation";
import { skillsData } from "./data";

export const useTypingEffect = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const currentTitle = titles[currentIndex];

    const timer = setTimeout(
      () => {
        if (typing) {
          if (text.length < currentTitle.length) {
            setText(currentTitle.slice(0, text.length + 1));
          } else {
            setTimeout(() => setTyping(false), 1000);
          }
        } else {
          if (text.length > 0) {
            setText(text.slice(0, -1));
          } else {
            setTyping(true);
            setCurrentIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      typing ? 100 : 50
    );

    return () => clearTimeout(timer);
  }, [text, typing, currentIndex]);

  return text;
};

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
