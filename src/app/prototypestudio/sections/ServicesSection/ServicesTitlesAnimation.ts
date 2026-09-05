import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

interface WorksTitlesAnimationOptions { 
    chars: HTMLElement[];
    scroller: HTMLElement;
    scrollTriggerElement: HTMLElement;
    direction: 1 | -1;
}

class ServicesTitlesAnimation {
    private chars:HTMLElement[];
    private scroller:HTMLElement;
    private scrollTriggerElement:HTMLElement;
    private direction:1|-1;


    private animationTimeline:gsap.core.Timeline|null= null;

    constructor({ 
        chars,
        scroller,
        direction,
        scrollTriggerElement
    }:WorksTitlesAnimationOptions){
        this.chars= chars;
        this.scroller=scroller;
        this.direction=direction;
        this.scrollTriggerElement=scrollTriggerElement;

        this.setup();
    }

    private setup() { 
        this.setInitialState(); 
        this.createAnimation(); 
    }

    private setInitialState() { 
        gsap.set(this.chars, {
             opacity: 0, 
             rotateY: 70 * this.direction, 
             x: `${8 * this.direction}rem`
        });


        this.chars.forEach((char, index) => {
        const styles = getComputedStyle(char);

        console.log(index, {
            text: char.textContent,
            opacity: styles.opacity,
            transform: styles.transform,
            x: gsap.getProperty(char, "x"),
            y: gsap.getProperty(char, "y"),
            rotateY: gsap.getProperty(char, "rotateY"),
        });
    });
    }

    private createAnimation() { 
        const timeline = gsap.timeline({ paused: true, });

        timeline .fromTo( 
            this.chars,
             { opacity: 0, }, 
             { 
                opacity: 1, 
                ease: "beaucoup.alpha", 
                duration: 0.4, 
                stagger: 0.03 * this.direction 
            }
        ,0) 
        .fromTo( this.chars, 
            {
                x: `${8 * this.direction}rem`, 
                rotateY: 70 * this.direction, }, 
            { 
                x: 0, 
                rotateY: 0, 
                ease: "expo.out", 
                duration: 1.25, 
                stagger: 0.03 * this.direction
            }, "<"
        ); 

        this.animationTimeline = timeline; 

        ScrollTrigger.create({ 
            trigger: this.scrollTriggerElement, 
            scroller: this.scroller, 
            start: "top 75%", 
            once: true, 
            animation: timeline
        }); 
    }

    public destroy() { 
        this.animationTimeline?.kill(); 
        this.animationTimeline = null;
     }
}

export default ServicesTitlesAnimation;