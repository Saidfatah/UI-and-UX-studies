"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SocietyMovementsOrchestrator } from "./SocietyMovementsOrchestrator";
import { Persona } from "./Persona";
import { Point, PointStagger } from "./Point";
import "./style.css"
import { PersonaInfoCard } from "./PersonaInfoCard";

function Societies() {
    const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const personInfoCardRef = useRef<HTMLDivElement>(null);
    const personInfoCardNameRef = useRef<HTMLSpanElement>(null);

    const personas = useMemo(() => {
        const pointsDelay = 1;

        const said = new Persona("Said", new Point(100, 100, pointsDelay + PointStagger * 1));
        const john = new Persona("John", new Point(500, 25, pointsDelay + PointStagger * 2));
        const sara = new Persona("Sara", new Point(350, 350, pointsDelay + PointStagger * 3));
        const alex = new Persona("Alex", new Point(150, 480, pointsDelay + PointStagger * 4));
        const maria = new Persona("Maria", new Point(200, 250, pointsDelay + PointStagger * 5));
        const hassan = new Persona("Hassan", new Point(450, 10, pointsDelay + PointStagger * 6));

        said.addRelation(john);
        said.addRelation(sara);
        said.addRelation(maria);

        john.addRelation(sara);
        john.addRelation(maria);
        john.addRelation(said);

        sara.addRelation(alex);
        sara.addRelation(maria);
        sara.addRelation(john);

        maria.addRelation(john);
        maria.addRelation(said);
        maria.addRelation(hassan);

        hassan.addRelation(sara);
        hassan.addRelation(said);
        hassan.addRelation(john);



        return [said, john, sara, alex, maria, hassan];
    }, []);

    useEffect(() => {

        const canvas = canvasRef.current;

        if (!canvas || !personInfoCardRef.current || !personInfoCardNameRef.current) return;

        const infoCard = new PersonaInfoCard(
            personInfoCardRef.current,
            personInfoCardNameRef.current,
            200,
            100
        );

        const animation = new SocietyMovementsOrchestrator(canvas, infoCard);
        // this syncs the visually selected persona inside SocietyMovementsOrchestrator to locale state
        animation.onPersonaSelected = setSelectedPersona;

        personas.forEach(persona => animation.addPersona(persona));

        animation.start();

        return () => {
            animation.stop();
        };
    }, [personas]);

    return (
        <div className="h-screen w-screen p-[3rem] pt-[5rem] bg-white">

            <div className="w-full h-full flex bg-black justify-center items-center">
                <div className="relative size-[500px]">
                    <div
                        ref={personInfoCardRef}
                        className="
                                top-0
                                z-[3]
                                left-0
                                opacity-50
                                w-[200px]
                                h-[100px]
                                absolute
                                p-[20px]
                                transition-opacity
                                duration-500
                                will-change-transform
                                bg-white
                                pointer-events-none
                            "
                    >

                        <p className="name " >
                            {/* this is to align with the persona personaName */}
                            <span className="inline-block translate-y-[-2.3px] translate-x-[0.2px]">
                                <span ref={personInfoCardNameRef} className="w-fit inline-block translate-x-0 ">
                                    {selectedPersona?.name}
                                </span>
                            </span>
                        </p>
                    </div>
                    {personas.map(persona => (
                        <p
                            key={persona.name}
                            ref={element => {
                                persona.nameElement = element;
                            }}
                            className="personaName z-[3] name absolute opacity-0 transition-opacity duration-500 will-change-transform w-fit whitespace-nowrap text-white text-sm pointer-events-none"
                        >
                            {/* this will be used by the PersonInfoCard to handle the syncing with the paragraphs name element */}
                            <span className="name-inner-span inline-block">
                                {persona.name}
                            </span>
                        </p>
                    ))}

                    <canvas
                        ref={canvasRef}
                        className="size-[500px] z-[-1] bg-transparent"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
}

export default Societies;