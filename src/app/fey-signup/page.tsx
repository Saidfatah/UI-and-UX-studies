import React from 'react'
import './fey-signup.style.css'
import './fey-signup-animations-sequence.css'
import FeyBadge from './FeyBadge';
import FeySignupForm from './FeySignupForm';

function FeySignup() {
    return (<div className='fey-signup'>
        <div className='topContainer'>
            <FeyBadge />
            <FeySignupForm />
        </div>
    </div>);
}

export default FeySignup;