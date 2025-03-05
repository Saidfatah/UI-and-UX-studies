import { cards } from "./constants";
import GlareCard from "./GlareCard";

function GlareCards() {
    return (<div className=" w-screen h-screen flex items-center justify-center bg-gray-950">
        <div className="px-8 md:px-12">
            <div className="mx-auto max-w-3xl space-y-12 text-center">
                <div className="space-y-6">
                    <p className="inline-block rounded-full border border-white/10 bg-white/10 text-white px-4 py-2 text-sm"> Written by Tuple users  </p>
                    <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl text-white"> Off-the-shelf triggers </h2>
                    <h3 className="mx-auto max-w-3xl font-[400] leading-relaxed text-gray-300 px-6 text-xl">
                        No need to start from scratch. Explore dozens of pre-written
                        triggers from Tuple's engineers and our beloved community of
                        developers.
                    </h3>
                </div>
            </div>
            <div className="mx-auto my-16 grid gap-6 grid-cols-3">
                {cards.map(cardData => (
                    <GlareCard key={cardData.title} {...cardData} />
                ))}
            </div>
        </div>
    </div>);
}

export default GlareCards;