'use client'
import './arock.animations.css'
import ArockHeroBottom from './ArockHeroBottom';
import ArockTitle from './ArockTitle'
import HeroImageBg from './HeroImageBg';
import HeroLoadingBar from './LoadingBar';

function ARockAnimations() {


    return (<div className=" bg-black  w-screen flexCenter" >
        <header className="w-full min-h-screen h-full p-[24px]" >
            <HeroImageBg />
            <HeroLoadingBar />

            <div className="relative w-full h-[calc(100vh-48px)] " >
                <ArockTitle />
                <ArockHeroBottom />
            </div>
        </header>
    </div>);
}

export default ARockAnimations;