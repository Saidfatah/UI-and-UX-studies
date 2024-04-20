import { HERO_BOTTOM_FIRST_WORD, HERO_BOTTOM_SECOND_WORD, HERO_BOTTOM_THIRD_WORD } from "./constants";
import TextSlideFullWord from "./TextSlideFullWord";

function ArockHeroBottom() {
    return (<div className="absolute left-0 bottom-0 z-[99] h-[32px] w-full flex justify-between items-start" >
        <div className="flex flex-col justify-between h-full" >
            <TextSlideFullWord className="description" delay={HERO_BOTTOM_FIRST_WORD} word="Nike" key="Nike" />
            <TextSlideFullWord className="description" delay={HERO_BOTTOM_FIRST_WORD + 100} word="is goat" key="Nike" />
        </div>
        <div className="w-[300px] flex justify-between items-center h-full" >
            <div className="flex flex-col justify-between h-full" >
                <TextSlideFullWord className="description" delay={HERO_BOTTOM_SECOND_WORD} word="PLAY" key="PLAY" />
                <TextSlideFullWord className="description" delay={HERO_BOTTOM_SECOND_WORD + 100} word="THE FILM" key="THE FILM" />
            </div>
            <div className="flex flex-col justify-between h-full" >
                <TextSlideFullWord className="description" delay={HERO_BOTTOM_THIRD_WORD} word="PROJECT" key="PROJECT" />
                <TextSlideFullWord className="description" delay={HERO_BOTTOM_THIRD_WORD + 100} word="2024" key="2024" />
            </div>
        </div>
    </div>);
}

export default ArockHeroBottom;