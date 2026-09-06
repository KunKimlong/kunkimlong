const devExperienceStartYear = 2024; // ALLWEB Company - first professional dev role
export const yearsOfExperience =
  new Date().getFullYear() - devExperienceStartYear;

export const site = {
  name: "Kimlong KUN",
  role: "Web Developer",
  tagline: ["Backend Developer", "Frontend Developer", "Freelancer"],
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
      "Developed Family Partner with a backend using Java Spring connected to a PostgreSQL database, Angular for frontend development, and Docker for deployment to an Azure server.",
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
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    type: "Spoken Language",
    skills: [
      { name: "Khmer", level: 100 },
      { name: "English", level: 70 },
    ],
  },
  {
    type: "Frontend Development",
    skills: [
      { name: "HTML", level: 100 },
      { name: "CSS", level: 80 },
      { name: "Bootstrap", level: 80 },
      { name: "JavaScript", level: 70 },
      { name: "jQuery", level: 65 },
      { name: "React", level: 70 },
      { name: "Vue", level: 50 },
      { name: "Angular", level: 60 },
    ],
  },
  {
    type: "Backend Development",
    skills: [
      { name: "PHP", level: 70 },
      { name: "Laravel", level: 80 },
      { name: "Java Spring", level: 70 },
    ],
  },
];
