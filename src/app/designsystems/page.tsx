"use client";

import { Inter } from "next/font/google";
import SignupForm from "./SignupForm";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], weight: ["400"] });

function Page() {
    return (
        <div
            className={clsx(inter.className, "p-[16px] w-screen h-screen  flex justify-center  items-center bg-black")}
        >
            <SignupForm />
        </div>
    );
}

export default Page;
