import { Persona } from "./Persona";
import { POINT_NAME_GAP, POINT_SIZE } from "./Point";
import { easeInOutCubic } from "./utils";

interface ClipInsets {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

interface CardAnimation {
    startTime: number;
    duration: number;
    startInsets: ClipInsets;
    targetInsets: ClipInsets;
    resolve: () => void;
}

interface NameSyncAnimation {
    startTime: number;
    duration: number;

    paragraphNameStartX: number;
    paragraphNameTargetX: number;

    pointNameStartX: number;
    pointNameTargetX: number;

    pointNameElementInnerSpan:HTMLSpanElement;

    resolve: () => void;
}
 
const collapseDuration=500;
export class PersonaInfoCard {
    private readonly element: HTMLDivElement;
    private readonly nameElement: HTMLSpanElement;
    private readonly width: number;
    private readonly height: number;

    private readonly padding = 20;

    private selectedPersona: Persona | null = null;

    private animation: CardAnimation | null = null;
    private nameSyncAnimation: NameSyncAnimation | null = null;

    private currentInsets: ClipInsets;

    constructor(
        element: HTMLDivElement,
        nameElement: HTMLSpanElement,
        width: number,
        height: number
    ) {
        this.element = element;
        this.nameElement = nameElement;

        this.width = width;
        this.height = height;

        this.currentInsets = this.getCollapsedInsets();

        this.applyClipPath(this.currentInsets);
    }

    setPersona(persona: Persona) {
        this.selectedPersona = persona;
        this.expand();
    }

    removeSelectedPersona() {
        this.collapse();
        setTimeout(() => {
            this.selectedPersona = null;
        }, collapseDuration);
    }

    private getCollapsedInsets(): ClipInsets {
        return {
            top: this.padding,
            right: this.padding,
            bottom: this.height - this.padding - POINT_SIZE,
            left: this.width - this.padding - POINT_SIZE,
        };
    }

    private getExpandedInsets(): ClipInsets {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        };
    }

    private expand() {
            // right: this.padding,
            // bottom: this.height - this.padding - POINT_SIZE,
            // left: this.width - this.padding - POINT_SIZE,
        this.animateCardInfoAndSelectedPersonaNameSync("expanding-card")
        this.animateClipPath(
            this.getExpandedInsets()
        );
    }

    private collapse() {
        this.animateCardInfoAndSelectedPersonaNameSync("collapsing-card")
        this.animateClipPath(
            this.getCollapsedInsets()
        );
    }

    
    private animateClipPath(targetInsets: ClipInsets): Promise<void> {
        const startInsets = { ...this.currentInsets };

        return new Promise(resolve => {
            this.animation = {
                startTime: performance.now(),
                duration: collapseDuration,
                startInsets,
                targetInsets,
                resolve,
            };
        });
    }

    // this function achieves the effect of making the two text elements seem to be one 
    private animateCardInfoAndSelectedPersonaNameSync(animateFor:"expanding-card"|"collapsing-card") {
        if(!this.selectedPersona || !this.selectedPersona.nameElement) return;

        const nameWidth = this.selectedPersona.nameElement.offsetWidth;

        let paragraphNameStartX=0
        let paragraphNameTargetX= 0
        let pointNameTargetX =0
        let pointNameStartX=0

        if(animateFor === "expanding-card"){
            paragraphNameStartX = this.width - this.padding * 2 - nameWidth - POINT_NAME_GAP - POINT_SIZE;
            paragraphNameTargetX = 0;

            pointNameStartX = 0;
            pointNameTargetX = -this.width +(nameWidth + POINT_NAME_GAP + POINT_SIZE + this.padding*2 )
        }

        if(animateFor === "collapsing-card"){
            paragraphNameStartX = 0;
            paragraphNameTargetX =this.width - this.padding * 2 - nameWidth - POINT_NAME_GAP - POINT_SIZE ;

            pointNameStartX = -this.width +(nameWidth + POINT_NAME_GAP + POINT_SIZE + this.padding*2 );
            pointNameTargetX = 0
        }


        const pointNameElementInnerSpan=(this.selectedPersona.nameElement as HTMLParagraphElement).querySelector('.name-inner-span') as HTMLSpanElement
        
        if(!pointNameElementInnerSpan) return;

        return new Promise<void>(resolve => {
            this.nameSyncAnimation = {
                startTime: performance.now(),
                duration: collapseDuration,

                paragraphNameStartX,
                paragraphNameTargetX,

                pointNameStartX,
                pointNameTargetX,

                pointNameElementInnerSpan,

                resolve
            };
        });
    }
    
    private updateNameSyncAnimation(time: number) {
        const animation = this.nameSyncAnimation;

        if (!animation) return;

        const elapsed = Math.min(
            (time - animation.startTime) / animation.duration,
            1
        );

        const progress = easeInOutCubic(elapsed);

        const interpolate = (start: number, target: number) =>
            start + (target - start) * progress;

        const paragraphNameX = interpolate(
            animation.paragraphNameStartX,
            animation.paragraphNameTargetX
        );

        const pointNameX = interpolate(
            animation.pointNameStartX,
            animation.pointNameTargetX
        );


        this.nameElement.style.transform = `translateX(${paragraphNameX}px)`;
         
        animation.pointNameElementInnerSpan.style.transform =`translate3d(${pointNameX}px, 0, 0)`;
 
        if (elapsed >= 1) {
            this.nameSyncAnimation = null;
            animation.resolve();
        }
    }

    private updateClipPath(time: number) {
        const animation = this.animation;

        if (!animation) return;

        const elapsed = Math.min(
            (time - animation.startTime) / animation.duration,
            1
        );

        const progress = easeInOutCubic(elapsed);

        const interpolate = (start: number, target: number) =>
            start + (target - start) * progress;

        const { startInsets, targetInsets } = animation;

        this.currentInsets = {
            top: interpolate(startInsets.top, targetInsets.top),
            right: interpolate(startInsets.right, targetInsets.right),
            bottom: interpolate(startInsets.bottom, targetInsets.bottom),
            left: interpolate(startInsets.left, targetInsets.left),
        };

        

        this.applyClipPath(this.currentInsets);

        if (elapsed >= 1) {
            this.currentInsets = targetInsets;
            this.animation = null;

            animation.resolve();
        }
    }

    private applyClipPath(insets: ClipInsets) {
        const { top, right, bottom, left } = insets;

        this.element.style.clipPath =
            `inset(${top}px ${right}px ${bottom}px ${left}px)`;
    }

    private updatePosition() {
        const persona = this.selectedPersona;

        if (!persona) return;

        const point = persona.point;

        // point.x / 2 is because in Point we are offset teh rect so that point is in its center
        const x = point.x - this.width +  (POINT_SIZE/2) + this.padding;
        const y = point.y - (POINT_SIZE/2) - this.padding ;


        this.element.style.transform =
            `translate3d(${x}px, ${y}px, 0)`;
    }

    update(time: number) {
        this.updatePosition();
        this.updateClipPath(time);
         this.updateNameSyncAnimation(time);
    }
}