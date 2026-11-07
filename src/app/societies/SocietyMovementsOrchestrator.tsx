import { PersonaInfoCard } from "./PersonaInfoCard";
import { Line } from "./Line";
import { Persona } from "./Persona";
import { Point, POINT_NAME_GAP, POINT_SIZE, PointStagger } from "./Point";
import { pickRandom, wait } from "./utils";


const COLOR = "#fff"

const timeline = {
    relationsStartDelay: 1000,
    nameRevealDuration: 300,
    nameHideDuration: 300,
    lineDrawDuration: 1000,
    lineUndrawDuration: 1000,
    groupLifeTime: 2000,

    infoCardCollapseDuration: 500,

    cardExpansionDuration: 500,

    // on each iteration we remove person and introduce a new comer to the group
    // currently we first remove the line wait then hide the name of he persona
    // then draw line towards the new connection
    // transitionGap is how much we wait 
    transitionGap: 1000,
};

interface InitialGroup {
    personas: Persona[];
    mutualPersona: Persona;
    leftSidePersona: Persona;
    rightSidePersona: Persona;
    firstLine: Line[];
    secondLine: Line[];
}


export class SocietyMovementsOrchestrator {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;



    private totalPointsVisibilityDelay: number = 0;
    // to further control how long it takes before we introduce the relations


    private readonly transitionGap = 1000;


    private abortController = new AbortController();

    // each point has a delay before its rendered


    private personas: Persona[] = [];
    private lines: Line[] = [];
    private activeLines: Line[] = [];

    private animationFrameId = 0;

    // persona info card
    private infoCard: PersonaInfoCard;

    // relations handling
    private activeGroup: Persona[] = [];
    private isRelationsAnimating = false;


    private readonly minVelocity = 0.025;
    private readonly maxVelocity = 1.4;
    private readonly edgeThreshold = 25;


    onPersonaSelected?: (persona: Persona) => void;


    private get width() {
        return 500;
    }

    private get height() {
        return 500;
    }

    constructor(canvas: HTMLCanvasElement, infoCard: PersonaInfoCard) {
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Could not initialize canvas context");
        }

        this.canvas = canvas;
        this.ctx = ctx;

        this.infoCard = infoCard;

        this.resize();
    }



    private startTime = 0;
    private hasStarted = false;
    private isStopped = false;

    start() {
        if (this.hasStarted) return;

        this.hasStarted = true;
        this.isStopped = false;

        this.startTime = performance.now();

        this.animate(this.startTime);


        setTimeout(() => {
            this.animateRelations();
        }, this.totalPointsVisibilityDelay + timeline.relationsStartDelay);
    }

    // mean loop, move the points positions
    private animate = (time: number) => {
        const elapsed = time - this.startTime;


        for (const persona of this.personas) {
            persona.point.updateVisibilityBasedOnTime(elapsed);
            persona.point.move();

            this.keepInsideCanvas(persona.point);

            if (persona.point.speed < this.minVelocity) {
                this.setRandomVelocity(persona.point);
            }

        }



        for (const line of this.lines) {
            line.update(time);
        }

        this.infoCard.update(time)

        this.render();

        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    // relationships rotation
    private async animateRelations() {
        this.isRelationsAnimating = true;

        const initialGroup = this.selectInitialGroup();

        if (!initialGroup || this.isStopped) {
            this.isRelationsAnimating = false;
            return;
        }

        const {
            personas,
            mutualPersona,
            leftSidePersona,
            rightSidePersona,
            firstLine,
            secondLine
        } = initialGroup;

        this.activeGroup = personas;


        await wait(timeline.relationsStartDelay);

        // 1. Reveal left persona
        leftSidePersona.showPersonaName();
        await wait(timeline.nameRevealDuration);

        // 2. Draw first line
        this.activeLines.push(...firstLine);
        await this.drawLines(
            firstLine,
            leftSidePersona.point,
            timeline.lineDrawDuration
        );

        // 3. Reveal mutual persona
        mutualPersona.showPersonaName();
        await wait(timeline.nameRevealDuration);

        // 4. Draw second line
        this.activeLines.push(...secondLine);
        await this.drawLines(
            secondLine,
            mutualPersona.point,
            timeline.lineDrawDuration
        );

        // 5. Reveal right persona
        rightSidePersona.showPersonaName();
        await wait(timeline.nameRevealDuration);

        secondLine[0].dashFromStart(1000);
        await firstLine[0].dashFromEnd(1000);


        // display the info card
        this.infoCard.setPersona(rightSidePersona)
        this.onPersonaSelected?.(rightSidePersona);

        await wait(timeline.groupLifeTime);
        this.infoCard.removeSelectedPersona()
        await wait(timeline.infoCardCollapseDuration);


        // Start rotating through the relations graph.
        while (this.isRelationsAnimating) {
            const rotation = this.rotateGroup();

            if (!rotation) { break; }


            const { removedPersona, newcomer, linkPersona } = rotation;

            const linesToUndraw = this.activeLines.filter(
                line =>
                    line.start === removedPersona.point ||
                    line.end === removedPersona.point
            );

            const lineToDraw = this.getPersonaLines(
                newcomer,
                [linkPersona]
            );



            // Undraw removed persona's relation line and hide its name
            await this.undrawLines(linesToUndraw, timeline.lineUndrawDuration);

            this.activeLines = this.activeLines.filter(
                line => !linesToUndraw.includes(line)
            );

            await wait(timeline.transitionGap);

            await removedPersona.hidePersonaName();

            // Draw new comer relation line and reveal its name
            this.activeLines.push(...lineToDraw);

            await this.drawLines(lineToDraw, undefined, timeline.lineDrawDuration);


            newcomer.showPersonaName();
            await wait(timeline.nameRevealDuration);

            this.activeLines[0].dashFromStart(1000);
            await this.activeLines[1].dashFromEnd(1000);

            // display the info card
            this.infoCard.setPersona(newcomer)
            this.onPersonaSelected?.(newcomer);


            await wait(timeline.groupLifeTime);

            this.infoCard.removeSelectedPersona()
            await wait(timeline.infoCardCollapseDuration);
        }

        // this.isRelationsAnimating = false;
    }


    stop() {
        this.abortController.abort();
        this.isRelationsAnimating = false;

        cancelAnimationFrame(this.animationFrameId);
    }




    addPersona(persona: Persona) {
        this.setRandomVelocity(persona.point);
        this.personas.push(persona);

        this.createLines();

        this.totalPointsVisibilityDelay += PointStagger * 1000
    }


    // points movement
    private setRandomVelocity(point: Point) {
        const angle = Math.random() * Math.PI * 2;

        const speed =
            this.minVelocity +
            Math.random() * (this.maxVelocity - this.minVelocity);

        let velocityX = Math.cos(angle) * speed;
        let velocityY = Math.sin(angle) * speed;

        const nearLeft = point.x < this.edgeThreshold;
        const nearRight = point.x > this.width - this.edgeThreshold;

        const nearTop = point.y < this.edgeThreshold;
        const nearBottom = point.y > this.height - this.edgeThreshold;

        if (nearLeft) {
            velocityX = Math.abs(velocityX);
        }

        if (nearRight) {
            velocityX = -Math.abs(velocityX);
        }

        if (nearTop) {
            velocityY = Math.abs(velocityY);
        }

        if (nearBottom) {
            velocityY = -Math.abs(velocityY);
        }

        point.targetVelocityX = velocityX;
        point.targetVelocityY = velocityY;
    }

    private keepInsideCanvas(point: Point) {
        const halfSize = POINT_SIZE / 2;

        if (point.x < halfSize) {
            point.x = halfSize;
            point.velocityX = Math.abs(point.velocityX);
            point.targetVelocityX = Math.abs(point.targetVelocityX);
        }

        if (point.x > this.width - halfSize) {
            point.x = this.width - halfSize;
            point.velocityX = -Math.abs(point.velocityX);
            point.targetVelocityX = -Math.abs(point.targetVelocityX);
        }

        if (point.y < halfSize) {
            point.y = halfSize;
            point.velocityY = Math.abs(point.velocityY);
            point.targetVelocityY = Math.abs(point.targetVelocityY);
        }

        if (point.y > this.height - halfSize) {
            point.y = this.height - halfSize;
            point.velocityY = -Math.abs(point.velocityY);
            point.targetVelocityY = -Math.abs(point.targetVelocityY);
        }
    }

    private syncNameToPersonaPoint(persona: Persona) {
        const element = persona.nameElement;
        if (!element) return;

        const point = persona.point;
        const offset = POINT_SIZE / 2 + POINT_NAME_GAP;

        element.style.top = "0";
        element.style.left = "0";

        element.style.textAlign = "right";
        element.style.transform = `translate3d(${point.x - offset}px, ${point.y}px, 0) translate(-100%, -50%)`;
    }



    private selectInitialGroup(): InitialGroup | null {
        const mutualPersona = this.choosePersona();

        if (!mutualPersona) return null;

        const candidates = mutualPersona.relations.filter(
            persona => persona !== mutualPersona
        );

        if (candidates.length < 2) return null;

        const leftSidePersona = pickRandom(candidates);

        const remainingCandidates = candidates.filter(
            persona => persona !== leftSidePersona
        );

        const rightSidePersona = pickRandom(remainingCandidates);

        const firstLine = this.getPersonaLines(
            mutualPersona,
            [leftSidePersona]
        );

        const secondLine = this.getPersonaLines(
            mutualPersona,
            [rightSidePersona]
        );

        return {
            personas: [mutualPersona, leftSidePersona, rightSidePersona],
            mutualPersona,
            leftSidePersona,
            rightSidePersona,
            firstLine,
            secondLine
        };
    }

    private rotateGroup(): {
        removedPersona: Persona;
        newcomer: Persona;
        linkPersona: Persona;
        remainingGroup: Persona[];
    } | null {
        const removedPersona = this.selectPersonaToRemove(
            this.activeGroup
        );

        if (!removedPersona) return null;

        const remainingGroup = this.activeGroup.filter(
            persona => persona !== removedPersona
        );

        const newcomer = this.selectNewcomer(
            remainingGroup,
            removedPersona
        );

        if (!newcomer) return null;

        const linkPersona = this.selectLinkPersona(
            newcomer,
            remainingGroup
        );

        if (!linkPersona) return null;

        this.activeGroup = [...remainingGroup, newcomer];

        return {
            removedPersona,
            newcomer,
            linkPersona,
            remainingGroup
        };
    }

    private selectPersonaToRemove(
        activeGroup: Persona[]
    ): Persona | null {
        const candidates = activeGroup.filter(persona => {
            const activeConnections = this.activeLines.filter(line =>
                line.start === persona.point || line.end === persona.point
            ).length;

            return activeConnections === 1;
        });

        if (candidates.length === 0) {
            return null;
        }

        return pickRandom(candidates);
    }

    private selectNewcomer(
        remainingGroup: Persona[],
        removedPersona: Persona
    ): Persona | null {

        const candidates = remainingGroup.flatMap(
            persona => persona.relations
        );

        const uniqueCandidates = [...new Set(candidates)];

        const availableCandidates = uniqueCandidates.filter(
            persona =>
                !remainingGroup.includes(persona) &&
                persona !== removedPersona
        );

        console.log("[Newcomer] Available:",
            availableCandidates.map(persona => persona.name)
        );

        return pickRandom(availableCandidates) ?? null;
    }

    private selectLinkPersona(
        newcomer: Persona,
        remainingGroup: Persona[]
    ): Persona | null {
        const connectedPersonas = remainingGroup.filter(
            persona => persona.relations.includes(newcomer)
        );

        if (connectedPersonas.length === 0) {
            return null;
        }

        return pickRandom(connectedPersonas);
    }



    private choosePersona(): Persona | null {
        const candidates = this.personas.filter(
            persona => persona.relations.length > 0
        );

        if (candidates.length === 0) {
            return null;
        }

        return candidates[Math.floor(Math.random() * candidates.length)];
    }


    // lines 
    private createLines() {
        this.lines = [];

        const renderedRelations = new Set<string>();

        for (const persona of this.personas) {
            for (const relation of persona.relations) {
                const startIndex = this.personas.indexOf(persona);
                const endIndex = this.personas.indexOf(relation);

                if (endIndex === -1) {
                    continue;
                }

                const key = [startIndex, endIndex]
                    .sort((a, b) => a - b)
                    .join("-");

                if (renderedRelations.has(key)) {
                    continue;
                }

                renderedRelations.add(key);

                this.lines.push(new Line(persona.point, relation.point));
            }
        }
    }

    private getPersonaLines(
        persona: Persona,
        otherPersonas: Persona[]
    ): Line[] {
        return otherPersonas.map(
            other => this.getLine(persona, other)
        ).filter((line): line is Line => line !== null);
    }

    private getLine(
        first: Persona,
        second: Persona
    ): Line | null {
        return this.lines.find(
            line =>
                (line.start === first.point && line.end === second.point) ||
                (line.end === first.point && line.start === second.point)
        ) ?? null;
    }

    private drawLines(lines: Line[], from?: Point, duration?: number) {
        return Promise.all(
            lines.map(line => line.drawLine(duration ?? timeline.lineDrawDuration, from))
        );
    }

    private undrawLines(lines: Line[], duration: number) {
        for (const line of lines) {
            line.undrawLine(duration ?? timeline.lineDrawDuration);
        }
    }





    // render utils 
    // render relations(lines) and personas(points) based on the updates Points positions
    private render() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.ctx.strokeStyle = COLOR;
        this.ctx.fillStyle = COLOR;
        this.ctx.lineWidth = 1;


        // render relations (lines between the points)
        for (const line of this.lines) {
            line.render(this.ctx);
        }


        // render Personas (points)
        // the order is important to draw teh rect over the lines (to prevent the dashesh in Line class from showing ontop of the rects of Point)
        for (const persona of this.personas) {
            const point = persona.point;

            point.render(this.ctx)
            this.syncNameToPersonaPoint(persona);
        }
    }


    private resize() {
        const dpr = window.devicePixelRatio || 1;

        const width = 500;
        const height = 500;

        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;

        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
}
