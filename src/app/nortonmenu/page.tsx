'use client'
import { useEffect, useState } from "react";
import NortonLogo from "./NortonLogo";
import NortonMenuButton from "./NortonMenuButton";
import './norton.css'


function NortonCommandoMenu() {
    const [opened, setOpened] = useState(false);
    const [scrolledDown, setScrolledDown] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10 && !opened) setScrolledDown(true)
            else setScrolledDown(false)
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [opened]);


    return (<div className="relative  w-screen bg-white" >
        <header
            style={{
                transform: `translateY(${scrolledDown ? -100 : 0}%)`,
                background: (scrolledDown || opened) ? '#000' : 'transparent',
            }}
        >
            <div className="header_container" >
                <NortonLogo opened={opened} />
                <NortonMenuButton setOpened={setOpened} opened={opened} />
            </div>
            {
                opened && (
                    <nav
                        className={opened ? "nav_container_opened" : ""}
                    >
                        <div className="first_links_group flex justify-center flex-col items-center">
                            <p className="nav_links_title menu_small_text" >LIMITED EDITIONS</p>
                            <p className="menu_link menu_link_1 leading-0 " >COMMANDO 961 LE</p>
                            <p className="menu_link menu_link_2 leading-0">V4SV LE & V4CR LE</p>
                        </div>
                        <div className="second_links_group flex justify-center flex-col items-center">
                            <p className="nav_links_title menu_small_text"  >LIMITED EDITIONS</p>
                            <p className="menu_link menu_link_1">COMMANDO 961</p>
                            <p className="menu_link menu_link_2">V4SV</p>
                            <p className="menu_link menu_link_3">V4CR</p>
                        </div>

                        <div className="menu_footer_links menu_small_text">
                            <p>REQUEST A TEST RIDE</p>
                            <p>DEALER LOCATOR</p>
                            <p>ONLINE STORE</p>
                            <p>ROLLING REVIEWS</p>
                            <p>STORIES</p>
                            <p>OWNERS</p>
                            <p>CONTACT US</p>
                            <p>CAREERS</p>
                        </div>
                    </nav>
                )
            }

        </header>

        <div className=" max-h-screen w-screen" >
            <img  src="/images/commando.webp" />
        </div>

        <div className="h-screen w-screen bg-white flex justify-center items-center " >
            some content here
        </div>
    </div>
    );
}

export default NortonCommandoMenu;