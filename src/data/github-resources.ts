import { iconLibraries } from "./icon-libraries";

export type GithubResource = {
  source: "icons" | "components" | "tools" | "mcp";
  key: string;
  githubRepo: string;
};

export const githubResources: GithubResource[] = iconLibraries.map(
  (library) => ({
    source: "icons",
    key: library.name,
    githubRepo: library.githubRepo,
  }),
);
