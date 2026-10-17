import { Fragment } from "react";

type Props = {
    words: string[]
}

const InkingTheLetters = ({ words }: Props) => {
    let letterOffset = 0;

    return (
        <span aria-hidden="true">
            {words.map((word, wordIndex) => {
                const currentOffset = letterOffset;

                // (+ 1 to count for the white space between the words
                // the make to letters reveal look right
                letterOffset += word.length + 1;

                return (
                    <Fragment key={wordIndex}>
                        {wordIndex > 0 && ' '}
                        <span className="word">
                            {word.split('').map((letter, letterIndex) => (
                                <span
                                    className="letter"
                                    key={letterIndex}

                                    style={{ ["--letter" as any]: `${currentOffset + letterIndex}` }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </span>
                    </Fragment>
                )
            })}
        </span>
    )
}


export default InkingTheLetters;