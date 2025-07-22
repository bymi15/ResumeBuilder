import { ResumeSchema } from "@/lib/schemas/resume-schema";

export const mockResume: ResumeSchema = {
  template: "standard",
  templateTheme: "elegant-black",
  fullName: "Alex Morgan",
  email: "alex.morgan@example.com",
  location: {
    city: "London",
    country: "United Kingdom",
  },
  currentRole: "Senior Software Engineer",
  profilePhoto:
    "data:image/png;base64,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",
  education: [
    {
      institute: "Global Institute of Technology",
      course: "B.Sc. in Computer Science",
      dateRange: {
        from: "2013-09-01",
        to: "2017-06-01",
      },
    },
    {
      institute: "International University",
      course: "M.Sc. in Software Engineering",
      dateRange: {
        from: "2017-09-01",
        to: "2019-06-01",
      },
    },
  ],
  workExperience: [
    {
      company: "TechSphere Solutions",
      location: "London, United Kingdom",
      dateRange: {
        from: "2022-01-01",
      },
      title: "Senior Software Engineer",
      description: [
        "Leading frontend architecture design for enterprise web applications",
        "Collaborating cross-functionally with product and design teams",
      ],
    },
    {
      company: "CodeFlow Inc.",
      location: "Amsterdam, Netherlands",
      dateRange: {
        from: "2019-01-01",
        to: "2021-12-31",
      },
      title: "Full Stack Developer",
      description: [
        "Developed and maintained scalable REST APIs",
        "Improved CI/CD pipeline reducing deployment time by 30%",
        "Mentored junior engineers and conducted code reviews",
        "Implemented reusable UI components using React",
      ],
    },
  ],
  projects: [
    {
      title: "Cross-Platform Resume Builder",
      type: "Open Source",
      description: ["Built a customizable resume generator using React and TypeScript"],
      dateRange: {
        from: "2023-01-01",
        to: "2023-06-01",
      },
    },
    {
      title: "E-Commerce Dashboard",
      type: "Freelance",
      description: [
        "Developed an analytics dashboard for a small online retailer",
        "Implemented charting features with Recharts and real-time updates",
        "Optimized performance for mobile devices",
      ],
      dateRange: {
        from: "2022-01-01",
        to: "2022-12-31",
      },
    },
  ],
  achievements: [
    {
      title: "Hackathon Winner",
      institute: "Open Dev Hack 2023",
      description: "Built an AI-powered job matching tool in 36 hours",
      date: "2023-06-01",
    },
    {
      title: "Dean's List",
      institute: "International University",
      description: "Recognized for academic excellence in Software Engineering",
      date: "2018-12-01",
    },
  ],
  activities: [
    {
      title: "Tech Speaker",
      locationOrCompany: "React Europe",
      dateRange: {
        from: "2023-05-01",
        to: "2023-05-01",
      },
    },
    {
      title: "Volunteer Developer",
      locationOrCompany: "Code for Good",
      dateRange: {
        from: "2021-01-01",
        to: "2022-01-01",
      },
    },
  ],
  skills: [
    { value: "TypeScript" },
    { value: "React" },
    { value: "Node.js" },
    { value: "GraphQL" },
    { value: "Docker" },
  ],
  links: [
    {
      label: "Portfolio",
      url: "https://styledresume.com",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com",
    },
    {
      label: "GitHub",
      url: "https://github.com",
    },
  ],
} as const;
