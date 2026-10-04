import Image from "next/image";

type MarqueeProps = {
  icons: string[];
  reverse?: boolean;
  duration?: number; // seconds
  className?: string;
};

export default function Marquee({
  icons,
  reverse = false,
  duration = 30,
  className = "",
}: MarqueeProps) {
  const items = [...icons, ...icons];

  return (
    <div
      className={`marquee overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div
        className="marquee-track flex w-max gap-4"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {items.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            width={150}
            height={150}
            draggable={false}
            className="h-[150px] w-[150px] flex-none rounded-2xl object-contain"
          />
        ))}
      </div>
    </div>
  );
}
