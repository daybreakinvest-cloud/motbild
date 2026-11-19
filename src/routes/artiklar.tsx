import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/artiklar")({
  component: ArtiklarLayout,
});

function ArtiklarLayout() {
  return <Outlet />;
}
