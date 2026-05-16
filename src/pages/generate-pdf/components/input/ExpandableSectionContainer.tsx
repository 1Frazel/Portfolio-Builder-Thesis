import React, { useState } from "react";

type ExpandableSectionContainerProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  addButtonTitle?: string;
  onAdd?: () => void;
  childrenContainerClass?: string;
  summaryMode?: boolean;
};

type ExpandableSectionItemProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: () => void;
  defaultExpanded?: boolean;
};

const iconButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-lg font-bold text-[#3057b5] transition hover:bg-[#eef3ff] disabled:cursor-not-allowed disabled:text-slate-300";

const headerActionButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-md text-[#3057b5] transition hover:bg-[#eef3ff]";

const ExpandableSectionContainer = ({
  children,
  title,
  description,
  addButtonTitle,
  onAdd,
  childrenContainerClass = "mt-6 flex flex-col gap-4 sm:gap-5",
  summaryMode = false,
}: ExpandableSectionContainerProps) => {
  const [isContentVisible, setIsContentVisible] = useState(true);
  const shouldShowContent = !summaryMode || isContentVisible;
  const sectionClassName =
    summaryMode && !isContentVisible
      ? "rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-lg sm:px-6 lg:px-8"
      : "flex h-[calc(100vh-220px)] min-h-0 flex-col rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-lg sm:px-6 lg:px-8 overflow-hidden";

  return (
    <section className={sectionClassName}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[32px] font-bold leading-tight text-slate-900 sm:text-[36px]">
          {title}
        </h2>
        {summaryMode && (
          <button
            type="button"
            onClick={() => setIsContentVisible((prev) => !prev)}
            className="inline-flex min-h-9 items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-[#3057b5] transition hover:bg-[#eef3ff]"
            aria-label={
              isContentVisible ? `Collapse ${title}` : `Expand ${title}`
            }
          >
            {isContentVisible ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {shouldShowContent && description && (
        <p className="mt-2 max-w-2xl text-sm leading-5 text-slate-600 sm:text-base">
          {description}
        </p>
      )}

      {shouldShowContent && (
        <div
          className={`${childrenContainerClass} min-h-0 flex-1 overflow-auto`}
        >
          {children}
        </div>
      )}

      {shouldShowContent && addButtonTitle && onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3d5ad4] transition hover:text-[#2e46aa] sm:text-base"
        >
          <span className="text-lg">＋</span>
          {addButtonTitle}
        </button>
      )}
    </section>
  );
};

const ExpandableSectionItem = ({
  children,
  title,
  description,
  index,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onDelete,
  defaultExpanded = false,
}: ExpandableSectionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="mt-2 flex flex-col gap-2">
        <button
          type="button"
          className={iconButtonClass}
          disabled={isFirst}
          onClick={() => onMoveUp(index)}
          aria-label="Move section up"
        >
          ↑
        </button>
        <button
          type="button"
          className={iconButtonClass}
          disabled={isLast}
          onClick={() => onMoveDown(index)}
          aria-label="Move section down"
        >
          ↓
        </button>
      </div>

      <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-slate-500 sm:text-sm">{description}</p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              className={headerActionButtonClass}
              onClick={onDelete}
              aria-label="Delete section"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={headerActionButtonClass}
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-label={isExpanded ? "Collapse section" : "Expand section"}
            >
              {isExpanded ? "▴" : "▾"}
            </button>
          </div>
        </div>

        {isExpanded && <div className="px-4 py-4 sm:px-5">{children}</div>}
      </div>
    </div>
  );
};

export { ExpandableSectionContainer, ExpandableSectionItem };
