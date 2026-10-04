import { cn } from "@/lib/utils";

type LanguageIconProps = { className?: string };

function createLanguageIcon(label: string) {
  return function LanguageIcon({ className }: LanguageIconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={cn(className, "h-5 w-5 shrink-0")}
        fill="none"
        aria-hidden="true"
      >
        <text
          x="12"
          y="12.4"
          textAnchor="middle"
          dominantBaseline="central"
          fill="currentColor"
          fontFamily="inherit"
          fontSize="11.5"
          fontWeight="700"
          letterSpacing="-0.2"
        >
          {label}
        </text>
      </svg>
    );
  };
}

export const KhmerIcon = createLanguageIcon("KH");
export const EnglishIcon = createLanguageIcon("EN");
