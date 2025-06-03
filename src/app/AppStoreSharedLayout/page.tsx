"use client";

import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, AnimatePresence } from "framer-motion";
import './appstore-shared-layout.css'

function easeInOutExpo(x: number): number {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }
    function easeOutBack(x: number): number {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
        }
const duration = 0.3

export default function SharedLayout() {
    const [activeGame, setActiveGame] = useState<Game | null>(null);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setActiveGame(null));

    useEffect(() => {
        function onKeyDown(event: any) {
            if (event.key === "Escape") {
                setActiveGame(null);
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <div className=" w-screen h-screen flex justify-center items-center">
            <div>
                <h1 className=" font-bold">Top Free Games</h1>
                <AnimatePresence mode="wait">

                    {activeGame ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="overlay" />
                            <div className="active-game">
                                <motion.div
                                    layoutId={`${activeGame.title}-inner`}
                                    transition={{
                                        layout: { ease: easeOutBack, duration: duration }
                                    }}
                                    className="inner" ref={ref} style={{ borderRadius: 12 }}
                                >
                                    <div className="header">
                                        <motion.img
                                            layoutId={`${activeGame.title}-avatar`}
                                            transition={{
                                                layout: { ease: easeOutBack, duration: duration }
                                            }}
                                            height={56}
                                            width={56}
                                            alt=""
                                            src={activeGame.image}
                                            style={{ borderRadius: 12 }}
                                        />
                                        <div className="header-inner">
                                            <div
                                                className="content-wrapper"
                                            >
                                                <motion.h2
                                                    layoutId={`${activeGame.title}-title`}
                                                    transition={{
                                                        layout: { ease: easeOutBack, duration: duration }
                                                    }}
                                                    className="game-title"
                                                >
                                                    {activeGame.title} <span className="badge badge--product-title">{activeGame.appropriateAge}+</span>
                                                </motion.h2>
                                                <motion.p
                                                    layoutId={`${activeGame.title}-description`}
                                                    transition={{
                                                        layout: { ease: easeOutBack, duration: duration }
                                                    }}
                                                    className="game-description">
                                                    {activeGame.description}
                                                </motion.p>
                                            </div>
                                            <motion.button
                                                layoutId={`${activeGame.title}-get`}
                                                transition={{
                                                    layout: { ease: easeOutBack, duration: duration }
                                                }}
                                                className="button">
                                                Get
                                            </motion.button>
                                        </div>
                                    </div>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.2, delay: duration / 2 } }}
                                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                        className="long-description">{activeGame.longDescription}</motion.p>
                                </motion.div>
                            </div>
                        </>
                    ) : null}
                </AnimatePresence>
                <ul className="list">
                    {GAMES.map((game) => (
                        <motion.li
                            key={game.title}
                            onClick={() => setActiveGame(game)}
                            style={{ borderRadius: 8 }}
                            layoutId={`${game.title}-inner`}
                        transition={{
                            layout: { ease: easeOutBack, duration: duration }
                        }}

                        >
                            <motion.img
                                layoutId={`${game.title}-avatar`}
                                transition={{
                                    layout: { ease: easeOutBack, duration: duration }
                                }}
                                height={56}
                                width={56}
                                alt=""
                                src={game.image}
                                style={{ borderRadius: 12 }}
                            />
                            <div className="game-wrapper">
                                <div className="content-wrapper">
                                    <motion.h2
                                        layoutId={`${game.title}-title`}
                                        transition={{
                                            layout: { ease: easeOutBack, duration: duration }
                                        }}
                                        className="game-title"
                                    >
                                        {game.title}
                                    </motion.h2>
                                    <motion.p
                                        layoutId={`${game.title}-description`}
                                        transition={{
                                            layout: { ease: easeOutBack, duration: duration }
                                        }}
                                        className="game-description">
                                        {game.description}
                                    </motion.p>
                                </div>
                                <motion.button
                                    layoutId={`${game.title}-get`}
                                    transition={{
                                        layout: { ease: easeOutBack, duration: duration }
                                    }}
                                    className="button">
                                    Get
                                </motion.button>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

type Game = {
    title: string,
    description: string,
    longDescription: string,
    image: string
    appropriateAge: number
}

const GAMES: Game[] = [
    {
        title: "Super Mario Run",
        description: "Control Mario with just a tap!",
        longDescription:
            `A new kind of Mario game that you can play with one hand.


            You control Mario by tapping as he constantly runs forward. You time your taps to pull off stylish jumps, midair spins, and wall jumps to gather coins and reach the goal!
            
            
            Super Mario Run can be downloaded for free and after you purchase the game, you will be able to play all the modes with no additional payment required. You can try out all four modes before purchase: World Tour, Toad Rally, Remix 10, and Kingdom Builder.`,
        image:
            "/images/mario.webp",
        appropriateAge: 4
    },
    {
        title: "8 Ball Pool™",
        description: "Online Pool Multiplayer Games",
        longDescription:
            `Do you want to play in the world of pool games? 8 Ball Pool is an addictive challenging game based on real 3D pool games, where you will challenge your friends online. Become a master of the pool!


            The game 8 Ball Pool is easy to win. You just have to select the pool table and get ready. Join us and challenge your friends to this ball game in PvP mode. Use your pool strategy with the cue wisely in this online multiplayer ball game as every round will be more difficult after each level. You can play in multiplayer or PvP mode in different pool tables. Become the best pool player and challenge your friends in this pool game!`,
        image:
            "/images/8pool.webp",
        appropriateAge: 4
    },
    {
        title: "Snake VS Block",
        description: "A classic game, revisited",
        longDescription:
            `Swipe your finger to guide a snake of balls and break the bricks.

            Try to break as many bricks as possible.
            
            Get additional balls and make the biggest snake ever!
            
            
            Very easy to play but very hard to reach high scores!`,
        image:
            "/images/snake.webp",
        appropriateAge: 12
    },
    {
        title: "Ballz",
        description: "Bounce balls and break blocks",
        longDescription:
            `Relax your brain with the champion of time killer!


            Swipe your finger to throw the balls and break the bricks.
            
            Try to break as many bricks as possible before they move down to the bottom.
            
            Collect all the items to get additional balls and make an endless ball chain!`,
        image:
            "/images/ballz.webp",
        appropriateAge: 12
    },

    {
        title: "Word Cookies!®",
        description: "A tasty word puzzle game!",
        longDescription:
            `Here come some tasty Word Cookies hot out of the oven! Take a bite!

            Word Cookies is an addictive cross between all the word games you love! With so many exciting challenges, you'll soon be obsessed with testing your spelling and vocabulary limits to make as many words as you can!`,
        image:
            "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/boy.webp",
        appropriateAge: 4
    },
];
