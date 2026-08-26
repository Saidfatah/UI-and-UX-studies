"use client";
import Header from "./header";
import HomeCoverSection from "./HomeCoverSection";
import "./style.css";

function PrototypeStudio() {


    return (
        <>
            <Header />
            <div className="main content">
                <div className="home">
                    <HomeCoverSection/>
                </div>
            </div>
        </>
    );
}

export default PrototypeStudio;