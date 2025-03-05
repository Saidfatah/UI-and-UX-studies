import { ReactNode } from "react";
import SeamlessDropdown from "./seamlessDropdown";


function SeamlessNavBarLayout({ children }: { children: ReactNode }) {
    return (<div className="flex flex-col p-[20px] justify-start items-start w-screen h-screen bg-white" >
        <SeamlessDropdown />
        {children}
    </div>);
}

export default SeamlessNavBarLayout;