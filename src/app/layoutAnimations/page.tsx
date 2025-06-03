'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './layout.css';

const spring = {
    type: "spring",
    damping: 10,
    stiffness: 300,
};

function LayoutAnimation() {
    const [items, setItems] = useState([
        { id: 1, color: "bg-blue-500", emoji: <>😀</> },
        { id: 2, color: "bg-red-500", emoji: <>😅</> },
        { id: 3, color: "bg-pink-500", emoji: <>🤪</> },
        { id: 4, color: "bg-yellow-500", emoji: <>😝</> },
        { id: 5, color: "bg-purple-500", emoji: <>😒</> },
    ]);

    const moveToTop = (id: number) => {
        setItems((prev) => {
            const index = prev.findIndex((item) => item.id === id);
            if (index !== -1) {
                const newItems = [...prev];
                const [selectedItem] = newItems.splice(index, 1);
                newItems.unshift(selectedItem);
                return newItems;
            }
            return prev;
        });
    };

    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center">
            <div className="bgDotted w-[400px] h-[100px] " />
            {/* <motion.div
                className=" origin-right flex gap-2">
                {items.map((item) => (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={item.id}
                            onClick={() => removeItem(item.id)}
                            layout
                            whileHover={{
                                transform: 'scale(1.1) translateY(-10%) rotate(-30deg)'
                            }}
                            whileTap={{
                                transform: 'scale(0.9) translateY(10%) rotate(30deg)'
                            }}
                            animate={{
                                transform: 'scale(1) translateY(0%) rotate(0deg)'
                            }}
                            transition={{ ...spring }}
                            className={`w-24 h-24 max-h-24 max-w-24 flex items-center justify-center shrink-0 !grow-0  rounded-lg cursor-pointer`}
                        >
                            <span className=" text-[32px]">{item.emoji}</span>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </motion.div> */}
        </div>
    );
}

export default LayoutAnimation;
