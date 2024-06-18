'use client'
import { useRef, useState } from "react";

function ButtonWithScaledFillAnimationBg({ text, onMouseEnter, onMouseLeave }: { text: string, onMouseEnter?: (x: number, y: number, width: number) => void, onMouseLeave?: () => void, onParticlesCreate?: (x: number, y: number) => void }) {
    const ref = useRef<HTMLDivElement | undefined>()
    const labelRef = useRef<HTMLSpanElement | undefined>()
    const [isCooldown, setIsCooldown] = useState(false);

    const handleMouseEnter = (event: any) => {
        if (isCooldown) return;



        ref.current?.classList.add('button_wrapper_Scale_animation')
        labelRef.current?.classList.add('letter_spacing_animation_class')

        const buttonRect = ref.current?.getBoundingClientRect();
        onMouseEnter && onMouseEnter(buttonRect?.x as number, buttonRect?.y as number, buttonRect?.width as number)

        setIsCooldown(true);
        setTimeout(() => {
            ref.current?.classList.remove('button_wrapper_Scale_animation')
            labelRef.current?.classList.remove('letter_spacing_animation_class')
            onMouseLeave && onMouseLeave()
            setIsCooldown(false);
        }, 1000);
    };

    return (
        <button
            ref={ref as any}
            onMouseEnter={handleMouseEnter}
            className='button_with_fill button_with_fill_green is_green'
        >
            <span ref={labelRef as any} className="button_text" >{text}</span>
            <div className="button_bg_fill" ></div>
        </button>
    );
}

export default ButtonWithScaledFillAnimationBg;
