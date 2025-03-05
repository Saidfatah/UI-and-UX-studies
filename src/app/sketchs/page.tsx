"use client"
import React from 'react';
import { P5jsContainer } from './p5Container'; // Adjust the path as necessary
import { P5jsSketch } from './p5Container';
import './blurInOut.css'
import { ParticlesSketch } from './Particles/ParticlesSketch';
import { PerlinNoiseSketch } from './PerlinNoise/PerlinNoiseSketch';



const App = () => {
    return (
        <div className=' '>
            <P5jsContainer sketch={PerlinNoiseSketch} />
        </div>
    );
};

export default App;
