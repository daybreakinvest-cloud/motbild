import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/en/articles")({
  component: EnglishArticlesLayout,
});

function EnglishArticlesLayout() {
  return <Outlet />;
}
