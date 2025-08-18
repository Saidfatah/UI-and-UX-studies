'use client'
import React from 'react'
import './fey-signup.style.css'
import './fey-signup-animations-sequence.css'
import FeyBadge from './FeyBadge';
import FeySignupForm from './FeySignupForm';
import { useState } from 'react';

function FeySignup() {

    return (<div className='fey-signup'>
            <a href='https://fey.com/' className='close-button' >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.75 6.75L17.25 17.25M17.25 6.75L6.75 17.25" stroke="#E6E6E6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </a>
        <div className='topContainer'>
            <FeyBadge />
            <FeySignupForm />
        </div>
    </div>);
}

export default FeySignup;