"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./floating-portfolio.module.css";

const MotionLink = motion.create(Link);
const soft = { stiffness: 160, damping: 18, mass: 0.6 };

/** Pointer tilt for mouse users: rotates toward the cursor and feeds the sheen its position */
function useTilt(max: number) {
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, soft);
  const rotateY = useSpring(0, soft);

  return {
    style: { rotateX, rotateY, transformPerspective: 900 },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateY.set((px - 0.5) * max * 2);
      rotateX.set((0.5 - py) * max * 2);
      e.currentTarget.style.setProperty("--sx", `${px * 100}%`);
      e.currentTarget.style.setProperty("--sy", `${py * 100}%`);
    },
    onPointerLeave: () => {
      rotateX.set(0);
      rotateY.set(0);
    },
  };
}

/**
 * A glass card that swings up into place when scrolled to, then tilts toward the
 * pointer and lifts on hover. With `href` the whole card is a link.
 */
export function TiltCard({
  children,
  className,
  href,
  index = 0,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  index?: number;
  max?: number;
}) {
  const tilt = useTilt(max);
  const cardProps = {
    ...tilt,
    className: cn(styles.card, styles.sheen, className),
    whileHover: { y: -10 },
    transition: { type: "spring", stiffness: 260, damping: 20 },
  } as const;

  return (
    <motion.div
      className={styles.cardWrap}
      initial={{ opacity: 0, y: 70, rotateX: 18, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 16,
        delay: index * 0.12,
      }}
      style={{ transformPerspective: 1000 }}
    >
      {href ? (
        <MotionLink href={href} {...cardProps}>
          {children}
        </MotionLink>
      ) : (
        <motion.div {...cardProps}>{children}</motion.div>
      )}
    </motion.div>
  );
}

/** Rises into view; for blocks that should arrive but not tilt (forms, articles) */
export function FloatIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section label: an accent line draws in, then the text slides out from behind it */
export function Kicker({ children }: { children: ReactNode }) {
  const ease = [0.65, 0, 0.35, 1] as const;
  return (
    <motion.p
      className={styles.kicker}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      <motion.span
        className={styles.kickerLine}
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 0.6, ease }}
      />
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -14 },
          show: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
      >
        {children}
      </motion.span>
    </motion.p>
  );
}

/** Pulls its child a little toward the pointer, springing back on leave */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(0, soft);
  const y = useSpring(0, soft);

  return (
    <motion.span
      className={styles.magnetic}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Pills that pop in one after another, then bob and jump when hovered */
export function SkillPills({
  skills,
}: {
  skills: { name: string; level: number }[];
}) {
  return (
    <motion.ul
      className={styles.skills}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
    >
      {skills.map((skill) => (
        <motion.li
          key={skill.name}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.6 },
            show: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          whileHover={{ y: -4, scale: 1.05, rotate: -2 }}
        >
          <span
            className={cn(styles.skillPill, skill.level === 100 && styles.top)}
          >
            {skill.name}
            <span className={styles.level}>{skill.level}%</span>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

type Chip = { label?: string; value: string; live?: boolean };

function HeroChip({
  chip,
  index,
  mx,
  my,
}: {
  chip: Chip;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  // Nearer chips (higher depth) drift further with the pointer, for a sense of layers
  const depth = [28, -36, 44, -22][index % 4];
  const x = useSpring(
    useTransform(mx, (v) => v * depth),
    soft
  );
  const y = useSpring(
    useTransform(my, (v) => v * depth),
    soft
  );

  return (
    <motion.div
      className={cn(styles.chipSlot, styles[`chip${index + 1}`])}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.4, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 14,
        delay: 0.9 + index * 0.15,
      }}
      aria-hidden="true"
    >
      <div className={styles.chip}>
        {chip.live ? (
          <>
            <i className={styles.dot} />
            {chip.value}
          </>
        ) : (
          <>
            <span>{chip.label}</span>
            <strong>{chip.value}</strong>
          </>
        )}
      </div>
    </motion.div>
  );
}

/** Glass chips around the hero that pop in, bob, and drift in layers with the pointer */
export function HeroChips({ chips }: { chips: Chip[] }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: globalThis.PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return chips.map((chip, i) => (
    <HeroChip key={chip.value} chip={chip} index={i} mx={mx} my={my} />
  ));
}

function DockItem({
  mouseX,
  children,
  href,
  label,
  external = false,
}: {
  mouseX: MotionValue<number>;
  children: ReactNode;
  href: string;
  label: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    return rect ? x - rect.left - rect.width / 2 : Infinity;
  });
  // Grows as the pointer nears, like a desktop dock
  const size = useSpring(useTransform(distance, [-140, 0, 140], [48, 66, 48]), {
    stiffness: 260,
    damping: 20,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      data-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      style={{ width: size, height: size }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.a>
  );
}

/** Contact dock that slides up after the page settles and magnifies under the pointer */
export function Dock({
  items,
}: {
  items: {
    href: string;
    label: string;
    icon: ReactNode;
    external?: boolean;
  }[];
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      aria-label="Contact links"
      className={styles.dock}
      initial={{ y: 140, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16, delay: 1.4 }}
      onPointerMove={(e) => e.pointerType === "mouse" && mouseX.set(e.clientX)}
      onPointerLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item) => (
        <DockItem
          key={item.label}
          mouseX={mouseX}
          href={item.href}
          label={item.label}
          external={item.external}
        >
          {item.icon}
        </DockItem>
      ))}
    </motion.nav>
  );
}
