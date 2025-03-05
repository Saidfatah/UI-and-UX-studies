'use client'
import { useEffect, useState } from "react";

function AaveBuilder({ children, hint, index }: any) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMounted(true);
        }, 700);
    }, []);

    return (<div
        className="aaveBuilder"
        style={{ "--index": index + 1 } as any}
        data-mounted={mounted}
    >
        <div className="aaveBuilderHint">
            <span>{hint}</span>
            <svg className="arrowRight" xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="currentColor"><path d="M6.86188 0.709162C7.15477 0.416269 7.62965 0.416269 7.92254 0.709162L12.6862 5.47283C12.9791 5.76572 12.9791 6.2406 12.6862 6.53349L7.92254 11.2972C7.62965 11.59 7.15477 11.59 6.86188 11.2972C6.56899 11.0043 6.56899 10.5294 6.86188 10.2365L10.3452 6.75316L0.84217 6.75316C0.427956 6.75316 0.0921694 6.41737 0.0921696 6.00316C0.092169 5.58895 0.427956 5.25316 0.84217 5.25316L10.3452 5.25316L6.86188 1.76982C6.56899 1.47693 6.56899 1.00206 6.86188 0.709162Z"></path></svg>
        </div>

        <div className="aaveBuilderInner">
            {children}
        </div>
    </div>);
}

export default AaveBuilder;