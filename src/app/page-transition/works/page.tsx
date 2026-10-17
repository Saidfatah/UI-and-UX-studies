import Nav from "../Nav";
import "../style.css"


function Works() {
    return (
        <div className="page">
            <Nav />
            <div className="page-container">
                <div className="images">
                    <img src="/images/guest/image-1.png" />
                    <img src="/images/guest/image-2.png" />
                    <img src="/images/guest/image-3.png" />
                    <img src="/images/guest/image-4.png" />
                </div>
            </div>
        </div>
    );
}

export default Works;