function ProjectsSection() {
    return (<div className="home-hero__projects">
        <div className="home-hero__projects-wrapper">
            <div className="home-projects__project">
                <div className="home-projects__project-left ">
                    <div className="home-projects__project-title-wrapper">
                        <div className="home-hero__projects-title">
                            <h2>
                                hatom.com
                            </h2>
                        </div>
                    </div>
                    <div className="home-projects__project-info-items container-with-gray-border">
                        <div className="home-projects__project-info">
                            <h3>
                                About
                            </h3>
                            <p>
                                Website designed to feel fast without sacrificing animations.
                                Rather than animating page transitions, each page features an initial load animation,
                                ensuring instant navigation while maintaining a smooth, polished experience.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="home-projects__project-right">
                    <div className="home-projects__project-item-media">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            data-url="/portfolio-videos/hatom-landing-intro-1.mov"
                            src="/portfolio-videos/hatom-landing-intro-1.mov"
                            className="is-playing"></video>
                    </div>
                    <div className="home-projects__project-item-media">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            data-url="/portfolio-videos/hatom-landing-intro-1.mov"
                            src="/portfolio-videos/hatom-landing-intro-1.mov"
                            className="is-playing"></video>
                    </div>
                    <div className="home-projects__project-item-media">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            data-url="/portfolio-videos/hatom-landing-intro-1.mov"
                            src="/portfolio-videos/hatom-landing-intro-1.mov"
                            className="is-playing"></video>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default ProjectsSection;