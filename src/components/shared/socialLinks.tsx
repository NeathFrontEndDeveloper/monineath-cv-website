import { socialLinks } from "@/constant/data";
import Link from "next/link";

const SocialLinks = () => {
  return (
    <>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <Link
            key={social.name}
            href={social.url}
            target={social.name !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-800/50 text-gray-400 hover:text-green-400 hover:bg-green-400/10 transition-all duration-300 hover:scale-110"
          >
            <Icon className="w-5 h-5" />
          </Link>
        );
      })}
    </>
  );
};

export default SocialLinks;
