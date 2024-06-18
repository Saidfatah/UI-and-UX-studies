const ArrowIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 12 7"
            fill="none"
            className="dd-img"
            // style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
            >
            <path d="M5.53846 6.78148L0.208213 1.1873C-0.0694043 0.925078 -0.0694043 0.488033 0.208213 0.19667C0.458068 -0.0655567 0.874494 -0.0655567 1.15211 0.19667L6.01041 5.32466L10.8687 0.225806C11.1186 -0.0655567 11.535 -0.0655567 11.8126 0.225806C12.0625 0.488033 12.0625 0.925078 11.8126 1.1873L6.4546 6.78148C6.20474 7.07284 5.78832 7.07284 5.53846 6.78148Z" fill="currentColor"></path>
        </svg>
    )
}


function NavDropDown() {
    return (< >
        <div className="nav-center nav-outer-style" >
            <div className="flex_row_centered_vertical" >
                <div>
                    Member Benefits
                </div>
                <ArrowIcon />
            </div>
            <a>Pricing</a>
        </div>
        <div className="nav-dd nav-outer-style" style={{ width: 568 }} >
            <a className="dd-link" >
                <div className="p-reg" >Guidance</div>
                <div className="p-small" >Expert 1:1 advice and support</div>
            </a>
            <a className="dd-link" >
                <div className="p-reg" >Save</div>
                <div className="p-small" >
                    Earn 5.00% APY on
                    <br />
                    your savings
                </div>
            </a>
            <a className="dd-link" >
                <div className="p-reg" >Invest</div>
                <div className="p-small" >
                    Smarter investing,
                    <br />
                    set up for you
                </div>
            </a>
        </div>

    </>);
}


function FruitFullNav() {
    return (<div className="relative w-full" >
        <NavDropDown />
    </div>);
}

export default FruitFullNav;