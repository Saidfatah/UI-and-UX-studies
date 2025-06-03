'use client'
import "./clerk.css";
import { GeistSans } from 'geist/font/sans';
import clsx from "clsx";
import ClerkDocumentationMap from "./ClerkDocumentationMap/ClerkDocumentationMap";
import { sectionsLinks } from "./ClerkDocumentationMap/utils";

function getRandomWidth(base: number, variance: number) {
    return `${base + Math.random() * variance}%`;
}

function getRandomHeight(base: number, variance: number) {
    return `${base + Math.random() * variance}px`;
}

function getRandomCount(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Clerk() {
    const randomizedSections = sectionsLinks.slice(0, getRandomCount(5, 10));

    return (
        <div className={clsx("bg-black w-screen h-fit flex items-start justify-between", GeistSans.className)}>
            <div className="p-[4rem]">
                {randomizedSections.map((link) => (
                    <div key={link.href} id={link.href.substring(1)} className={clsx("w-full  mb-[12px]", link.height)}>
                        <h1 className="text-white">{link.title}</h1>
                        <div className="p-6">
                            {[...Array(getRandomCount(5, 20))].map((_, index) => (
                                <p
                                    key={index}
                                    className="leading-relaxed mb-3 animate-pulse bg-gray-400"
                                    style={{ height: getRandomHeight(8, 4), width: getRandomWidth(50, 30) }}
                                ></p>
                            ))}
                        </div>

                        {link.subLinks?.map((subLik) => (
                            <div key={subLik.href} id={subLik.href.substring(1)} className={clsx("w-full mb-[12px]", subLik.height)}>
                                <h1 className="text-white">{subLik.title}</h1>
                                <div className="p-6">
                                    {[...Array(getRandomCount(4, 16))].map((_, index) => (
                                        <p
                                            key={index}
                                            className="leading-relaxed mb-3 animate-pulse bg-gray-400"
                                            style={{ height: getRandomHeight(8, 4), width: getRandomWidth(50, 30) }}
                                        ></p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="h-[500px]">
                <ClerkDocumentationMap />
            </div>
        </div>
    );
}

export default Clerk;
