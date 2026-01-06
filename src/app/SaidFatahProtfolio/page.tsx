'use client';
import clsx from 'clsx';
import './style.css';
import CoffeeMugCanvas from './CoffeMiugCanvas';
import ProjectsSection from './ProjectsSection';

function SaidFatahPortfolio() {
    
    return (
    <div className={clsx("cursor-none h-screen w-screen p-[0rem]")}>
        <div className='relative z-[9]'>
            <nav className='h-[60px] mt-[12px] w-full flex items-center justify-center'>
                <a href="#" className='text-[14px] tracking-[0.03em] text-[#050505]'>[SAID FATAH]</a>
            </nav>

            <div className='home-hero '>
                <h1 className='hero__title text-[#050505]'>
                    <span className='hero__title-text' >
                        Said Fatah is a front-end engineer and with great design skills. He works with
                        startups and individuals worldwide to build remarkable yet performant digital
                        experiences mainly in e-commerce , Web3 space and community space.
                    </span>
                    <span className='hero__title-text'>
                        Currently based in Marrakech, Morocco.
                    </span>
                </h1>

                <div className='home-hero__content'>
                    <div className='home-hero__content-wrapper'>
                        <div className='home-hero__content-block'>
                            <h2 className='home-hero__content-block-title'>Services</h2>
                            <div className='home-hero__block-items'>
                                <ul className='home-hero__block-list'>
                                    <li style={{ "--line": 0 }}>
                                        <span>Front &amp; back-end development</span>
                                    </li>
                                    <li style={{ "--line": 0 }}>
                                        <span>Prototyping</span>
                                    </li>
                                    <li style={{ "--line": 0 }}>
                                        <span>UI/UX Design</span>
                                    </li>
                                    <li style={{ "--line": 0 }}>
                                        <span>Micro-interactions</span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className='home-hero__content-block'>
                            <div className='home-hero__block-items'>
                                <ul className='home-hero__block-list'>
                                    <li className="w-[125px] h-[125px]" >
                                        <CoffeeMugCanvas />
                                    </li>


                                </ul>
                            </div>
                        </div>
                        <div className='home-hero__content-block'>
                            <h2 className='home-hero__content-block-title'>Stack and skills</h2>
                            <div className='home-hero__block-items'>
                                <ul className='home-hero__block-list'>
                                    <li style={{ "--line": 0 }}>
                                        <span>Framlerwoks (Nextjs , Nestjs , Electronjs) </span>
                                    </li>
                                    <li style={{ "--line": 0 }}>
                                        <span>Style (CSS , Sass and Tailwindcss ... etc) </span>
                                    </li>
                                    <li style={{ "--line": 0 }}>
                                        <span>Animation (Framer , Gsap and Lottie ... etc)</span>
                                    </li>
                                    <li style={{ "--line": 0 }}>
                                        <span>Testing (jest,cypress)</span>
                                    </li>

                                </ul>
                            </div>
                        </div>

                        <div className='home-hero__content-block'>
                            <h2 className='home-hero__content-block-title'>Contact</h2>
                            <ul className='home-hero__block-items'>
                                <p>
                                    <div>
                                        If you'd like further details about my working
                                    </div>
                                    <div>
                                        approach or want to discuss a project or idea,
                                    </div>
                                    <div>
                                        please get in touch.
                                    </div>
                                </p>
                                <div className='home-hero__block-links'>
                                    <li>
                                        <a href="mailto:said_designer@outlook.com" className='home-hero__block-link'>
                                            <span>said_designer@outlook.com</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/said-fatah-1b1b1b1b1/" className='home-hero__block-link'>
                                            <span>LinkedIn</span>
                                        </a>
                                    </li>
                                </div>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>

            <ProjectsSection />
        </div>

    </div>);
}

export default SaidFatahPortfolio;