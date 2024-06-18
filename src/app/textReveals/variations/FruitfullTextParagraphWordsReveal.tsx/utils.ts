

export const formatWordId = (word: string, paragraphIndex: number) => `_p_${paragraphIndex}_${word}`
export const formatParagraphId = (paragraphIndex: number) => `_p_${paragraphIndex}`

export const  sleep=(ms: number) =>{
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const formatTransformTranslate = (translateX: string, translateY: string, rotation: number) => `translate(${translateX ?? 0}, ${translateY}) rotate(${rotation}deg)`

export const applyTransformTransitionToElement = (elem: HTMLDivElement, direction: 'down' | 'middle' | 'top') => {
    let translateY = '0%'
    let rotation = 0

    if (direction === 'top') {
        translateY = '-100%'
        rotation = -15
    }

    if (direction === 'middle') {
        translateY = '0%'
        rotation = 0
    }

    if (direction === 'down') {
        translateY = '100%'
        rotation = 15
    }

    console.log(formatTransformTranslate(
        '0',
        translateY,
        rotation
    ))
    elem.style.transform = formatTransformTranslate(
        '0',
        translateY,
        rotation
    )
}



export const toggleElementOpacity = (elem: HTMLDivElement, state: 'show' | 'hide') => {
    elem.style.opacity = state === 'show' ? '1' : '0'
}
export const toggleBlur = (elem: HTMLDivElement, state: 'show' | 'hide') => {
    elem.style.filter = state === 'show' ? 'blur(0px)' : 'blur(5px)'
}