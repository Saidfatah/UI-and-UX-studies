
"use client";
import React from "react";
import "./style.css";

const Card = ({ onDelete, id }: { onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; id: number }) => {
    const randomizedBackgroundColor = `linear-gradient(${Math.floor(Math.random() * 360)}deg, #667eea 0%, #764ba2 100%)`;
    return (
        <div
            style={{
                // viewTransitionName: "match-element",
                background: randomizedBackgroundColor,
            }}
            className="card w-64 min-w-64 h-64 rounded-lg">
            {id}
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

function ViewTransitions() {
    const [cards, setcards] = React.useState<Array<Record<string, any>>>([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ]);

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        // delete the element from dom 
        // remove elemnt from array
        const target = event.currentTarget.parentElement;
        if (!document.startViewTransition) {
            setcards(cards.filter((card) => card.id !== id));
        } else {
            const transition = document.startViewTransition(() => {
                if (target) {
                    target.style.viewTransitionName = 'targeted-card';
                    target.remove();
                    // setTimeout(() => {
                    //     setcards((prev) => prev.filter((card) => card.id !== id));
                    // }, 400);
                }
            });
            transition.ready.then(() => {
                 setcards((prev) => prev.filter((card) => card.id !== id));
            });
        }
    };

    const handleAdd = () => {
        if (!document.startViewTransition) {
            setcards([...cards, { id: cards.length + 1 }]);
        } else {
            document.startViewTransition(() => {
                setcards([...cards, { id: cards.length + 1 }]);
            });
        }
    };

    return (
        <div className="h-screen w-screen px-[120px] flex flex-col gap-[120px] justify-center items-center ">
            <div className="w-full  flex justify-center items-center">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleAdd}
                >Add Card</button>
            </div>

            <div className="flex gap-4 w-full  overflow-auto">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        onDelete={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDelete(event, card.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ViewTransitions;