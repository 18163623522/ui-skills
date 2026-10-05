import githubMetadata from "../data/github-metadata.json";
import type { ComponentLibrary } from "../data/component-libraries";
import IconLibraryActions from "./icon-library-actions";
import { TooltipProvider } from "./tooltip";

type GithubMetadata = {
  repositories: Record<string, { stars: number }>;
};

type Props = {
  libraries: ComponentLibrary[];
};

const repositoryMetadata = githubMetadata as GithubMetadata;

const getWebsiteHost = (websiteUrl: string) => {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./, "");
  } catch {
    return "component-library";
  }
};

const formatStars = (stars?: number) => {
  if (!stars) return null;
  if (stars < 1000) return `${Math.floor(stars / 100) * 100}+`;
  if (stars < 10000) {
    return `${(Math.floor(stars / 100) / 10).toFixed(1).replace(".0", "")}k+`;
  }
  return `${Math.floor(stars / 1000)}k+`;
};

export default function ComponentLibraryDirectory({ libraries }: Props) {
  return (
    <TooltipProvider>
      <div>
        {libraries.map((library) => {
          const repository = library.githubRepo
            ? repositoryMetadata.repositories[library.githubRepo.toLowerCase()]
            : undefined;
          const displayStars = formatStars(repository?.stars);
          const host = getWebsiteHost(library.websiteUrl);
          const githubOwner = library.githubRepo?.split("/")[0];
          const avatarUrl = githubOwner
            ? `https://github.com/${githubOwner}.png?size=80`
            : `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
          const avatarHref = library.githubRepo
            ? `https://github.com/${library.githubRepo}`
            : library.websiteUrl;
          const avatarLabel = library.githubRepo
            ? `Open ${library.name} on GitHub`
            : `Open ${library.name} website`;

          return (
            <article
              className="border-line-default flex items-start gap-3 border-b py-4 sm:items-center"
              key={library.name}
            >
              <a
                href={avatarHref}
                aria-label={avatarLabel}
                className="shrink-0"
              >
                <img
                  src={avatarUrl}
                  alt=""
                  aria-hidden="true"
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className="border-line-default bg-fill-subtle size-10 rounded-xl border object-cover"
                />
              </a>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <h2 className="type-body-md text-content-primary truncate font-[450]">
                    {library.name}
                  </h2>
                  {displayStars && (
                    <span
                      className="type-body-sm text-content-muted inline-flex items-center gap-1"
                      aria-label={`${displayStars} GitHub stars`}
                    >
                      <span aria-hidden="true" className="text-[11px]">
                        ★
                      </span>
                      {displayStars}
                    </span>
                  )}
                </div>
                <p className="type-body-md text-content-secondary truncate">
                  {library.description}
                </p>
              </div>

              <IconLibraryActions
                name={library.name}
                websiteUrl={library.websiteUrl}
                githubUrl={
                  library.githubRepo
                    ? `https://github.com/${library.githubRepo}`
                    : undefined
                }
              />
            </article>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
