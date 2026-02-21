export type NetworkCategory =
  | "CMS & Servidores"
  | "Analitica y Rastreo"
  | "Librerias Visuales";

export type NetworkTechnology = {
  id: string;
  name: string;
  category: NetworkCategory;
};

export const NETWORK_SCAN_DATA: NetworkTechnology[] = [
  { id: "drupal", name: "Drupal", category: "CMS & Servidores" },
  { id: "nginx", name: "Nginx", category: "CMS & Servidores" },
  {
    id: "aws",
    name: "Amazon Web Services",
    category: "CMS & Servidores",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    category: "Analitica y Rastreo",
  },
  {
    id: "adobe-experience-platform",
    name: "Adobe Experience Platform",
    category: "Analitica y Rastreo",
  },
  { id: "gsap", name: "GSAP", category: "Librerias Visuales" },
  { id: "jquery", name: "jQuery", category: "Librerias Visuales" },
];
