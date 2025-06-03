'use client'
import { useEffect, useRef } from "react";
import './tupleProgress.css'
import Workflow from "./Workflow/Workflow";

function Page() {

    return (<div className="bg-black">
        <div className=" bg-black h-screen w-screen relative ">

        </div>

        <Workflow />
        <div className=" bg-black h-screen w-screen relative ">

        </div>

    </div>);
}

export default Page;