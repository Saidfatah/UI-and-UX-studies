import { Point } from "./Point";

export class Persona {
    public relations: Persona[] = [];
    public nameElement: HTMLParagraphElement | null = null;

    constructor(
        public name: string,
        public point: Point
    ) { }

    addRelation(persona: Persona) {
        if (this.relations.includes(persona)) {
            return;
        }

        this.relations.push(persona);
    }

    showPersonaName() {
        if (!this.nameElement) return Promise.resolve();

        this.nameElement.style.opacity = "0";
        return this.nameElement.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            {
                duration: 300,
                easing: "ease-in-out",
                fill: "forwards"
            }
        ).finished;
    }

    hidePersonaName() {
        if (!this.nameElement) return Promise.resolve();

        this.nameElement.style.opacity = "0";
        return this.nameElement.animate(
            [{ opacity: 1 }, { opacity: 0 }],
            {
                duration: 300,
                easing: "ease-in-out",
                fill: "forwards"
            }
        ).finished;
    }
}