import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import "./App.css";

type Project = {
  title: string;
  description: string;
  stack: string[];
  link: string;
  sourceLink?: string;
  previewGradient?: string;
  previewImage?: string;
  previewVideo?: string;
};

type Experience = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

type HeroCardEffect = {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
  isActive: boolean;
};

const projects: Project[] = [
  {
    title: "Library Management System",
    description:
      "Built a lightweight Library Management System using CodeIgniter and MySQL to manage book catalogs, member records, and borrowing activities. Supports role-based access, cover uploads, loan tracking, and PDF/Excel reporting for inventory and circulation.",
    stack: ["CodeIgniter", "MySQL", "Bootstrap"],
    link: "#",
    previewGradient: "from-[#1c3f8c] via-[#1a2b63] to-[#101638]",
    previewImage: "projects/library-management-system.png",
    sourceLink: "https://github.com/devwithfin/aplikasiperpustatakaan",
    previewVideo: "/video/demo.mp4",
  },
  {
    title: "Learning Management System",
    description:
      "Built a full-stack Learning Management System using React, Express, and MySQL to handle student onboarding, course access, and role-based portals for students, teachers, and admins. Includes secure registration, login, email verification, and password reset flows ahead of features like catalogs, dashboards, and assignments.",
    stack: ["React", "Express.js", "Node.js", "MySQL", "Material UI"],
    link: "#",
    previewGradient: "from-[#1b357a] via-[#18255a] to-[#0d1235]",
    previewImage: "projects/learning-management-system.png",
    previewVideo: "/video/demo.mp4",
  },
  {
    title: "HRIS & Payroll",
    description:
      "Built a full-stack HRIS platform using React, Express, and MySQL to manage employee records, attendance, leave, overtime, and payroll. Supports role-based access for HR, finance, and employees while automating salary components overtime, allowances, deductions, taxes, BPJS and generating digital payslips.",
    stack: ["React", "Express.js", "Node.js", "Tailwind CSS"],
    link: "#",
    previewGradient: "from-[#203c88] via-[#1a2c64] to-[#0f143a]",
    previewImage: "projects/hris-payroll.png",
    sourceLink: "https://github.com/devwithfin/payroll",
    previewVideo: "/video/demo.mp4",
  },
  {
    title: "Employee Management System",
    description:
      "Built a full-stack Employee Management System using Laravel and MySQL to centralize employee data, service requests, and approval-based workflows—requisitions, business trips, purchases, claims, and security incidents. Supports role-based access, configurable approval chains, facility/asset tracking, and audit logging for HR, finance, facilities, and employees.",
    stack: ["Laravel", "Node.js", "PostgreSQL", "Bootstrap"],
    link: "#",
    previewGradient: "from-[#1a3676] via-[#142350] to-[#0d1333]",
    previewImage: "projects/employee-management-system.png",
    previewVideo: "/video/demo.mp4",
  },
  {
    title: "Customer Relationship Management",
    description:
      "Developed a CRM platform with React and NestJS to track deals, automate follow-ups, and share context across sales and support. Includes pipeline stages, contact history, reminders, and PostgreSQL-backed activity feeds for reliable collaboration.",
    stack: ["React", "NestJS", "Node.js", "PostgreSQL"],
    link: "#",
    previewGradient: "from-[#263a8f] via-[#1b2863] to-[#10163d]",
    previewImage: "projects/customer-relationship-management.png",
    previewVideo: "/video/demo.mp4",
  },
];

const experiences: Experience[] = [
  {
    title: "Fullstack Web Developer",
    company: "PT. Transcosmos Indonesia",
    period: "September 2025 - March 2025",
    bullets: [
      "Developed Employee Management System features for internal operations such as request workflows and security access approvals",
      "Designed business logic, authentication, and role management aligned with the organization hierarchy",
      "Managed data flows, tested releases, and iterated from internal feedback to keep the system dependable",
    ],
  },
  {
    title: "Frontend Web Developer",
    company: "PT. Kahfi Kita Indonesia",
    period: "March 2025 - June 2025",
    bullets: [
      "Built the Kahfi Education web interface covering user authentication, student dashboard, and realtime profile updates",
      "Implemented responsive layouts and intuitive navigation across devices",
      "Partnered with backend engineers on API integration for user management, learning programs, and payment status",
    ],
  },
  {
    title: "UI/UX Designer",
    company: "PT. Tinfive Indonesia",
    period: "January 2022 - March 2022",
    bullets: [
      "Designed a Learning Management System for Wirabuana Middle School as a digital learning solution.",
      "Conducted user research through interviews and classroom observation with teachers and students.",
      "Mapped learning flows to define features like online classes, assignment submission, and progress tracking.",
      "Created mobile app prototypes in Figma with emphasis on visual consistency and usability.",
    ],
  },
];


const education = [
  {
    program: "Politeknik LP3I Jakarta",
    level: "Diploma III",
    school: "Informatics Management",
    period: "September 2023 - Present",
    detailLine: "GPA: 3.77 / 4.00",
  },
  {
    program: "SMK Wira Buana 2 Citayam",
    level: "Vocational High School",
    school: "Software Engineering",
    period: "June 2020 - June 2023",
    detailLine: "Final Grade: 85 / 100",
  },
];

const skillLogos: Record<string, string> = {
  PHP: "https://cdn.simpleicons.org/php/777BB4",
  JavaScript: "https://cdn.simpleicons.org/javascript/F7DF1E",
  TypeScript: "https://cdn.simpleicons.org/typescript/3178C6",
  Python: "https://cdn.simpleicons.org/python/3776AB",
  Bootstrap: "https://cdn.simpleicons.org/bootstrap/7952B3",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/38BDF8",
  React: "https://cdn.simpleicons.org/react/61DAFB",
  CodeIgniter: "https://cdn.simpleicons.org/codeigniter/EF4223",
  Laravel: "https://cdn.simpleicons.org/laravel/FF2D20",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/5FA04E",
  "Express.js": "https://cdn.simpleicons.org/express/FFFFFF",
  NestJS: "https://cdn.simpleicons.org/nestjs/E0234E",
  MySQL: "https://cdn.simpleicons.org/mysql/4479A1",
  "Microsoft SQL Server": "/icons/mssql.svg",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql/4169E1",
  Git: "https://cdn.simpleicons.org/git/F05032",
  Postman: "https://cdn.simpleicons.org/postman/FF6C37",
  Docker: "https://cdn.simpleicons.org/docker/2496ED",
  Figma: "https://cdn.simpleicons.org/figma/F24E1E",
};

const techRow1 = [
  "PHP",
  "JavaScript",
  "TypeScript",
  "Python",
  "Bootstrap",
  "Tailwind CSS",
  "React",
  "CodeIgniter",
  "Laravel",
  "Node.js",
];
const techRow2 = [
  "Express.js",
  "NestJS",
  "MySQL",
  "Microsoft SQL Server",
  "PostgreSQL",
  "Git",
  "Postman",
  "Docker",
  "Figma",
];

const techLabels: Record<string, string> = {
  PHP: "Language",
  JavaScript: "Language",
  TypeScript: "Language",
  Python: "Language",
  Bootstrap: "Frontend",
  "Tailwind CSS": "Frontend",
  React: "Frontend",
  CodeIgniter: "Backend",
  Laravel: "Backend",
  "Node.js": "Backend",
  "Express.js": "Backend",
  NestJS: "Backend",
  MySQL: "Database",
  "Microsoft SQL Server": "Database",
  PostgreSQL: "Database",
  Git: "Tools",
  Postman: "Tools",
  Docker: "Tools",
  Figma: "Tools",
};

const heroStats = [
  { label: "Experience", value: 2, caption: "years" },
  { label: "Develop System", value: 5, caption: "projects" },
];

const heroSocials = [
  { label: "GitHub", href: "https://github.com/devwithfin" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alfiansyah-cahyo-wicaksono/" },
  { label: "Instagram", href: "https://instagram.com/devwithfin" },
];

const heroRoles = ["Fullstack", "Frontend", "Backend"];
const heroRolesLoop = [...heroRoles, heroRoles[0]];



function App() {
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const heroTargetRef = useRef({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    active: false,
  });
  const projectTrackRef = useRef<HTMLDivElement | null>(null);
  const [statValues, setStatValues] = useState(() => heroStats.map(() => 0));
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [heroCardEffect, setHeroCardEffect] = useState<HeroCardEffect>({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
    isActive: false,
  });
  const heroActiveRange = 70;
  const heroReleaseRange = 78;
  const heroActiveSpeed = 0.18;
  const heroPassiveSpeed = 0.07;
  const scrollDirectionRef = useRef<"down" | "up">("down");
  const [heroRoleIndex, setHeroRoleIndex] = useState(0);
  const [heroRoleAnimated, setHeroRoleAnimated] = useState(true);
  const roleTrackStyle = {
    transform: `translateY(-${heroRoleIndex * 100}%)`,
    transition: heroRoleAnimated ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
  };
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [showProjectVideo, setShowProjectVideo] = useState(false);
  const handleContactSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const name = contactName.trim();
      const phone = contactPhone.trim();
      const message = contactMessage.trim();
      if (!name || !phone || !message) {
        alert("Please fill in your name, phone, and message before sending.");
        return;
      }

      const text = encodeURIComponent(`Hello, my name is ${name}.\n\n${message}`);
      const waUrl = `https://wa.me/6285819727856?text=${text}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setContactName("");
      setContactPhone("");
      setContactMessage("");
    },
    [contactName, contactPhone, contactMessage],
  );

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setStatValues(heroStats.map((stat) => Math.round(stat.value * progress)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (heroRoleIndex === heroRoles.length) return undefined;
    const timer = setTimeout(() => {
      setHeroRoleAnimated(true);
      setHeroRoleIndex((prev) => prev + 1);
    }, 2200);
    return () => clearTimeout(timer);
  }, [heroRoleIndex]);

  useEffect(() => {
    if (heroRoleIndex === heroRoles.length) {
      const timeout = setTimeout(() => {
        setHeroRoleAnimated(false);
        setHeroRoleIndex(0);
      }, 600);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [heroRoleIndex]);


  useEffect(() => {
    document.body.classList.add("scroll-anim-ready");
    return () => {
      document.body.classList.remove("scroll-anim-ready");
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    setShowProjectVideo(false);
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return undefined;
  }, [selectedProject]);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) < 2) return;
      scrollDirectionRef.current = currentY > lastY ? "down" : "up";
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const animatedSections = document.querySelectorAll<HTMLElement>("[data-scroll-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && scrollDirectionRef.current === "down") {
            (entry.target as HTMLElement).classList.add("scroll-visible");
          } else if (entry.isIntersecting && scrollDirectionRef.current === "up") {
            const target = entry.target as HTMLElement;
            target.classList.add("scroll-visible", "scroll-visible-instant");
            requestAnimationFrame(() => {
              target.classList.remove("scroll-visible-instant");
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    animatedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleChipDrag = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const element = event.currentTarget;
      const startX = event.pageX - element.offsetLeft;
      const scrollStart = element.scrollLeft;
      let dragging = true;

      element.classList.add("cursor-grabbing");
      element.classList.remove("cursor-grab");

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!dragging) return;
        moveEvent.preventDefault();
        const x = moveEvent.pageX - element.offsetLeft;
        const walk = x - startX;
        element.scrollLeft = scrollStart - walk;
      };

      const cleanup = () => {
        dragging = false;
        element.classList.add("cursor-grab");
        element.classList.remove("cursor-grabbing");
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", cleanup);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", cleanup);
    },
    [],
  );

  const scrollProjects = (direction: "left" | "right") => {
    const container = projectTrackRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const openProjectDetail = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeProjectDetail = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleProjectCardKeyDown = useCallback(
    (project: Project) => (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectDetail(project);
      }
    },
    [openProjectDetail],
  );

  const primaryFocusDescription =
    selectedProject?.description.split(".")[0]?.trim() ?? "";

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      const target = heroTargetRef.current;
      setHeroCardEffect((prev) => {
        const speed = target.active ? heroActiveSpeed : heroPassiveSpeed;
        const nextRotateX = prev.rotateX + (target.rotateX - prev.rotateX) * speed;
        const nextRotateY = prev.rotateY + (target.rotateY - prev.rotateY) * speed;
        const nextGlowX = prev.glowX + (target.glowX - prev.glowX) * speed;
        const nextGlowY = prev.glowY + (target.glowY - prev.glowY) * speed;

        return {
          rotateX: nextRotateX,
          rotateY: nextRotateY,
          glowX: nextGlowX,
          glowY: nextGlowY,
          isActive: target.active,
        };
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [heroActiveSpeed, heroPassiveSpeed]);

  useEffect(() => {
    const computeComponent = (
      delta: number,
      half: number,
      activeExtra: number,
      releaseExtra: number,
    ) => {
      const activeLimit = half + activeExtra;
      const releaseLimit = half + releaseExtra;
      const absDelta = Math.abs(delta);
      const normalized = Math.max(-1, Math.min(1, delta / half));
      if (absDelta <= activeLimit) {
        return normalized;
      }
      if (absDelta >= releaseLimit) {
        return 0;
      }
      const excess = absDelta - activeLimit;
      const falloff = 1 - excess / (releaseLimit - activeLimit || 1);
      return normalized * Math.max(0, falloff);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = heroCardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;
      const withinX = Math.abs(dx) <= halfWidth + heroReleaseRange;
      const withinY = Math.abs(dy) <= halfHeight + heroReleaseRange;

      if (!withinX || !withinY) {
        heroTargetRef.current = {
          rotateX: 0,
          rotateY: 0,
          glowX: 50,
          glowY: 50,
          active: false,
        };
        return;
      }

      const clampedX = computeComponent(
        dx,
        halfWidth,
        heroActiveRange,
        heroReleaseRange,
      );
      const clampedY = computeComponent(
        dy,
        halfHeight,
        heroActiveRange,
        heroReleaseRange,
      );

      heroTargetRef.current = {
        rotateX: -clampedY * 32,
        rotateY: clampedX * 40,
        glowX: ((clampedX + 1) / 2) * 100,
        glowY: ((clampedY + 1) / 2) * 100,
        active: true,
      };
    };

    const handlePointerLeave = () => {
      heroTargetRef.current = {
        rotateX: 0,
        rotateY: 0,
        glowX: 50,
        glowY: 50,
        active: false,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [heroActiveRange, heroReleaseRange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03050f] via-[#08112a] via-[#101e44] to-[#152270] text-slate-100 antialiased font-sans selection:bg-[#4c7dff]/40">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1f2c6d]/30 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-[#2c3f94]/20 blur-[110px] rounded-full" />
      </div>

      {/* Fixed Social Sidebar */}
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-8">
        {heroSocials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            className="text-slate-500 transition-all duration-300 hover:text-[#6b8dff] hover:scale-125"
            rel="noreferrer"
            aria-label={social.label}
          >
            {social.label === "GitHub" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.22.7-3.9-1.4-3.9-1.4-.53-1.33-1.3-1.69-1.3-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.72-1.56-2.57-.3-5.27-1.29-5.27-5.74A4.5 4.5 0 0 1 5.5 8.5a4.18 4.18 0 0 1 .11-3s.97-.31 3.2 1.2a10.9 10.9 0 0 1 5.78 0c2.22-1.51 3.2-1.2 3.2-1.2a4.18 4.18 0 0 1 .12 3 4.5 4.5 0 0 1 1.2 2.98c0 4.47-2.7 5.43-5.28 5.72.41.35.77 1.05.77 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5" />
              </svg>
            )}
            {social.label === "LinkedIn" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M22.225 0H1.771A1.77 1.77 0 0 0 0 1.771v20.452A1.77 1.77 0 0 0 1.771 24h20.452A1.77 1.77 0 0 0 24 22.223V1.771A1.77 1.77 0 0 0 22.225 0ZM7.059 20.452H3.996V9h3.063zm-1.532-13.03A1.77 1.77 0 1 1 7.3 5.652a1.77 1.77 0 0 1-1.77 1.77m14.925 13.03h-3.062v-5.568c0-1.33-.025-3.037-1.852-3.037-1.852 0-2.136 1.45-2.136 2.947v5.658H10.34V9h2.94v1.561h.043c.409-.775 1.409-1.594 2.9-1.594 3.097 0 3.67 2.04 3.67 4.698z" />
              </svg>
            )}
            {social.label === "Instagram" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10m0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6" />
              </svg>
            )}
          </a>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 xl:px-12 pb-10 pt-10">
        <header className="relative py-10">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-6xl font-black leading-[1.1] tracking-tight text-white lg:text-7xl">
                  Jr. <br />
                  <span className="inline-flex h-[64px] overflow-hidden text-[#7f9aff]">
                    <span className="role-roller-track" style={roleTrackStyle}>
                      {heroRolesLoop.map((role, idx) => (
                        <span key={`${role}-${idx}`} className="flex h-[64px] items-center">
                          {role}
                        </span>
                      ))}
                    </span>
                  </span>
                  <br />
                  <span className="text-white/40">Developer</span>
                </h1>

                <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                  I&apos;m{" "}
                  <span className="text-white font-bold">
                    Alfiansyah Cahyo Wicaksono
                  </span>
                  , a{" "}
                  <span className="inline-flex h-[30px] overflow-hidden text-[#7f9aff] font-bold align-baseline">
                    <span className="role-roller-track" style={roleTrackStyle}>
                      {heroRolesLoop.map((role, idx) => (
                        <span key={`hero-inline-${role}-${idx}`} className="flex h-[30px] items-center">
                          {role}
                        </span>
                      ))}
                    </span>
                  </span>{" "}
                  Developer{" "}
                  focused on building reliable platforms and expressive UI's for
                  ambitious teams.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://wa.me/6285819727856"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#4c7dff] hover:bg-[#6b92ff] text-white rounded-2xl font-bold flex items-center gap-2 transition shadow-lg shadow-[#060d24]/70 active:scale-[0.98]"
                >
                  Let's collaborate
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                </a>
                <a
                  href="/doc/cv_alfiansyah_cahyo_wicaksono.pdf"
                  download
                  className="px-8 py-4 border border-[#4c7dff]/40 text-[#cbd6ff] rounded-2xl font-bold flex items-center gap-2 transition hover:border-[#6b92ff]/70 active:scale-[0.98]"
                >
                  Get resume
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="hero-tilt-wrapper relative w-full lg:max-w-[640px]">
              <div className="hero-tilt-container relative">
                <div
                  className="relative hero-tilt-content bg-[#0c1538] rounded-[32px] overflow-hidden"
                  ref={heroCardRef}
                  style={{
                    transform: `rotateX(${heroCardEffect.rotateX}deg) rotateY(${heroCardEffect.rotateY}deg) scale(${
                      heroCardEffect.isActive ? 1.02 : 1
                    })`,
                    boxShadow: heroCardEffect.isActive
                      ? "0 45px 140px rgba(5,14,52,0.85)"
                      : "0 30px 80px rgba(5,14,52,0.7)",
                    transition: heroCardEffect.isActive
                      ? "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease"
                      : "transform 0.85s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.85s ease",
                  }}
                >
                  {/* Editor Header */}
                  <div className="h-12 bg-[#171313] flex items-center px-6 border-b border-white/5 justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#4c7dff]/60" />
                      <div className="w-3 h-3 rounded-full bg-[#6b92ff]/50" />
                      <div className="w-3 h-3 rounded-full bg-[#8bacff]/40" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#4c7dff]" />
                      <span className="text-[12px] font-medium text-slate-400">
                        Portfolio.ts
                      </span>
                    </div>
                  </div>
                  {/* Editor Body */}
                  <div className="p-12 font-mono text-[16px] leading-relaxed bg-[#0A0505]/90">
                    <div className="flex gap-8">
                      <div className="text-slate-600 select-none text-right text-[14px]">
                        {Array.from({ length: 11 }, (_, i) =>
                          String(i + 1).padStart(2, "0"),
                        ).map((n) => (
                          <div key={n}>{n}</div>
                        ))}
                      </div>
                      <div className="text-slate-300">
                        <div>
                          <span className="text-[#7f9aff]">const</span>{" "}
                          <span className="text-[#86c5ff]">developer</span> =
                          &#123;
                        </div>
                        <div className="pl-4">
                          name:{" "}
                          <span className="text-[#9cfaff]">
                            'Alfiansyah Cahyo Wicaksono'
                          </span>
                          ,
                        </div>
                        <div className="pl-4">
                          focus:{" "}
                          <span className="text-[#9cfaff]">
                            'Web Development'
                          </span>
                          ,
                        </div>
                        <div className="pl-4">
                          skills: [
                          <span className="text-[#9cfaff]">'React'</span>,{" "}
                          <span className="text-[#9cfaff]">'Express.js'</span>,{" "}
                          <span className="text-[#9cfaff]">'NestJS'</span>,{" "}
                          <span className="text-[#9cfaff]">'CodeIgniter'</span>,{" "}
                          <span className="text-[#9cfaff]">'Laravel'</span>],
                        </div>
                        <div className="pl-4">
                          level: <span className="text-[#ffb8a8]">Junior</span>,
                        </div>
                        <div className="pl-4">
                          motto:{" "}
                          <span className="text-[#9cfaff]">
                            "Code & Coffee Everyday"
                          </span>
                        </div>
                        <div>&#125;;</div>
                        <div className="mt-4">
                          <span className="text-[#86c5ff]">developer</span>.
                          <span className="text-[#ffd192]">portfolio</span>();
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="about"
          data-scroll-animate
          data-scroll-variant="slide-right"
          className="scroll-section mt-20 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]"
        >
          {/* Left Column: About Text */}
          <div>
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              About <span className="text-[#4c7dff]">Developer</span>
            </h2>
            <div className="mt-6 relative rounded-3xl border border-[#4c7dff]/30 bg-[#0a1029]/60 p-8 sm:p-10 shadow-lg backdrop-blur hover:border-[#4c7dff]/50 transition-colors">
              <p className="relative z-10 text-base leading-loose text-slate-300 font-medium">
                I'm <span className="text-white font-bold italic">Alfiansyah Cahyo Wicaksono</span>, a dedicated Fullstack Developer
                specializing in TypeScript and crafting responsive, 
                user-centric interfaces with React. I build 
                robust applications using modern technologies-leveraging 
                my backend expertise to integrate secure and reliable database layers 
                seamlessly into my front-end applications. Passionate about continuous learning, 
                I stay at the forefront of emerging technologies to deliver scalable, 
                maintainable solutions that exceed expectations.
              </p>
            </div>
          </div>

          {/* Right Column: Vertical Stats */}
          <div className="flex flex-col justify-center space-y-5 lg:pl-6">
            <div className="relative rounded-3xl bg-gradient-to-r from-[#4c7dff] via-[#3a52c9] to-[#1f2c72] p-[1px] shadow-[0_25px_70px_rgba(4,10,35,0.7)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(76,125,255,0.2)]">
              <div className="flex flex-col justify-center gap-1 rounded-3xl bg-[#0f1a40]/95 p-6 h-full transition-colors duration-300">
                <p className="text-xs font-bold tracking-widest text-[#aebdff] uppercase">
                  Level
                </p>
                <p className="text-2xl font-semibold text-white">
                  Junior
                </p>
              </div>
            </div>
            {heroStats.map((stat, index) => (
              <div key={stat.label} className="relative rounded-3xl bg-gradient-to-r from-[#4c7dff] via-[#3a52c9] to-[#1f2c72] p-[1px] shadow-[0_25px_70px_rgba(4,10,35,0.7)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(76,125,255,0.2)]">
                <div className="flex flex-col justify-center gap-1 rounded-3xl bg-[#0f1a40]/95 p-6 h-full transition-colors duration-300">
                  <p className="text-xs font-bold tracking-widest text-[#aebdff] uppercase">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-semibold text-white">
                    {statValues[index]}
                    {stat.caption && <span className="text-xl text-slate-400 font-medium"> {stat.caption}</span>}
                  </p>
                </div>
              </div>
            ))}
          
          </div>
        </section>

        <section
          id="experience"
          data-scroll-animate
          data-scroll-variant="slide-left"
          className="scroll-section mt-16 p-10"
        >
          <h2 className="flex flex-wrap items-center justify-center text-center text-3xl font-semibold text-white">
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
            <span className="inline-flex items-center gap-3 rounded-full border border-[#4c7dff]/60 bg-[#0A0505] px-8 py-3 text-2xl font-semibold text-white shadow-[0_0_25px_rgba(76,125,255,0.35)]">
              Work Experience
            </span>
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
          </h2>
          <div className="relative mt-12">
            <span className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#4c7dff] via-[#243788]/60 to-transparent md:block" />
            <div className="space-y-14">
              {experiences.map((job, index) => {
                const alignLeft = index % 2 === 0;
                const card = (
                  <div className="w-full md:max-w-md group">
                    <div className="relative float-hover-edu rounded-3xl bg-gradient-to-r from-[#4c7dff] via-[#3a52c9] to-[#1f2c72] p-[1px] shadow-[0_25px_70px_rgba(5,12,40,0.65)] transition hover:shadow-[0_25px_80px_rgba(76,125,255,0.35)]">
                      <div className="rounded-3xl bg-[#0f1a40]/95 p-6 transition-colors duration-300 group-hover:bg-[#131f4f]">
                        <div className="flex flex-col gap-2">
                          <div>
                            <p className="text-lg font-semibold text-white">
                              {job.title}
                            </p>
                            <p className="text-sm text-[#aebdff]">
                              {job.company}
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#4c7dff]/40 bg-[#0A0505] px-4 py-1 text-sm font-semibold text-[#e4dafc] md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {job.period}
                          </div>
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-slate-100">
                          {job.bullets.join(" ")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
                return (
                  <article
                    key={job.title}
                    className="relative md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start"
                  >
                    {alignLeft ? (
                      <>
                        <div className="flex md:col-start-1 md:justify-end md:pr-12">
                          {card}
                        </div>
                        <div className="hidden md:flex md:col-start-3 md:items-start md:pl-12 md:pt-10">
                          <span className="inline-flex items-center gap-2 rounded-full border border-[#4c7dff]/40 bg-[#0A0505] px-6 py-2 text-sm font-semibold text-[#e4dafc]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {job.period}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:flex md:col-start-1 md:items-start md:justify-end md:pr-12 md:pt-10">
                          <span className="inline-flex items-center gap-2 rounded-full border border-[#4c7dff]/40 bg-[#0A0505] px-6 py-2 text-sm font-semibold text-[#e4dafc]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {job.period}
                          </span>
                        </div>
                        <div className="flex md:col-start-3 md:justify-start md:pl-12">
                          {card}
                        </div>
                      </>
                    )}
                    <span className="pointer-events-none absolute left-1/2 top-12 hidden h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[#0b1230] bg-[#4c7dff] shadow-[0_0_20px_rgba(76,125,255,0.6)] md:flex">
                      <span className="m-auto h-2 w-2 rounded-full bg-white" />
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="education"
          data-scroll-animate
          data-scroll-variant="scale"
          className="scroll-section mt-12 p-10"
        >
          <h2 className="flex flex-wrap items-center justify-center text-center text-3xl font-semibold text-white">
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
            <span className="inline-flex items-center gap-3 rounded-full border border-[#4c7dff]/60 bg-[#0A0505] px-8 py-3 text-2xl font-semibold text-white shadow-[0_0_25px_rgba(76,125,255,0.35)]">
              Education Background
            </span>
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
          </h2>
          <div className="relative mt-12">
            <span className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#4c7dff] via-[#243788]/60 to-transparent md:block" />
            <div className="space-y-14">
              {education.map((item, index) => {
                const alignLeft = index % 2 === 0;
                const card = (
                  <div className="w-full md:max-w-md group">
                    <div className="relative float-hover-edu rounded-3xl bg-gradient-to-r from-[#4c7dff] via-[#3a52c9] to-[#1f2c72] p-[1px] shadow-[0_25px_70px_rgba(5,12,40,0.65)] transition hover:shadow-[0_25px_80px_rgba(76,125,255,0.35)]">
                      <div className="rounded-3xl bg-[#0f1a40]/95 p-6 transition-colors duration-300 group-hover:bg-[#131f4f]">
                        <div className="flex flex-col gap-2">
                          <div>
                            <p className="text-lg font-semibold text-white">
                              {item.program}
                            </p>
                            <p className="text-sm text-[#aebdff]">
                              {item.level}
                            </p>
                            <p className="text-sm text-[#7f9aff]">
                              {item.school}
                            </p>
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#4c7dff]/40 bg-[#0A0505] px-4 py-1 text-sm font-semibold text-[#e4dafc] md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {item.period}
                          </div>
                        </div>
                        <p className="text-sm text-[#d5deff]">
                          {item.detailLine}
                        </p>
                      </div>
                    </div>
                  </div>
                );
                return (
                  <article
                    key={item.program}
                    className="relative md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start"
                  >
                    {alignLeft ? (
                      <>
                        <div className="flex md:col-start-1 md:justify-end md:pr-12">
                          {card}
                        </div>
                        <div className="hidden md:flex md:col-start-3 md:items-start md:pl-12 md:pt-10">
                          <span className="inline-flex items-center gap-3 rounded-full border border-[#4c7dff]/40 bg-[#0A0505] px-6 py-2 text-sm font-semibold text-[#e4dafc]">
                            {item.period}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="hidden md:flex md:col-start-1 md:items-start md:justify-end md:pr-12 md:pt-10">
                          <span className="inline-flex items-center gap-3 rounded-full border border-[#4c7dff]/40 bg-[#0A0505] px-6 py-2 text-sm font-semibold text-[#e4dafc]">
                            {item.period}
                          </span>
                        </div>
                        <div className="flex md:col-start-3 md:justify-start md:pl-12">
                          {card}
                        </div>
                      </>
                    )}
                    <span className="pointer-events-none absolute left-1/2 top-12 hidden h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[#0b1230] bg-[#4c7dff] shadow-[0_0_18px_rgba(76,125,255,0.6)] md:flex">
                      <span className="m-auto h-2 w-2 rounded-full bg-white" />
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          data-scroll-animate
          data-scroll-variant="lift"
          className="scroll-section mt-16 space-y-10 overflow-hidden"
        >
          <h2 className="flex flex-wrap items-center justify-center text-center text-3xl font-semibold text-white">
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
            <span className="inline-flex items-center gap-3 rounded-full border border-[#4c7dff]/60 bg-[#0A0505] px-10 py-3 text-2xl font-semibold text-white shadow-[0_0_25px_rgba(76,125,255,0.35)]">
              Tech Stack
            </span>
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
          </h2>

          <div className="space-y-6 pause-on-hover px-4">
            {/* Row 1: Right to Left */}
            <div className="flex w-full overflow-x-hidden overflow-y-visible py-3">
              <div className="animate-marquee-left flex gap-6 pr-6">
                {[...techRow1, ...techRow1].map((skill, idx) => (
                  <div
                    key={`${skill}-${idx}`}
                    className="relative w-64 shrink-0 rounded-2xl border border-[#2f3f86]/50 bg-[#0c1538]/80 px-5 py-4 backdrop-blur shadow transition hover:border-[#4c7dff]/70"
                  >
                    <div className="flex h-full items-center gap-4">
                      <img
                        src={skillLogos[skill]}
                        alt={skill}
                        className="h-10 w-10 object-contain"
                      />
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">
                          {skill}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                          {techLabels[skill] || "Technology"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Left to Right */}
            <div className="flex w-full overflow-x-hidden overflow-y-visible py-3">
              <div className="animate-marquee-right flex gap-6 pr-6">
                {[...techRow2, ...techRow2].map((skill, idx) => (
                  <div
                    key={`${skill}-${idx}`}
                    className="relative w-64 shrink-0 rounded-2xl border border-[#2f3f86]/50 bg-[#0c1538]/80 px-5 py-4 backdrop-blur shadow transition hover:border-[#4c7dff]/70"
                  >
                    <div className="flex h-full items-center gap-4">
                      <img
                        src={skillLogos[skill]}
                        alt={skill}
                        className="h-10 w-10 object-contain"
                      />
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-tight">
                          {skill}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                          {techLabels[skill] || "Technology"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          data-scroll-animate
          data-scroll-variant="rotate"
          className="scroll-section mt-16 space-y-10"
        >
          <div className="flex items-center justify-center text-center">
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
            <span className="inline-flex items-center gap-3 rounded-full border border-[#4c7dff]/60 bg-[#0A0505] px-10 py-3 text-2xl font-semibold text-white shadow-[0_0_25px_rgba(76,125,255,0.35)]">
              Projects Portfolio
            </span>
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
          </div>

          <div className="mt-8 flex w-full items-center gap-4">
            <button
              onClick={() => scrollProjects("left")}
              className="hidden h-12 w-12 shrink-0 rounded-full bg-[#4c7dff] text-white shadow-lg transition hover:bg-[#6a93ff] md:grid md:place-items-center"
              aria-label="Scroll projects left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="relative flex-1 min-w-0">
              <div
                ref={projectTrackRef}
                className="scrollbar-hide flex w-full snap-x snap-mandatory scroll-smooth overflow-x-auto gap-6 lg:gap-8 pb-4 pt-4"
              >
                {projects.map((project) => (
                  <article
                    key={project.title}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details about ${project.title}`}
                    onClick={() => openProjectDetail(project)}
                    onKeyDown={handleProjectCardKeyDown(project)}
                    className="group float-hover-edu snap-start shrink-0 w-[85vw] sm:w-[400px] lg:w-[480px] flex flex-col rounded-3xl border border-[#2f4184]/50 bg-[#0c1538]/80 text-slate-100 shadow overflow-hidden transition hover:border-[#4c7dff]/70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c7dff]"
                  >
                    <div
                      className={`relative w-full shrink-0 overflow-hidden rounded-t-xl bg-gradient-to-br ${project.previewGradient ?? ""}`}
                    >
                      {project.previewImage ? (
                        <>
                          <img
                            src={project.previewImage}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-[60px] transition duration-300 group-hover:opacity-40"
                          />
                          <span
                            className="absolute inset-0 bg-gradient-to-b from-[#02050f] via-[#050c24] to-transparent opacity-90 transition duration-300 group-hover:opacity-40"
                            aria-hidden
                          />
                          <span
                            className="absolute inset-0 bg-[#030816]/80 transition duration-300 group-hover:bg-[#030816]/40"
                            aria-hidden
                          />
                          <img
                            src={project.previewImage}
                            alt={`${project.title} preview`}
                            loading="lazy"
                            className="relative block w-full object-cover opacity-90 transition duration-300 group-hover:opacity-100"
                          />
                          <span
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40 transition duration-300 group-hover:from-black/40 group-hover:via-transparent group-hover:to-transparent"
                            aria-hidden
                          />
                        </>
                      ) : (
                        <div
                          aria-hidden
                          className={`h-full w-full bg-gradient-to-br ${project.previewGradient ?? ""}`}
                        />
                      )}
                    </div>
                    <div className="flex h-full flex-col gap-4 p-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white line-clamp-2 min-h-[3.5rem]">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-300 line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                      <div className="relative overflow-hidden">
                        <div
                          className="flex min-w-full gap-2 overflow-x-auto pb-1 scrollbar-hide cursor-grab select-none"
                          onMouseDown={handleChipDrag}
                        >
                          {project.stack.map((item) => (
                            <span
                              key={item}
                              className="whitespace-nowrap rounded-full border border-[#4c7dff]/30 bg-[#4c7dff]/10 px-3 py-1 text-xs font-semibold text-[#d7e0ff]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                        {["Learning Management System", "Employee Management System", "Customer Relationship Management"].includes(project.title) ? (
                          <div className="col-span-1 sm:col-span-2">
                            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4c7dff]/40 bg-[#4c7dff]/10 px-4 py-2 text-center text-sm font-semibold text-[#d7e0ff]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 6V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1" />
                                <path d="M3 10h18" />
                                <path d="M5 10v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10" />
                                <path d="M10 5h4" />
                              </svg>
                              Internal Company Project
                            </span>
                          </div>
                        ) : (
                          <>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4c7dff]/40 px-4 py-2 text-center text-sm font-semibold text-[#d7e0ff] transition hover:border-[#6a93ff]/70"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                              </svg>
                              Live Demo
                            </a>
                            <a
                              href={project.sourceLink ?? project.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="source-wiggle inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4c7dff]/40 bg-[#4c7dff]/10 px-4 py-2 text-center text-sm font-semibold text-[#d7e0ff] transition hover:bg-[#6a93ff]/20"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="none"
                              >
                                <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.22.7-3.9-1.4-3.9-1.4-.53-1.33-1.3-1.69-1.3-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.72-1.56-2.57-.3-5.27-1.29-5.27-5.74A4.5 4.5 0 0 1 5.5 8.5a4.18 4.18 0 0 1 .11-3s.97-.31 3.2 1.2a10.9 10.9 0 0 1 5.78 0c2.22-1.51 3.2-1.2 3.2-1.2a4.18 4.18 0 0 1 .12 3 4.5 4.5 0 0 1 1.2 2.98c0 4.47-2.7 5.43-5.28 5.72.41.35.77 1.05.77 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5" />
                              </svg>
                              Source Code
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollProjects("right")}
              className="hidden h-12 w-12 shrink-0 rounded-full bg-[#4c7dff] text-white shadow-lg transition hover:bg-[#6a93ff] md:grid md:place-items-center"
              aria-label="Scroll projects right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </section>

        <section
          id="contact"
          data-scroll-animate
          data-scroll-variant="slide-right delay"
          className="scroll-section mt-16 p-6 sm:p-10"
        >
          <div className="flex items-center justify-center text-center">
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
            <span className="inline-flex items-center gap-3 rounded-full border border-[#4c7dff]/60 bg-[#0A0505] px-10 py-3 text-2xl font-semibold text-white shadow-[0_0_25px_rgba(76,125,255,0.35)]">
              Let's Connect
            </span>
            <span className="hidden h-px w-16 bg-[#6b8dff]/40 sm:inline-block" />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Left Column: Form */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#4c7dff] via-[#3a52c9] to-[#1f2c72] p-[1px] shadow-[0_25px_70px_rgba(4,10,35,0.7)] transition-shadow duration-500 hover:shadow-[0_25px_80px_rgba(76,125,255,0.2)] h-fit">
            <div className="rounded-3xl bg-gradient-to-br from-[#111b3f] via-[#0d1435] to-[#070c1f] p-8 sm:p-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">Send a Message</h2>
          
            <form className="mt-10 space-y-6" onSubmit={handleContactSubmit}>
              <div className="space-y-3">
                <label htmlFor="name" className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-[#aebdff] uppercase">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Fullname
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Lorem Ipsum"
                  className="w-full rounded-2xl border border-[#2f3f86]/40 bg-[#0a1029]/80 px-6 py-4 text-sm text-white focus:border-[#4c7dff] focus:outline-none focus:ring-1 focus:ring-[#4c7dff]/50 placeholder:text-slate-500 transition-all font-medium"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="phone" className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-[#aebdff] uppercase">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+62 812 3456 7890"
                  className="w-full rounded-2xl border border-[#2f3f86]/40 bg-[#0a1029]/80 px-6 py-4 text-sm text-white focus:border-[#4c7dff] focus:outline-none focus:ring-1 focus:ring-[#4c7dff]/50 placeholder:text-slate-500 transition-all font-medium"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-[#aebdff] uppercase">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your needs..."
                  className="w-full rounded-2xl border border-[#2f3f86]/40 bg-[#0a1029]/80 px-6 py-4 text-sm text-white focus:border-[#4c7dff] focus:outline-none focus:ring-1 focus:ring-[#4c7dff]/50 placeholder:text-slate-500 transition-all resize-none font-medium"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#4c7dff]/50 bg-gradient-to-r from-[#0d1435] to-[#121c45] px-6 py-4 text-xs font-extrabold text-white uppercase tracking-widest transition-all hover:border-[#6a93ff] hover:bg-[#1a2559] hover:shadow-[0_0_20px_rgba(76,125,255,0.3)] active:scale-[0.98]"
              >
                SEND MESSAGE
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
            </div>
          </div>

          {/* Right Column: Direct Contact */}
          <div className="flex flex-col justify-center space-y-8 lg:pl-6">
            <div>
              <h3 className="flex items-center gap-3 text-xl font-bold text-white">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4c7dff]/20 text-[#6a93ff]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </div>
                Direct Contact
              </h3>
            </div>

            <div className="flex flex-col gap-5">
              {/* Email Card */}
              <div
                onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=alfiansyahcahyow@gmail.com", "_blank", "noopener,noreferrer")}
                className="relative tilt-hover-contact cursor-pointer rounded-3xl bg-gradient-to-r from-[#4c7dff] via-[#3a52c9] to-[#1f2c72] p-[1px] shadow-[0_25px_70px_rgba(4,10,35,0.7)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(76,125,255,0.2)]"
              >
                <div className="flex h-full items-center gap-5 rounded-3xl bg-[#0f1a40]/95 p-5 transition-colors duration-300">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4c7dff]/10 text-[#6a93ff]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#6a93ff]/80 uppercase">Email</p>
                    <span className="mt-1 block text-sm font-semibold text-white hover:text-[#aebdff] transition-colors">
                      alfiansyahcahyow@gmail.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <a
                href="https://wa.me/6285819727856"
                target="_blank"
                rel="noreferrer"
                className="relative tilt-hover-contact rounded-3xl bg-gradient-to-r from-[#4c7dff] via-[#3a52c9] to-[#1f2c72] p-[1px] shadow-[0_25px_70px_rgba(4,10,35,0.7)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(76,125,255,0.2)]"
              >
                <div className="flex h-full items-center gap-5 rounded-3xl bg-[#0f1a40]/95 p-5 transition-colors duration-300">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4c7dff]/10 text-[#6a93ff]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#6a93ff]/80 uppercase">Phone</p>
                    <p className="mt-1 text-sm font-semibold text-white">+62 858 1972 7856</p>
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="relative tilt-hover-contact rounded-3xl bg-gradient-to-r from-[#4c7dff] via-[#3a52c9] to-[#1f2c72] p-[1px] shadow-[0_25px_70px_rgba(4,10,35,0.7)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(76,125,255,0.2)]">
                <div className="flex h-full items-center gap-5 rounded-3xl bg-[#0f1a40]/95 p-5 transition-colors duration-300">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#4c7dff]/10 text-[#6a93ff]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest text-[#6a93ff]/80 uppercase">Location</p>
                    <p className="mt-1 text-sm font-semibold text-white">Bogor Regency, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        <footer className="mt-16 border-t border-[#2f3f86]/40 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Alfiansyah Cahyo Wicaksono.  All rights reserved.
        </footer>

        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeProjectDetail}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} details`}
              className="relative z-10 w-full max-w-4xl rounded-3xl border border-[#4559c1]/40 bg-[#050b1f]/95 shadow-[0_25px_120px_rgba(0,0,0,0.75)]"
            >
                <div className="space-y-6 p-6 md:p-10 max-h-[90vh] overflow-y-auto">
                  <div className="mb-2 flex justify-start">
                    <button
                      type="button"
                      onClick={closeProjectDetail}
                      aria-label="Close project details"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/25"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                  </div>
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br">
                    {showProjectVideo && selectedProject.previewVideo ? (
                      <video
                        src={selectedProject.previewVideo}
                        controls
                        autoPlay
                        className="absolute inset-0 h-full w-full object-cover"
                        onEnded={() => setShowProjectVideo(false)}
                      />
                    ) : selectedProject.previewImage ? (
                      selectedProject.previewVideo ? (
                        <button
                          type="button"
                          className="absolute inset-0"
                          onClick={() => setShowProjectVideo(true)}
                          aria-label="Play project demo video"
                        >
                          <img
                            src={selectedProject.previewImage}
                            alt={`${selectedProject.title} preview`}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/35 text-white">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/65">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="none"
                              >
                                <polygon points="9 7 9 17 17 12 9 7" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      ) : (
                        <img
                          src={selectedProject.previewImage}
                          alt={`${selectedProject.title} preview`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      )
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
                    )}
                  </div>
                </div>
                <h3 className="text-3xl font-semibold text-white">{selectedProject.title}</h3>
                <p className="text-sm text-slate-300 leading-7">
                  {selectedProject.description}
                </p>
                <div>
                  <p className="text-lg font-semibold text-white">Tech Stack</p>
                  <p className="mt-1 text-base text-slate-200">{selectedProject.stack.join(", ")}</p>
                </div>
                <a
                  href={selectedProject.sourceLink ?? selectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#4c7dff]/40 bg-[#4c7dff]/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6a93ff]/25"
                >
                  Source Code
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                  >
                    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.22.7-3.9-1.4-3.9-1.4-.53-1.33-1.3-1.69-1.3-1.69-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.72-1.56-2.57-.3-5.27-1.29-5.27-5.74A4.5 4.5 0 0 1 5.5 8.5a4.18 4.18 0 0 1 .11-3s.97-.31 3.2 1.2a10.9 10.9 0 0 1 5.78 0c2.22-1.51 3.2-1.2 3.2-1.2a4.18 4.18 0 0 1 .12 3 4.5 4.5 0 0 1 1.2 2.98c0 4.47-2.7 5.43-5.28 5.72.41.35.77 1.05.77 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 12 .5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
