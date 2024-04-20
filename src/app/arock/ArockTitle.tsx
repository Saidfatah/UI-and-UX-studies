'use client'
import React from "react";
import './arock.animations.css'
import { HERO_TITLE_DELAY } from "./constants";
import PrespectiveSlideTextEachCharacter from './PrespectiveSlideTextEachCharacter'


function ArockTitle() {


    return (
        <div className="absolute z-[99] top-0 left-0"  >
            <PrespectiveSlideTextEachCharacter delay={HERO_TITLE_DELAY} className="title" key={"JUST"} word="JUST" />
            <span className="letterHidden" >&nbsp;</span>
            <PrespectiveSlideTextEachCharacter  delay={HERO_TITLE_DELAY} className="title" key={"DO"} word="DO" />
            <span className="letterHidden" >&nbsp;</span>
            <PrespectiveSlideTextEachCharacter  delay={HERO_TITLE_DELAY} className="title" key={"IT"} word="IT" />

        </div>
    );
}

export default ArockTitle;