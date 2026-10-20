import blogsJson from "./blogs.json";

const devExperienceStartYear = 2024; // ALLWEB Company - first professional dev role
export const yearsOfExperience =
  new Date().getFullYear() - devExperienceStartYear;

export const site = {
  name: "Kimlong KUN",
  role: "Full-stack Web Developer",
  // One-line pitch shown under the name in every template's hero
  intro:
    "I design and build full-stack web applications — from Laravel and Java Spring APIs to React and Angular interfaces — turning ideas into fast, reliable products.",
  // Playful promise shown in every template's hero
  slogan: "I’ll take care of your website like I take care of my girlfriend.",
  photo: "/images/me.jpg",
  // The Lamp template's hero print uses its own, more casual photo
  lampPhoto: {
    src: "/images/me-lamp.jpg",
    alt: "Kimlong KUN sitting in front of Angkor Wat",
    caption: "Angkor Wat · KH",
  },
  tagline: [
    "Full-stack Web Developer",
    "Backend Developer",
    "Frontend Developer",
    "Freelancer",
  ],
  email: "kimlongkun2412@gmail.com",
  phone: "+855 (0) 96 378 7846",
  address: "Sangkat Tuek Thla, Khan Sen Sok, Phnom Penh, Cambodia",
  facebook: {
    url: "https://web.facebook.com/newboy.long",
    handle: "Kun Kimlong",
  },
  telegram: {
    url: "https://t.me/Kun_KimLong",
    handle: "@Kun_KimLong",
  },
  about: `I am a Web Developer with ${yearsOfExperience} years of experience specializing in full-stack web development using Laravel, Java Spring, React, and Angular. I have built and deployed applications such as HRMS (Human Resource Management System) and Family Partner at ALLWEB Company, working with PostgreSQL, MongoDB, Docker, and Ansible. I also have experience as a Web Instructor at ETEC Center, teaching programming languages and web technologies including C, C++, PHP, MySQL, and Laravel. I'm passionate about creating efficient, user-friendly web applications and continuously learning new technologies.`,
} as const;

export const education = [
  {
    title: "Bachelor's Degree in Computer Science and Engineering",
    period: "2021 - 2025",
    place: "Royal University of Phnom Penh",
  },
  {
    title: "Basic Programming & Web Development Skill",
    period: "2021 - 2023",
    place: "Engineering of Technology and Electronic Center (ETEC)",
  },
] as const;

export type Experience = {
  company: string;
  position: string;
  startY: number;
  endY: number | null;
  location: string;
  details: string[];
};

export const experiences: Experience[] = [
  {
    company: "ALLWEB Company",
    position: "Java Developer",
    startY: devExperienceStartYear,
    endY: null,
    location: "Khan Beong Keng Kang, Phnom Penh",
    details: [
      "Developed HRMS (Human Resource Management System) with backend using Laravel and the frontend with Laravel Blade, integrating it with Java Spring microservices to create employee reports and send mail notifications to employees, connected to PostgreSQL and MongoDB databases, with views built in React and TypeScript. Also managed deployment using Docker and Ansible.",
      "Developed FAPA (Family Partner wealth-reporting platform) to consolidate each client's assets and liabilities into branded PDF reports, with a Java Spring Boot backend connected to a PostgreSQL database, an Angular frontend, and a Node.js chart-rendering service. Also automated Excel data imports with Spring Batch and deployed with Docker to Azure.",
      "Developed Fueni (telemedicine platform) with portals for patients, doctors and admins, using a Java Spring Boot backend built on hexagonal architecture and connected to a PostgreSQL database, with the frontend built in Next.js, React and TypeScript, and Keycloak for authentication. Also shipped it with Docker through GitLab CI.",
      "Managed software projects using OpenProject and Jira.",
    ],
  },
  {
    company: "Engineering of Technology and Electronic Center (ETEC)",
    position: "Web Instructor",
    startY: 2023,
    endY: 2024,
    location: "Khan Tuol Kork, Phnom Penh",
    details: [
      "Taught web development skills (HTML, CSS, Bootstrap, JavaScript, jQuery, PHP, Laravel, MySQL) and basic programming concepts (C, C++).",
      "Guided students in website design, emphasizing responsive layouts, forms, and Flexbox for frontend development, and provided hands-on training in developing Content Management Systems (CMS) and implementing CRUD (Create, Read, Update, Delete) functionality.",
    ],
  },
];

export type SkillGroup = {
  type: string;
  skills: { name: string; level: number; icon?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    type: "Spoken Language",
    skills: [
      { name: "Khmer", level: 100, icon: "KhmerIcon" },
      { name: "English", level: 70, icon: "EnglishIcon" },
    ],
  },
  {
    type: "Frontend Development",
    skills: [
      { name: "HTML", level: 100, icon: "SiHtml5" },
      { name: "CSS", level: 80, icon: "SiCss" },
      { name: "Bootstrap", level: 80, icon: "SiBootstrap" },
      { name: "JavaScript", level: 70, icon: "SiJavascript" },
      { name: "jQuery", level: 65, icon: "SiJquery" },
      { name: "React", level: 70, icon: "SiReact" },
      { name: "Vue", level: 50, icon: "SiVuedotjs" },
      { name: "Angular", level: 60, icon: "SiAngular" },
      { name: "Next Js", level: 70, icon: "TbBrandNextjs" },
    ],
  },
  {
    type: "Backend Development",
    skills: [
      { name: "PHP", level: 70, icon: "SiPhp" },
      { name: "Laravel", level: 80, icon: "SiLaravel" },
      { name: "Java Spring", level: 80, icon: "SiSpring" },
    ],
  },
];

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; language?: string }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string; // URL of the detail page: /blog/<slug>
  title: string;
  excerpt: string;
  date: string; // ISO date, e.g. "2026-09-12"
  readTime: number; // minutes
  tags: string[];
  url?: string; // optional: where the post was also published (e.g. Medium)
  content: BlogBlock[];
};

export const blogs: BlogPost[] = [...(blogsJson as unknown as BlogPost[])].sort(
  (a, b) => b.date.localeCompare(a.date)
);

export function getBlog(slug: string) {
  return blogs.find((post) => post.slug === slug);
}
