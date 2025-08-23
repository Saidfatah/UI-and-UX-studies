'use client';
import "./chriskalfatis.style.css"
import Cursor from "./Cursor";
import RollingWord from "./RollingWord";


function ChrisKalafatis() {
    return (<div className=" select-none w-screen h-screen bg-black flex items-start justify-center p-[32px]">
        <Cursor />

        <div className="w-full flex items-center justify-center gap-[16px]">
            <RollingWord word="PROJECTS" />
            <RollingWord word="ABOUT" />
        </div>

    </div>);
}

export default ChrisKalafatis;