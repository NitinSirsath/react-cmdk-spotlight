import { Command } from "cmdk";
import React from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { commandSections, type CommandItem } from "./data";

// Vercel-style command palette built on top of cmdk
export const CommandPalette: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSelect = (item: CommandItem) => {
    // TODO: wire real navigation/actions
    console.log("Selected:", item.label);
    setOpen(false);
    setSearch("");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/70"
          onClick={() => setOpen(false)}
        />
      )}

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command Palette"
        className="fixed top-24 left-1/2 z-50 w-full max-w-2xl -translate-x-1/2 rounded-2xl border border-white/10 bg-black/60 text-white shadow-2xl backdrop-blur-2xl overflow-hidden"
      >
        {/* Header / Search */}
        <div className="px-4 pt-4 pb-2">
          <div className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-2">
            Command Palette
          </div>
          <div className="relative flex items-center gap-2">
            <Command.Input
              value={search}
              onValueChange={setSearch}
              autoFocus
              className="w-full bg-transparent text-base md:text-lg placeholder:text-white/40 outline-none border-none ring-0 focus:ring-0 focus:outline-none"
              placeholder="Search projects, teams, docs..."
            />
            <div className="flex items-center gap-1 text-[10px] text-white/50">
              <kbd className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono">⌘</kbd>
              <kbd className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono">K</kbd>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10" />

        {/* Results */}
        <Command.List className="max-h-80 overflow-y-auto px-2 py-3 text-sm">
          <Command.Empty className="py-10 text-center text-sm text-white/60">
            No results found
          </Command.Empty>

          {/* Navigation */}
          <Command.Group heading="Navigation">
            <div className="mb-1 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Navigation
            </div>
            {commandSections.navigation.map((item) => (
              <Command.Item
                key={item.id}
                value={item.label}
                onSelect={() => handleSelect(item)}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-white/90 outline-none transition-colors hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <item.icon className="h-4 w-4 text-white/60" />
                  )}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <div className="flex items-center gap-1 text-[10px] text-white/50">
                    {item.shortcut.split(" ").map((key, i) => (
                      <kbd
                        key={i}
                        className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                )}
              </Command.Item>
            ))}
          </Command.Group>

          {/* Projects */}
          <Command.Group heading="Projects">
            <div className="mt-3 mb-1 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Projects
            </div>
            {commandSections.projects.map((item) => (
              <Command.Item
                key={item.id}
                value={item.label}
                onSelect={() => handleSelect(item)}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-white/90 outline-none transition-colors hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <item.icon className="h-4 w-4 text-white/60" />
                  )}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <div className="flex items-center gap-1 text-[10px] text-white/50">
                    {item.shortcut.split(" ").map((key, i) => (
                      <kbd
                        key={i}
                        className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                )}
              </Command.Item>
            ))}
          </Command.Group>

          {/* Teams */}
          <Command.Group heading="Teams">
            <div className="mt-3 mb-1 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Teams
            </div>
            {commandSections.teams.map((item) => (
              <Command.Item
                key={item.id}
                value={item.label}
                onSelect={() => handleSelect(item)}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-white/90 outline-none transition-colors hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <item.icon className="h-4 w-4 text-white/60" />
                  )}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <div className="flex items-center gap-1 text-[10px] text-white/50">
                    <kbd className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono">
                      {item.shortcut}
                    </kbd>
                  </div>
                )}
              </Command.Item>
            ))}
          </Command.Group>

          {/* Help */}
          <Command.Group heading="Help">
            <div className="mt-3 mb-1 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              Help
            </div>
            {commandSections.help.map((item) => (
              <Command.Item
                key={item.id}
                value={item.label}
                onSelect={() => handleSelect(item)}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-white/90 outline-none transition-colors hover:bg-white/10 data-[selected=true]:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  {item.icon && (
                    <item.icon className="h-4 w-4 text-white/60" />
                  )}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <kbd className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/60">
                    {item.shortcut}
                  </kbd>
                )}
              </Command.Item>
            ))}
          </Command.Group>

          {/* Recent items only when search is empty */}
          {!search && (
            <Command.Group heading="Recent">
              <div className="mt-3 mb-1 px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
                Recent
              </div>
              {commandSections.recent.map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.label}
                  onSelect={() => handleSelect(item)}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-2.5 text-sm text-white/90 outline-none transition-colors hover:bg-white/10 data-[selected=true]:bg-white/10"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Clock className="h-4 w-4 flex-shrink-0 text-white/60" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm text-white">
                        {item.label}
                      </div>
                      <div className="text-xs text-white/60">
                        {item.category} · {item.time}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-white/60 opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>

        {/* Footer shortcuts */}
        <div className="border-t border-white/10 bg-black/60 px-4 py-2.5 text-[11px] text-white/50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px]">
                  ↑
                </kbd>
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px]">
                  ↓
                </kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px]">
                  ↵
                </kbd>
                <span>Select</span>
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px]">
                  Esc
                </kbd>
                <span>Close</span>
              </span>
            </div>
            <span className="text-white/40">Cmd/Ctrl + K to toggle</span>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
};

export default CommandPalette;
