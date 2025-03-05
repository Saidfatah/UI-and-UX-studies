import AaveEverywhere from "./AaveEverywhere";
import './aave.css'
function Aave() {
    return (
        <>
            <div className="page  opacity-0">
                <div>
                    <h2 className="title">GHO</h2>
                    <p className="description">GHO is the only decentralised, overcollateralised stablecoin native to the Aave Protocol.</p>
                </div>
            </div>
            <div className="page">
                <AaveEverywhere />
            </div>
        </>

    );
}

export default Aave;