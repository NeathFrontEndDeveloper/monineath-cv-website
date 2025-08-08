"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Email({ className }: { className?: string }) {
  return <FontAwesomeIcon icon={faEnvelope} className={className} />;
}
