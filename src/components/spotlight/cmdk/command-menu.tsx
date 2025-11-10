import { Command } from "cmdk";
import React from "react";

export const CommandMenu = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {open && (
        <div className="fixed inset-0  z-40" onClick={() => setOpen(false)} />
      )}

      <div className="fixed z-50 top-32 left-1/2 w-full max-w-3xl -translate-x-1/2 px-4">
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg text-white shadow-lg bg-white/20 backdrop-blur-md p-4 min-w-2xl"
        >
          <Command.Input
            className="w-full border rounded-sm mb-2 bg-transparent text-white text-2xl placeholder:text-white/60 focus:outline-none px-2 py-1"
            placeholder="What do you need?"
          />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Letters">
              <Command.Item>a</Command.Item>
              <Command.Item>b</Command.Item>
              <Command.Separator />
              <Command.Item>c</Command.Item>
            </Command.Group>

            <Command.Item>Apple</Command.Item>
          </Command.List>
        </Command.Dialog>
      </div>
    </>
  );
};
