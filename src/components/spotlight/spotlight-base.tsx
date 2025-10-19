import { Command } from "cmdk";
import React from "react";
import {
  Grid3x3,
  Plus,
  Users,
  FileText,
  Home,
  Clock,
  ArrowUpRight,
} from "lucide-react";

interface CommandItem {
  id: number;
  label: string;
  action?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;
  shortcut?: string;
  category?: string;
  time?: string;
}

interface MockData {
  navigation: CommandItem[];
  projects: CommandItem[];
  teams: CommandItem[];
  help: CommandItem[];
  recent: CommandItem[];
}

const mockData: MockData = {
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
      icon: undefined,
    },
    {
      id: 8,
      label: "Engineering Team",
      category: "Teams",
      time: "1h ago",
      icon: undefined,
    },
    {
      id: 9,
      label: "Q4 Planning",
      category: "Projects",
      time: "3h ago",
      icon: undefined,
    },
  ],
};

const SpotlightBase = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (item: CommandItem) => {
    console.log("Selected:", item.label);
    setOpen(false);
    setSearch("");
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setOpen(false)}
      />

      <div className="fixed z-50 top-32 left-1/2 w-full max-w-2xl -translate-x-1/2 px-4">
        <Command className="rounded-xl bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-3 pt-3 pb-2">
            <div className="text-sm text-neutral-400 mb-3 px-2">Home</div>

            {/* Search Input */}
            <div className="relative">
              <Command.Input
                value={search}
                onValueChange={setSearch}
                className="w-full bg-transparent text-neutral-200 text-2xl placeholder:text-neutral-600 focus:outline-none px-2 py-1"
                placeholder="What do you need?"
              />
            </div>
          </div>

          <div className="h-px bg-neutral-800 mx-3"></div>

          <Command.List className="max-h-96 overflow-auto px-3 py-3">
            <Command.Empty className="py-12 text-center">
              <p className="text-sm text-neutral-500">No results found</p>
            </Command.Empty>

            {/* Projects Section */}
            <Command.Group>
              <div className="text-sm text-neutral-400 px-2 mb-2">Projects</div>
              <div className="space-y-px">
                {mockData.projects.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.label}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg cursor-pointer text-neutral-300 hover:bg-neutral-900 data-[selected=true]:bg-neutral-900 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <item.icon className="h-4 w-4 text-neutral-500" />
                      )}
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.shortcut && (
                      <div className="flex items-center gap-1 text-xs text-neutral-600">
                        {item.shortcut.split(" ").map((key, i) => (
                          <kbd key={i} className="font-mono">
                            {key}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </Command.Item>
                ))}
              </div>
            </Command.Group>

            {/* Teams Section */}
            <Command.Group>
              <div className="text-sm text-neutral-400 px-2 mb-2 mt-4">
                Teams
              </div>
              <div className="space-y-px">
                {mockData.teams.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.label}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg cursor-pointer text-neutral-300 hover:bg-neutral-900 data-[selected=true]:bg-neutral-900 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <item.icon className="h-4 w-4 text-neutral-500" />
                      )}

                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.shortcut && (
                      <div className="flex items-center gap-1 text-xs text-neutral-600">
                        {item.shortcut.split(" ").map((key, i) => (
                          <kbd key={i} className="font-mono">
                            {key}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </Command.Item>
                ))}
              </div>
            </Command.Group>

            {/* Help Section */}
            <Command.Group>
              <div className="text-sm text-neutral-400 px-2 mb-2 mt-4">
                Help
              </div>
              <div className="space-y-px">
                {mockData.help.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.label}
                    onSelect={() => handleSelect(item)}
                    className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg cursor-pointer text-neutral-300 hover:bg-neutral-900 data-[selected=true]:bg-neutral-900 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <item.icon className="h-4 w-4 text-neutral-500" />
                      )}

                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.shortcut && (
                      <kbd className="text-xs text-neutral-600 font-mono">
                        {item.shortcut}
                      </kbd>
                    )}
                  </Command.Item>
                ))}
              </div>
            </Command.Group>

            {/* Recent Section - Only shows when not searching */}
            {!search && (
              <Command.Group>
                <div className="text-sm text-neutral-400 px-2 mb-2 mt-4">
                  Recent
                </div>
                <div className="space-y-px">
                  {mockData.recent.map((item) => (
                    <Command.Item
                      key={item.id}
                      value={item.label}
                      onSelect={() => handleSelect(item)}
                      className="flex items-center justify-between gap-3 px-2 py-2.5 rounded-lg cursor-pointer hover:bg-neutral-900 data-[selected=true]:bg-neutral-900 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Clock className="h-4 w-4 text-neutral-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-neutral-300 truncate">
                            {item.label}
                          </div>
                          <div className="text-xs text-neutral-600">
                            {item.category} · {item.time}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </Command.Item>
                  ))}
                </div>
              </Command.Group>
            )}
          </Command.List>

          {/* Footer */}
          <div className="border-t border-neutral-800 px-3 py-2.5 bg-neutral-950">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <kbd className="font-mono">↑</kbd>
                  <kbd className="font-mono">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="font-mono">↵</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="font-mono">ESC</kbd>
                  <span>Close</span>
                </span>
              </div>
            </div>
          </div>
        </Command>
      </div>
    </>
  );
};

export default SpotlightBase;
