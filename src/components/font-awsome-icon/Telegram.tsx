"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

export default function Telegram({ className }: { className?: string }) {
  return <FontAwesomeIcon icon={faTelegram} className={className} />;
}
