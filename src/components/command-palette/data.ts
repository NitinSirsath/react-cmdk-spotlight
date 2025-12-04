import { Grid3x3, Plus, Users, FileText, Home, Clock, ArrowUpRight } from "lucide-react";
import type React from "react";

export interface CommandItem {
  id: number;
  label: string;
  action?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  shortcut?: string;
  category?: string;
  time?: string;
}

export interface CommandSections {
  navigation: CommandItem[];
  projects: CommandItem[];
  teams: CommandItem[];
  help: CommandItem[];
  recent: CommandItem[];
}

export const commandSections: CommandSections = {
  navigation: [
    { id: 1, label: "Home", action: "Go to Home", icon: Home, shortcut: "H" },
  ],
  projects: [
    { id: 2, label: "Search Projects...", icon: Grid3x3, shortcut: "S P" },
    { id: 3, label: "Create New Project...", icon: Plus },
  ],
  teams: [
    { id: 4, label: "Search Teams...", icon: Users, shortcut: "⇧ P" },
    { id: 5, label: "Create New Team...", icon: Plus },
  ],
  help: [{ id: 6, label: "Search Docs...", icon: FileText, shortcut: "D" }],
  recent: [
    {
      id: 7,
      label: "Marketing Dashboard",
      category: "Projects",
      time: "2m ago",
    },
    {
      id: 8,
      label: "Engineering Team",
      category: "Teams",
      time: "1h ago",
    },
    {
      id: 9,
      label: "Q4 Planning",
      category: "Projects",
      time: "3h ago",
    },
  ],
};
