import type { IconLibrary } from "../data/icon-libraries";
import IconLibraryActions from "./icon-library-actions";
import { TooltipProvider } from "./tooltip";

type Props = {
  libraries: IconLibrary[];
};

const formatStars = (stars?: string) => {
  if (!stars) return null;
  return stars.replace(/^(\d+)\+$/, (_, value) => {
    const count = Number(value);
    return count < 1000 ? `${Math.floor(count / 100) * 100}+` : `${count}+`;
  });
};

export default function IconLibraryDirectory({ libraries }: Props) {
  return (
    <TooltipProvider>
      <div>
        {libraries.map((library) => {
          const githubOwner =
            new URL(library.githubUrl).pathname.split("/").filter(Boolean)[0] ??
            "github";
          const displayStars = formatStars(library.stars);

          return (
            <article
              className="flex items-start gap-3 border-b border-line-default py-4 sm:items-center"
              key={library.name}
            >
              <img
                src={`https://github.com/${githubOwner}.png?size=80`}
                alt=""
                aria-hidden="true"
                width="40"
                height="40"
                loading="lazy"
                decoding="async"
                className="size-10 shrink-0 rounded-xl border border-line-default bg-fill-subtle object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <h2 className="type-body-md truncate font-[450] text-content-primary">
                    {library.name}
                  </h2>
                  {displayStars && (
                    <span
                      className="type-body-sm inline-flex items-center gap-1 text-content-muted"
                      aria-label={`${displayStars} GitHub stars`}
                    >
                      <span aria-hidden="true" className="text-[11px]">
                        ★
                      </span>
                      {displayStars}
                    </span>
                  )}
                </div>
                <p className="type-body-md truncate text-content-secondary">
                  {library.description}
                </p>
              </div>

              <IconLibraryActions
                name={library.name}
                websiteUrl={library.websiteUrl}
                githubUrl={library.githubUrl}
              />
            </article>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
