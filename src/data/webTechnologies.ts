export interface WebTechnologyItem {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export const WEB_TECHNOLOGIES: WebTechnologyItem[] = [
  {
    id: "html",
    name: "HTML",
    logo: "/assets/web-tech/html.svg",
    description: "Semantic document architecture, accessible DOM structures, and modern SEO foundations.",
  },
  {
    id: "css",
    name: "CSS",
    logo: "/assets/web-tech/css.svg",
    description: "Responsive layouts, fluid design systems, custom properties, and hardware-accelerated animations.",
  },
  {
    id: "javascript",
    name: "JavaScript",
    logo: "/assets/web-tech/javascript.svg",
    description: "Dynamic client-side execution, asynchronous state management, and modern ESNext interactivity.",
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    logo: "/assets/web-tech/bootstrap.svg",
    description: "Rapid responsive grid scaffolding, flexible utility styling, and cross-browser interface components.",
  },
  {
    id: "wordpress",
    name: "WordPress",
    logo: "/assets/web-tech/wordpress.svg",
    description: "Custom content management architecture, dynamic CMS layouts, and custom theme engineering.",
  },
  {
    id: "php",
    name: "PHP",
    logo: "/assets/web-tech/php.svg",
    description: "Server-side web logic, template parsing, custom API endpoints, and database connectivity.",
  },
  {
    id: "react",
    name: "React.js",
    logo: "/assets/web-tech/react.svg",
    description: "Component-driven single page applications, reactive state hooks, and modular UI architectures.",
  },
  {
    id: "shopify",
    name: "Shopify",
    logo: "/assets/web-tech/shopify.svg",
    description: "Modern e-commerce storefront development, Liquid templating, and optimized online sales workflows.",
  },
];
