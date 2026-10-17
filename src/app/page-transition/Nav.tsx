import Link from "next/link";

function Nav() {
    return (<nav
        style={{
            viewTransitionName: "navbar"
        }}
    >
        <div className="nav-right-items">
            <Link className="nav-item" href={"/page-transition"}>Home</Link>
            <Link className="nav-item" href={"/page-transition/works"}>Works</Link>
            <Link className="nav-item" href={"/page-transition/about"}>About</Link>
        </div>
    </nav>);
}

export default Nav;