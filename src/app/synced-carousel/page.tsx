import ImageCarousel from "./SyncedCarousel";
import "./style.css"
const images = [
    '/images/saidFatahImage.jpeg',
    '/images/saidFatahImage.jpeg',
    '/images/saidFatahImage.jpeg',
    '/images/saidFatahImage.jpeg',
    '/images/saidFatahImage.jpeg',
]

function Page() {
    return (<div className="flex justify-center items-center w-screen h-screen">
        <ImageCarousel images={images} />
    </div>);
}

export default Page;