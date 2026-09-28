export interface DeploymentToolItem {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export const DEPLOYMENT_TOOLS: DeploymentToolItem[] = [
  {
    id: "vercel",
    name: "Vercel",
    logo: "/assets/deployment/vercel.svg",
    description: "Deployment, hosting, production releases, environment configuration, and web application delivery.",
  },
  {
    id: "hostinger",
    name: "Hostinger",
    logo: "/assets/deployment/hostinger.svg",
    description: "Web hosting, domain/server setup, PHP-based hosting environments, and website deployment.",
  },
  {
    id: "github",
    name: "GitHub",
    logo: "/assets/deployment/github.svg",
    description: "Git-based version control, repository management, branching, collaboration, and deployment workflows.",
  },
];
