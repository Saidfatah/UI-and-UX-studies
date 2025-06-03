import { useCallback, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion } from 'framer-motion';

const users = [
    {
        name: "Paula laka",
        image:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "HARRY laka",
        image:
            "https://images.pexels.com/photos/27603433/pexels-photo-27603433/free-photo-of-blonde-beauty-s-eye-catching-glasses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        name: "Modii laka",
        image:
            "https://images.pexels.com/photos/8430225/pexels-photo-8430225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        name: "Modii laka2",
        image:
            "https://images.pexels.com/photos/7652302/pexels-photo-7652302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        name: "Modii lakaae",
        image:
            "https://images.pexels.com/photos/5453933/pexels-photo-5453933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        name: "Modiiaza lakaae",
        image:
            "https://images.pexels.com/photos/12899089/pexels-photo-12899089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        name: "Modiiazaaza lakaae",
        image:
            "https://images.pexels.com/photos/8101726/pexels-photo-8101726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        name: "azeae lakaae",
        image:
            "https://images.pexels.com/photos/1528170/pexels-photo-1528170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
];


const getAngle = (index: number) => (index === 0 ? 90 : 90 + index * 45);

function UsersAvatarsInCircle() {
    const containerRefs = useRef<HTMLDivElement[]>([]);
    const contaienrRef = useRef<HTMLDivElement>(null);


    const initialAvatarsInCircle = useCallback(() => {
        containerRefs.current.forEach((el, index) => {
            if (!el) return;

            // Define the final rotation for each avatar
            const finalRotation = getAngle(index)

            // Parent Animation: Move from center (0,0) to its final position
            el.animate(
                [
                    {
                        transform: `rotate(90deg) translateX(170px)`,
                    },
                    {
                        transform: `rotate(${finalRotation}deg) translateX(170px)`,
                    },
                ],
                {
                    duration: 2000,
                    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    fill: "forwards",
                    delay: index * 100, // Stagger effect
                }
            );

        });
    }, [containerRefs]);

    const correctInnerImg = useCallback(() => {
        containerRefs.current.forEach((el, index) => {
            if (!el) return;
            // Define the final rotation for each avatar
            const finalRotation = getAngle(index)

            // Child Image Animation: Rotate from 0 to cancel parent's rotation
            const img = el.querySelector("img") as HTMLImageElement;

            img.style.transform = `rotate(${-finalRotation}deg)`
        });
    }, [containerRefs]);



    useEffect(() => {
        if (!contaienrRef.current) return

        correctInnerImg()

        contaienrRef.current.animate(
            [
                {
                    transform: `scale(1.5)`,

                },
                {
                    transform: `scale(1)`,
                },
            ],
            {
                duration: 4000,
                easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                fill: "forwards",
            }
        )

        initialAvatarsInCircle()

    }, [contaienrRef]);


    useEffect(() => {
        const onScroll = () => {
            containerRefs.current.forEach((el, index) => {
                if (!el) return;

                // Define the final rotation for each avatar
                const finalRotation = getAngle(index)

                // Parent Animation: Move from center (0,0) to its final position
                el.style.transform = `rotate(${finalRotation+window.scrollY}deg) translateX(${170+(window.scrollY /100)}px)`

            });

        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [containerRefs]);


    return (
        <div
            ref={contaienrRef}
            style={{
                transform: `scale(1.5)`,
            }}
            className="avatarsContainer">
            {users.map((user, index) => (

                <div
                    key={index}
                    ref={(el) => (containerRefs.current[index] = (el as any))}
                    className="avatarContainer"
                    style={{
                        transform: `rotate(90deg) translateX(170px)`, // Start at center
                        zIndex: 9 - index
                    }}

                >
                    <motion.div
                        initial={{
                            transform: "scale(1)"
                        }}
                        animate={{
                            transform: "scale(1)"
                        }}
                        whileHover={{
                            transform: "scale(1.5)"
                        }}
                    >
                        <img
                            src={user.image}
                            style={{
                                transform: `rotate(${-getAngle(index)}deg)`
                            }}
                        />
                    </motion.div>

                </div>


            ))}
        </div>
    );
}

export default UsersAvatarsInCircle;
