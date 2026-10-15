export const site = {
  name: "Dinesh Sharma",
  role: "AI Engineer · Data Scientist",
  headline: "Engineering intelligence from data, models, and systems.",
  profileUrl: "https://dinesh-sharma-three.vercel.app/",
  email: "dineshsharma004785@gmail.com",
  github: "https://github.com/Dinesh-Sharma2004",
  linkedin: "https://linkedin.com/in/dinesh-sharma-ds"
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
] as const;

export const socials = [
  { label: "GitHub", href: site.github, value: "github.com/Dinesh-Sharma2004", icon: "github" as const },
  { label: "LinkedIn", href: site.linkedin, value: "linkedin.com/in/dinesh-sharma-ds", icon: "linkedin" as const },
  { label: "Email", href: `mailto:${site.email}`, value: site.email, icon: "mail" as const }
];

/** Section ids in document order — used for scroll-driven scene states + nav. */
export const sectionOrder = ["home", "capabilities", "work", "about", "contact"] as const;
export type SectionId = (typeof sectionOrder)[number];
