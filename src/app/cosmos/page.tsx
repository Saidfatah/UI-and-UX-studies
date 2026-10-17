import "./style.css"
import SearchPlaceholder from "./SearchPlaceholder";
import SearchIcon from "./SearchIcon";

function Cosmos() {
    return (<div className="w-screen h-screen flex  bg-[#F6F4F2] items-start justify-start p-[24px]">
        <div className="w-full h-[92px] p-[24px] flex justify-center  items-center">
            <div className="w-[600px] bg-elevation-light border-[0.5px] inset-shadow-glass shadow-sm border-[#CACACA] p-[8px] rounded-full  flex items-center justify-start gap-[8px] h-[56px]">

                <SearchIcon />

                <div className="relative flex min-w-0 flex-1">

                    <input
                        data-list-empty=""
                        autoComplete="off"
                        spellCheck="false"
                        autoCorrect="off"
                        autoCapitalize="none"
                        role="combobox"
                        aria-expanded="false"
                        aria-haspopup="listbox"
                        aria-autocomplete="list"
                        id="base-ui-_R_3pepfiutaqdb_"
                        data-testid="search-page-input"
                        className="h-[17px] outline-none text-body-regular focus-visible:rounded-none!   relative z-1 w-full select-text bg-transparent text-black transition-colors"
                        name="search"
                        value=""
                    >

                    </input>

                    <div className="text-[14px] text-body-regular pointer-events-none absolute top-1/2 left-0 max-w-full -translate-y-1/2 truncate whitespace-nowrap text-tertiary  transition-colors group-hover:text-secondary">
                        <div className=" flex max-w-full gap-1 ">
                            <span>Try</span>
                            <SearchPlaceholder />
                        </div>
                    </div>

                </div>

                <div className="flex items-center gap-[0px]">

                    <button
                        type="button"
                        data-search-panel-trigger="true"
                        data-testid="search-page-search-by-image-btn"
                        className="group cursor-pointer rounded-full"
                        aria-label="Visual search"
                        id="base-ui-_R_vcqrpepfiutaqdb_"
                    >
                        <div className="relative flex size-8.5 items-center justify-center rounded-full transition-colors duration-[100ms] hover:bg-[#e8e6e4]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="size-6 shrink-0 text-tertiary transition-colors duration-[100ms] group-hover:text-black">
                                <path stroke="currentColor" stroke-width="1.75" d="M9 4h-.2c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 6.28 4 7.12 4 8.8V9m11-5h.2c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 6.28 20 7.12 20 8.8V9M9 20h-.2c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 17.72 4 16.88 4 15.2V15m11 5h.2c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C20 17.72 20 16.88 20 15.2V15"></path><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-linecap="square" stroke-width="1.75">

                                </circle>
                            </svg>
                        </div>
                    </button>
                    <button
                        type="button"
                        data-search-panel-trigger="true"
                        data-testid="search-page-search-by-image-btn"
                        className="group cursor-pointer rounded-full"
                        aria-label="Visual search"
                        id="base-ui-_R_vcqrpepfiutaqdb_"
                    >
                        <div className="relative flex size-8.5 items-center justify-center rounded-full transition-colors duration-[100ms] hover:bg-[#e8e6e4]">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-6 shrink-0 text-tertiary transition-colors group-hover/color:text-primary">
                                    <ellipse cx="6.79559" cy="17.1179" rx="1.95202" ry="1.94063" fill="#4694F6"></ellipse><ellipse cx="17.2053" cy="17.2312" rx="1.95202" ry="1.94063" fill="#C877CB"></ellipse><ellipse cx="6.79559" cy="6.88204" rx="1.95202" ry="1.94063" fill="#81B386"></ellipse><ellipse cx="17.2053" cy="6.76876" rx="1.95202" ry="1.94063" fill="#9C6030"></ellipse><ellipse cx="19.5476" cy="11.6857" rx="1.95202" ry="1.94063" fill="#A0213E"></ellipse><ellipse cx="12.0005" cy="4.44063" rx="1.95202" ry="1.94063" fill="#EBB042"></ellipse><ellipse cx="4.45208" cy="11.6857" rx="1.95202" ry="1.94063" fill="#77CDD0"></ellipse><ellipse cx="12" cy="19.5593" rx="1.95202" ry="1.94063" fill="#6951F5"></ellipse>
                                    </svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>);
}

export default Cosmos;