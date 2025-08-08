"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Linkedin({ className }: { className?: string }) {
  return <FontAwesomeIcon icon={faLinkedin} className={className} />;
}
