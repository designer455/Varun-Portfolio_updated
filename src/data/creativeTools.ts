export interface CreativeToolItem {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export const CREATIVE_TOOLS: CreativeToolItem[] = [
  {
    id: "photoshop",
    name: "Photoshop",
    logo: "/assets/creative-tools/photoshop.svg",
    description: "High-resolution digital image compositing, visual asset retouching, and cinematic graphic finishing.",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    logo: "/assets/creative-tools/illustrator.svg",
    description: "Precision vector illustration, corporate identity typography, and scalable brand design systems.",
  },
  {
    id: "coreldraw",
    name: "CorelDRAW",
    logo: "/assets/creative-tools/coreldraw.svg",
    description: "Commercial print layouts, high-precision packaging architecture, and large-format production art.",
  },
  {
    id: "canva",
    name: "Canva",
    logo: "/assets/creative-tools/canva-icon.svg",
    description: "Rapid editorial layout ideation, social asset templating, and agile client brand kits.",
  },
];
