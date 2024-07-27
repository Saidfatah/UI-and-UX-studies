"use client"
import React from 'react';
import { P5jsContainer } from './p5Container'; // Adjust the path as necessary
import { P5jsSketch } from './p5Container';
import './blurInOut.css'
import { ParticlesSketch } from './ParticlesSketch';



const App = () => {
    return (
        <div  >
            <P5jsContainer sketch={ParticlesSketch} />
        </div>
    );
};

export default App;
