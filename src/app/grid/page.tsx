import "./style.css";


function Grid() {
    return (<div className="w-screen bg-white h-screen flex justify-center items-center" >
        {/* <div className="grid">
            <div className="grid-item-1"></div>
            <div className="grid-item-2"></div>
            <div className="grid-item-2"></div>

        </div> */}

        <div className="o-container">
            <ul className="o-grid">
                <li className="grid__list-item">
                    <div className="grid__item-main-wrapper">
                        <a href="#" className="grid__item-outer-wrapper">

                        </a>

                    </div>
                </li>

            </ul>
        </div>

    </div>);
}

export default Grid;