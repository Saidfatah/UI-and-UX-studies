import { useEffect, useRef } from "react";

const images = ["/images/glareCards/git-coauthors.png"]

function TrailingEffect() {
    const currentPoolIndex = useRef(0)
    const prevMousePosition = useRef<{ x: number, y: number }>({ x: -1, y: -1 })
    const imagesRefs = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        function handleMouseMove(event: MouseEvent) {
            const mouseX = event.clientX
            const mouseY = event.clientY

            const isFirstDraw = prevMousePosition.current.x === -1


            if (isFirstDraw) {

            }

            prevMousePosition.current = {
                x: mouseX,
                y: mouseY
            }
        }

        document.body.addEventListener("mousemove", handleMouseMove)

        return () => {
            document.body.removeEventListener("mousemove", handleMouseMove)
        }
    }, []);

    return (<div className="w-screen h-screen ">
        <div
            className="container absolute size-[200px]"
        >
            <img ref={(elm) => imagesRefs.current.push(elm)} src={images[0]} className="size-full object-cover opacity-0" />
            <img src={images[0]} className="size-full object-cover opacity-0" />
            <img src={images[0]} className="size-full object-cover opacity-0" />
            <img src={images[0]} className="size-full object-cover opacity-0" />
        </div>
    </div>);
}

export default TrailingEffect;