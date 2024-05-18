'use client'

import { clsx } from "../../../node_modules/clsx/clsx";

function NortonMenuButton({ opened, setOpened }: { opened: boolean; setOpened: any }) {


    return (
        <div className="menu_button_container" >
            <button
                onClick={() => {
                    setOpened((prev: boolean) => !prev)
                }}
                className={`menuButton ${opened && 'menuButtonOpened'}`}
            >
                <span />
                <span />
            </button>
        </div>
    );
}

export default NortonMenuButton;