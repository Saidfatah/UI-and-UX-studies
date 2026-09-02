import WorksVideoImageItems from "./WorksVideoImageItems";

function WorksSection() {
    return (<section className="works">
        <div className="grid-w sticky top-[calc(var(--header-height)_-_1px)] h-[calc(100vh_-_var(--header-height))] border-y  overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-black-8" ></div>

            <div className="absolute left-1/2 top-0 w-[100vh] h-full border rounded-full translate-y-[-1px] -translate-x-1/2" >
                <div className="absolute top-[0px] left-1/2 w-[calc(50%_+_1px)] h-[50%] bg-white"></div>

                <div className="absolute left-[5%] w-[1px] h-[1px]  top-1/2">
                    <div className="absolute left-1/2 w-[200vw] h-px bg-black-8 -translate-x-1/2 -rotate-[35deg]" ></div>
                </div>

                <div className="absolute left-[45%] w-[1px] h-[1px]  top-1/2">
                    <div className="absolute left-1/2 w-[200vw] h-px bg-black-8 -translate-x-1/2 -rotate-[31deg]" ></div>
                </div>

                <div className="absolute -right-[8%] w-[1px] h-[1px]   top-1/2">
                    <div className="absolute left-1/2 w-[200vw] h-px bg-black-8 -translate-x-1/2 -rotate-[24deg]"></div>
                </div>
            </div>
        </div>


        <div className="relative grid-w -mt-[100vh] z-0 z-1 pointer-events-none">
            <WorksVideoImageItems />
        </div>
    </section>);
}

export default WorksSection;