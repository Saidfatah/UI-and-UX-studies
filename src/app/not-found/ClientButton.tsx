"use client"

import { useState } from "react";

function ClientButton() {
    const [count, setCount] = useState(0)

    return (<button
        onClick={() => {
            setCount(prev => prev + 1)
        }}
    >
        button : {count}
    </button>);
}

export default ClientButton;