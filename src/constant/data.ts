import { Code2, Database, Cloud, Palette } from "lucide-react";
import Telegram from "@/components/font-awsome-icon/Telegram";
import Facebook from "@/components/font-awsome-icon/Facebook";
import Linkedin from "@/components/font-awsome-icon/Linkedin";
import Email from "@/components/font-awsome-icon/Email";
import Github from "@/components/font-awsome-icon/Github";
import type { Education, Certification } from "@/types/education-type";

export const APP_NAME = " SOL MONINEATH";

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/NeathFrontEndDeveloper",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/sol-monineath-95b3ba345/",
    icon: Linkedin,
  },
  {
    name: "Facebook",
    url: "https://web.facebook.com/arata.daisuke.2025",
    icon: Facebook,
  },
  {
    name: "Telegram",
    url: "https://web.telegram.com/arata.daisuke.2025",
    icon: Telegram,
  },
  {
    name: "Email",
    url: "mailto:salmonineath31@gmail.com",
    icon: Email,
  },
];

// My skills data
export const skillsData = [
  {
    title: "Frontend Development",
    icon: Code2,
    color: "#00ff99",
    skills: [
      { name: "React", level: 95, color: "#61DAFB" },
      { name: "Next.js", level: 80, color: "#000000" },
      { name: "TypeScript", level: 70, color: "#3178C6" },
      { name: "JavaScript", level: 70, color: "#F7DF1E" },
      { name: "HTML5", level: 95, color: "#E34F26" },
      { name: "CSS3", level: 95, color: "#1572B6" },
      { name: "Tailwind CSS", level: 96, color: "#06B6D4" },
      //   { name: "Nuxt.js", level: 10, color: "#CC6699" },
    ],
  },
  {
    title: "Backend Development",
    icon: Database,
    color: "#ff6b6b",
    skills: [
      { name: "Node.js", level: 50, color: "#339933" },
      { name: "Express.js", level: 30, color: "#000000" },
      //   { name: "Python", level: 80, color: "#3776AB" },
      { name: "PostgreSQL", level: 60, color: "#336791" },
      { name: "MySQL", level: 40, color: "#336791" },
      //   { name: "MongoDB", level: 78, color: "#47A248" },
      //   { name: "REST APIs", level: 90, color: "#ff6b6b" },
      //   { name: "GraphQL", level: 75, color: "#E10098" },
    ],
  },
  //   {
  //     title: "Mobile Development",
  //     icon: Smartphone,
  //     color: "#a855f7",
  //     skills: [
  //       { name: "React Native", level: 83, color: "#61DAFB" },
  //       { name: "Flutter", level: 70, color: "#02569B" },
  //       { name: "iOS Development", level: 65, color: "#000000" },
  //       { name: "Android Development", level: 68, color: "#3DDC84" },
  //     ],
  //   },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "#f59e0b",
    skills: [
      //   { name: "AWS", level: 75, color: "#FF9900" },
      //   { name: "Docker", level: 80, color: "#2496ED" },
      //   { name: "Kubernetes", level: 65, color: "#326CE5" },
      //   { name: "CI/CD", level: 78, color: "#f59e0b" },
      { name: "Vercel", level: 85, color: "#000000" },
      //   { name: "Netlify", level: 85, color: "#00C7B7" },
    ],
  },
  {
    title: "Design & Tools",
    icon: Palette,
    color: "#ec4899",
    skills: [
      { name: "Figma", level: 75, color: "#F24E1E" },
      { name: "Adobe Illustrator", level: 90, color: "#FF61F6" },
      { name: "Git", level: 80, color: "#F05032" },
      { name: "VS Code", level: 95, color: "#007ACC" },
      { name: "Photoshop", level: 85, color: "#31A8FF" },
    ],
  },
];

export const education: Education[] = [
  {
    id: 1,
    field: "Graphic Design",
    institution: "Premier School of Technology",
    location: "Siem Reap, Cambodia",
    period: "2023 - 2024",
    description:
      "Focused on graphic design principles, creative tools, and visual communication techniques, with hands-on experience in branding and digital media.",
    achievements: ["Completed over 20 projects designing posters and logos."],
  },
  // {
  //   id: 2,
  //   field: "Software Engineering",
  //   institution: "University of California, Berkeley",
  //   location: "Berkeley, CA",
  //   period: "2016 - 2020",
  //   description:
  //     "Comprehensive program covering software development, algorithms, and system design with emphasis on practical application.",
  //   achievements: [
  //     "Summa Cum Laude graduate",
  //     "Outstanding Student in Computer Science Award",
  //     "Led university hackathon winning team",
  //   ],
  // },
];

export const certifications: Certification[] = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credential_id: "AWS-SA-2023-001234",
    description:
      "Professional-level certification demonstrating expertise in designing distributed systems on AWS.",
  },
  {
    id: 2,
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2022",
    credential_id: "GCP-PD-2022-005678",
    description:
      "Validates ability to build, test, and deploy applications on Google Cloud Platform.",
  },
  {
    id: 3,
    title: "Certified Kubernetes Administrator",
    issuer: "Cloud Native Computing Foundation",
    date: "2022",
    credential_id: "CKA-2022-009876",
    description:
      "Demonstrates skills in Kubernetes cluster administration and management.",
  },
];
