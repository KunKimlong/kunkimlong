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
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-serif text-4xl italic sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
