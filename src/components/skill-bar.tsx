"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function SkillBar({ name, level }: { name: string; level: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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
        <span className="text-foreground/90">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <Progress
        value={value}
        className="[&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-muted [&_[data-slot=progress-indicator]]:bg-primary [&_[data-slot=progress-indicator]]:duration-1000 [&_[data-slot=progress-indicator]]:ease-out"
      />
    </div>
  );
}
