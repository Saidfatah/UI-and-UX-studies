"use client";
import Header from "./header";
import HomeCoverSection from "./HomeCoverSection";
import HomeCoverTitle from "./HomeCoverTitle";
import "./style.css";

import { CustomEase } from "gsap/CustomEase";
import {gsap} from "gsap";
import { useEffect, useState } from "react";

gsap.registerPlugin(CustomEase);

CustomEase.create("beaucoup.alpha", ".25, .46, .45, .9");

CustomEase.create(
    "beaucoup.inOut",
    "M0,0 C0.094,0.026 0.124,0.127 0.157,0.29 0.197,0.486 0.243,0.81 0.337,0.894 0.409,0.959 0.374,1 1,1"
);

CustomEase.create(
    "beaucoup.slowInOut",
    "M0,0 C0.2,0 0,1 1,1"
);

function PrototypeStudio() {

    

    return (
        <>
            <Header />
            <div className="main content">
                <div className="home h-screen flex justify-center items-center">
                    <HomeCoverSection />
                </div>
            </div>
        </>
    );
}

export default PrototypeStudio;