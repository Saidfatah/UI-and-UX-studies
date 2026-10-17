function SearchIcon() {
    return (
        <div
            className="flex shrink-0 items-center gap-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                data-testid="search-page-search-icon"
                className="mr-0.5 ml-2 size-5 shrink-0  text-tertiary transition-colors in-data-[curated-collection-hero]:text-black/60">
                <path stroke="currentColor" stroke-width="1.75" d="M20.25 20.25 16 16"></path>
                <circle
                    cx="10.75"
                    cy="10.75"
                    r="7.5"
                    stroke="currentColor" stroke-width="1.754"
                >
                </circle>
            </svg>
        </div>
    );
}

export default SearchIcon;