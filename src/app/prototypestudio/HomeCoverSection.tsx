function HomeCoverSection() {
    return (<section className="home-cover relative w-full h-screen pb-15 text-white overflow-hidden">
        <div className="home-cover-background absolute-full"
            style={{ translate: "none", rotate: "none", scale: "none", transform: "translate(0px, 0px)" }}>
            <video
                src="/videos/prorotype_showreel_loop.mp4"
                className="home-cover-video w-full h-full object-cover"
                loop
                autoPlay
                muted
                playsInline
            />
            <div className="absolute-full bg-black/30"></div>
        </div>
        
    </section>);
}

export default HomeCoverSection;