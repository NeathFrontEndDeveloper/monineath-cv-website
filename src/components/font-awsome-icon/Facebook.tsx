"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function Facebook({ className }: { className?: string }) {
  return <FontAwesomeIcon icon={faFacebook} className={className} />;
}
