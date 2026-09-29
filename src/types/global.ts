export const iconMap: Record<string, string> = {
  Laravel: "logos:laravel",
  PHP: "logos:php",
  MySQL: "logos:mysql",
  "Inertia.js": "simple-icons:inertia",
  React: "logos:react",
  "Tailwind CSS": "logos:tailwindcss-icon",
  Redis: "logos:redis",
  "React Native": "logos:react",
  Expo: "simple-icons:expo",
  TypeScript: "logos:typescript-icon",
  "REST API": "carbon:api",
  "Firebase Cloud Messaging (FCM)": "logos:firebase",
};

export interface ProjectsAspect {
  aspect_title: string;
  description: string;
  tech_stack: string[];
  repo_url: string | null;
}

export interface ExperienceProp {
  id: string;
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean | null;
  description: string | null;
  created_at: string | null;
}

export interface ProjectProp {
  id: string;
  title: string;
  slug: string;
  summary: string;
  status: string;
  thumbnail_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  project_aspects: ProjectsAspect[];
}
