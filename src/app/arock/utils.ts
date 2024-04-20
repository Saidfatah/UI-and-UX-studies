export const addClassPromise = (element: any, timeout: number, classToAdd: string, classToRemove?: string) => {
    return setTimeout(() => {
        element.classList.remove(classToRemove)
        element.classList.add(classToAdd)
    }, timeout)
}