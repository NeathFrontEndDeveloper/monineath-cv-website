"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Github({ className }: { className?: string }) {
  return <FontAwesomeIcon icon={faGithub} className={className} />;
}
