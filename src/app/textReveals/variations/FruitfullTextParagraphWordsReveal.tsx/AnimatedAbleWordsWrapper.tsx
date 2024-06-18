'use client'
import { formatWordId } from "./utils";
import WordRevealAnimation from "./WordRevealAnimationComoponent";

type WordsRendererProps = {
    registerWordRef: (elem: any, id: string) => void, words: string[], isInitiallyVisible: boolean, paragraphIndex: number
}

const WordsRenderer = ({ paragraphIndex, words, isInitiallyVisible, registerWordRef }: WordsRendererProps) => {

    return (
        <span>
            {words.map((word, i) => (
                <>
                    <span>{" "} </span>
                    <WordRevealAnimation
                        key={formatWordId(word, paragraphIndex)}
                        id={formatWordId(word, paragraphIndex)}
                        index={i}
                        ref={el => registerWordRef(el, formatWordId(word, paragraphIndex))}
                        word={word}
                        isVisible={isInitiallyVisible}
                    />
                </>
            ))}


        </span>
    )
}

export default WordsRenderer;
