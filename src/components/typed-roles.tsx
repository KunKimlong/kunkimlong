"use client";

import { useEffect, useState } from "react";

export function TypedRoles({ roles }: { roles: readonly string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const typingSpeed = deleting ? 40 : 90;
    const atEnd = !deleting && text === current;
    const atStart = deleting && text === "";

    const timeout = setTimeout(() => {
      if (atEnd) {
        setTimeout(() => setDeleting(true), 1200);
        return;
      }
      if (atStart) {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
        return;
      }
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      setText(next);
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className="text-accent">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
