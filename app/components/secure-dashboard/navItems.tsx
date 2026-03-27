import { Command, FolderOpen, Home, LogIn, Network } from "lucide-react";
import { type ComponentType } from "react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const navItems: NavItem[] = [
  { id: "inicio", label: "Inicio", href: "#inicio", icon: Home },
  {
    id: "expedientes",
    label: "Expedientes (Discografia)",
    href: "#expedientes",
    icon: FolderOpen,
  },
  {
    id: "analisis",
    label: "Analisis de Red",
    href: "#analisis-red",
    icon: Network,
  },
  {
    id: "consola",
    label: "Consola Demo",
    href: "/consola",
    icon: Command,
  },
  {
    id: "login",
    label: "Login",
    href: "/login",
    icon: LogIn,
  },
];
