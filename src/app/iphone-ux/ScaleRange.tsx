function ScaleRange({
    value,
    onChange,
    onMouseUp
}: {
    value: number;
    onChange: (value: number) => void;
    onMouseUp: (value: number) => void;
}) {
    return (<div>
        <input
            type="range"
            value={value}
            min={40}
            step={0.1}
            max={100}
            onMouseUp={() => onMouseUp(value)}
            onChange={(e) => onChange(e.target.valueAsNumber)} />
    </div>);
}

export default ScaleRange;