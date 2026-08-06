"use client"
import React from 'react'
import "./style.css"
import LiquidAvatar from './LiquidAvatar';

function SvgFilters() {
    return (<div className="w-screen h-screen flex items-center justify-center">
        <LiquidAvatar
            src="/images/saidFatahImage.jpeg"
            size={256}
            blobColors={["#6d5efc", "#c14bff", "#ff5ea8"]}
            onPlay={() => {/* wire audio here */ }}
        />
    </div>);
}

export default SvgFilters;