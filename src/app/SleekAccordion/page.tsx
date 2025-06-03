"use client"
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'




const items = [
    {
        title: "GP/LP Introductions",
        children: "Build meaningful connections with top General Partners and Limited Partners, opening doors to strategic investments and partnerships.",

        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>

    },
    {
        title: "Personalized mentorship",
        children: "Gain exclusive access to seasoned industry leaders who provide tailored guidance to accelerate your growth and decision-making.",

        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>

    },
    {
        title: "Room to Fail",
        children: "Innovate fearlessly in a supportive environment where calculated risks and learning from setbacks are encouraged for long-term success.",

        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>

    },
    {
        title: "Access to a Global Network",
        children: "Expand your reach and collaborate with influential investors, founders, and thought leaders across industries worldwide.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
        </svg>

    },
    {
        title: "Exclusive Summits & Networking Events",
        children: "Engage with top-tier professionals in high-impact summits and curated networking events designed to spark collaborations and deal-making.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>

    },
    {
        title: "Reduce time and complexity of back office",
        children: "Streamline operations and eliminate administrative burdens with efficient solutions that let you focus on growth and strategy.",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>



    },
]

const Accordion = ({
    open,
    onClick,
    children,
    title,
    icon,
    onExpandComplete,
}: {
    icon: ReactNode;
    open: boolean;
    onClick: () => void;
    children: ReactNode;
    title: string;
    onExpandComplete: () => void;
}) => (
    <div onClick={onClick} className="flex flex-col  text-[16px] ">
        <div
            style={{
                transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            className="flex gap-[16px] items-center p-[12px]  rounded-lg bg-transparent hover:bg-[#feffff]"
        >
            <div className="w-[24px] h-[24px]">{icon}</div>
            <p className=''>{title}</p>
        </div>
        <AnimatePresence mode="wait">
            {open && (
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    onAnimationComplete={onExpandComplete} // ✅ Triggers after expansion
                    className="overflow-hidden"
                >
                    <motion.div
                        initial={{ opacity: 0, transform:" translateY(10px)" }}
                        animate={{ opacity: 1,transform:" translateY(0px)" }}
                        exit={{ opacity: 0,transform:" translateY(10px) " }}
                        transition={{ duration: open ? 1.5 : 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        className="p-2 pl-[53px]  tracking-wide">
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);


const SleekAccordion = () => {
    const activeItemBackgroundRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [opened, setOpened] = useState(items[0].title);

    useEffect(() => {
        const activeItem = itemRefs.current[opened];
        if (!activeItem || !activeItemBackgroundRef.current) return;
        
        const updateBackground = () => {
            const { offsetTop, offsetHeight } = activeItem;
            if (activeItemBackgroundRef.current) {
                activeItemBackgroundRef.current.style.top = `${offsetTop}px`;
                activeItemBackgroundRef.current.style.height = `${offsetHeight}px`;
            }
        };

        // **Listen for height changes**
        const observer = new ResizeObserver(updateBackground);
        observer.observe(activeItem);

        // **Listen for transition end**
        activeItem.addEventListener("transitionend", updateBackground);

        // **Initial update**
        updateBackground();

        return () => {
            observer.disconnect();
            activeItem.removeEventListener("transitionend", updateBackground);
        };
    }, [opened]);

    return (
        <div className="w-screen h-screen flex flex-col mx-auto p-[32px] justify-start bg-[#f2f2f2] items-start">
            <div className='w-[568px] h-full py-[6rem] max-h-full flex flex-col items-stretch justify-between'>

                <div className="flex flex-col gap-[16px] mb-[16px]">
                    <h1 className=' text-[30px]'>We provide far more than just funding</h1>
                    <p className='text-[16px]'>
                        Nimbus is a comprehensive capital partner in your fund's journey to
                        minimize the risk of ruining your first fund.
                    </p>
                    <p className='text-[16px]'>Here is what you can expect.</p>
                </div>

                <div className="relative flex flex-col gap-[4px] ">
                    <div
                        ref={activeItemBackgroundRef}
                        style={{
                            transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
                        }}
                        className="left-0 top-0 w-full z-[3] rounded-lg bg-gradient-to-b shadow-sm bg-[#feffff] absolute "
                    />
                    {items.map((item) => (
                        <div
                            key={item.title}
                            ref={(el) => ((itemRefs.current[item.title] = el) as any)}
                            className="relative z-10 cursor-pointer"
                        >
                            <Accordion
                                icon={item.icon}
                                onClick={() => setOpened(item.title)}
                                title={item.title}
                                open={item.title === opened}
                            >
                                {item.children}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
            <img src="/images/city.webp" className=' object-cover absolute top-1/2 -translate-y-1/2 right-[32px] w-[40%] rounded-lg'/>
        </div>
    );
};

export default SleekAccordion;
