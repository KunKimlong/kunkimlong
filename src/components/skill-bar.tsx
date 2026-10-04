"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { IconTypes } from "@/components/icon-types";

export function SkillBar({
  name,
  level,
  icon,
}: {
  name: string;
  level: number;
  icon?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = icon ? IconTypes[icon] : undefined;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setValue(level);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-foreground/90 flex items-center gap-1.5">
          {Icon && (
            <Icon className="text-accent h-3.5 w-3.5" aria-hidden="true" />
          )}
          {name}
        </span>
        <span className="text-muted-foreground text-xs">{level}%</span>
      </div>
      <Progress
        value={value}
        className="[&_[data-slot=progress-track]]:bg-muted [&_[data-slot=progress-indicator]]:duration-1000 [&_[data-slot=progress-indicator]]:ease-out [&_[data-slot=progress-track]]:h-1.5"
      />
    </div>
  );
}
