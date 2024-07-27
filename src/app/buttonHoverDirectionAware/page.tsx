import './buttonHoverDirectionAwareHover.style.css'


// https://codepen.io/ainalem/pen/zYwLJzG

function DirectionAwareHover() {
    return (<div className="flex justify-center items-center w-screen h-screen bg-black" >

        <button className='buttonWithDirectionAwareHoverArea' >
                <div className='buttonDirectionAwareHoverArea' >
                    <div className='top_half' />
                    <div className='bottom_half' />
                    <div className='translateTrigger topHoverPart' >
                        <span className='topHoverPart' >Top text</span>
                    </div>
                    <div className='translateTrigger ' >
                        <span className='middlePart' >Middle text</span>
                    </div>
                    <div className='translateTrigger bottomHoverPart' >
                        <span className='bottomHoverPart' >bottom text</span>
                    </div>
                </div>
        </button>


    </div>);
}

export default DirectionAwareHover;