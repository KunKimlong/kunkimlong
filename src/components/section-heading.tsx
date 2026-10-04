export function SectionHeading({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto mb-14 max-w-xl text-center"
          : "mb-14 max-w-xl"
      }
    >
      <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-serif text-4xl italic sm:text-5xl">{title}</h2>
    </div>
  );
}
