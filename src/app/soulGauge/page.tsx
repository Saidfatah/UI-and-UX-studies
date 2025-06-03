import GaugesAndEmissionsGaugeCard from "./GaugesAndEmissionsGaugeCard";

function GuageTest() {
    return (<div className=" w-screen bg-black h-screen flex items-center justify-center">
        <div className="w-[300px]">
            <GaugesAndEmissionsGaugeCard
                data={{
                    type: "supply",
                    label: "labek",
                    value: 50
                }}
            />
        </div>
    </div>);
}

export default GuageTest;