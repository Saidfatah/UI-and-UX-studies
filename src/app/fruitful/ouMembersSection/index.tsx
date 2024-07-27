

const MemberCard = ({ name }: { name: string }) => {
    return (
        <div className="memberCardWrapper">
            <div className="memberCard flexCenter" >
                {name}
            </div>
        </div>
    )
}

// https://www.fruitful.com/
// for the cards we can use palces 
// ourzazate marrkech casablana 
function OurMembers() {
    return (<div className="membersSectionWrapper" >
        <h3>Our members make moves</h3>
        <p>Hear inspiring stories from real members making real progress.</p>

        <div className="swiper_wrapper" >
            <MemberCard name="said" />
            <MemberCard name="said2" />
            <MemberCard name="ayoub" />
            <MemberCard name="yecmen" />
            <MemberCard name="yecmen2" />
        </div>
    </div>);
}

export default OurMembers;