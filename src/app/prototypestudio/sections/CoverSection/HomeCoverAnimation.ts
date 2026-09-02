import gsap from "gsap";
import { remToPixel } from "../../util";

class HomeCoverAnimation {
    private section: HTMLElement;

    private title!: HTMLElement;
    private lines!: HTMLElement[];
    private firstLineChars!: HTMLElement[];
    private remainingChars!: HTMLElement[];
    private divider!: HTMLElement;
    private scrollChars!: HTMLElement[];

    private timeline?: gsap.core.Timeline;

    constructor(section: HTMLElement) {
        this.section = section;
    }

    init() {
        this.title = this.section.querySelector(
            ".home-cover-title"
        ) as HTMLElement;

        this.lines = gsap.utils.toArray<HTMLElement>(
            ".home-cover-title .line",
            this.section
        );

        console.log(this.lines )
        this.firstLineChars = gsap.utils.toArray<HTMLElement>(
            ".home-cover-title p:first-child .char",
            this.section
        );

        this.remainingChars = gsap.utils.toArray<HTMLElement>(
            ".home-cover-title p:nth-child(2) .char",
            this.section
        );

        this.divider = this.section.querySelector(
            ".home-cover-line"
        ) as HTMLElement;

        this.scrollChars = gsap.utils.toArray<HTMLElement>(
            ".home-cover-scroll .char",
            this.section
        );
    }

    appear() {
        this.setInitialState();

        this.timeline = this.createAnimation();

        return this.timeline;
    }

    private setInitialState() {
        const [ line1,line2, line3,line4] = this.lines;

        

        const referenceLine = line4 || line3 || line2 ;

        if (!referenceLine) return;

        const lineOffset = referenceLine.offsetHeight - remToPixel(2);

        gsap.set(this.lines, {
            y: lineOffset,
        });

        gsap.set(
            [...this.firstLineChars, ...this.remainingChars],
            {
                x: "5rem",
                rotateY: 70,
                opacity: 0,
            }
        );

        gsap.set(this.divider, {
            scaleX: 0,
        });

        gsap.set(this.scrollChars, {
            x: "5rem",
            opacity: 0,
        });


    console.log(
    getComputedStyle(this.scrollChars[0]).transform
);

console.log(
    gsap.getProperty(this.scrollChars[0], "x", "px")
);
    }

    private createAnimation() {
        const [firstLine] = this.lines;

        const tl = gsap.timeline();

        tl.to(this.firstLineChars, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: "beaucoup.alpha",
        })

        .to(this.firstLineChars, {
            x: 0,
            rotateY: 0,
            duration: 1.25,
            stagger: 0.03,
            ease: "expo.out",
        }, "<")

        .to(firstLine, {
            y: 0,
            duration: 1.2,
            ease: "beaucoup.inOut",
        }, "<40%")

        .to(this.remainingChars, {
            opacity: 1,
            duration: 0.4,
            stagger: 0.03,
            ease: "beaucoup.alpha",
        }, "<")

        .to(this.remainingChars, {
            x: 0,
            rotateY: 0,
            duration: 1.25,
            stagger: 0.03,
            ease: "expo.out",
        }, "<")

        .to(this.lines, {
            y: 0,
            duration: 1.2,
            ease: "beaucoup.inOut",
        }, "<")

        .to(this.divider, {
            scaleX: 1,
            duration: 0.5,
            ease: "beaucoup.slowInOut",
        }, "<20%")
        .to(this.scrollChars, {
                x: 0,
                opacity: 1,
                duration: 1.25,
                stagger: 0.06,
                ease: "expo.out",
        }, "<40%");
        
        return tl;
    }

    destroy() {
        this.timeline?.kill();
    }
}

export default HomeCoverAnimation;