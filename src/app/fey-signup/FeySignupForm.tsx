'use client'
import React, { useRef, useState } from 'react'
import './fey-signup-form.css'
import SubmitButton, { SubmitButtonStates } from './FeySubmitButton';
import { validateEmail } from './fey-signup.utils';



function FeySignupForm() {
    const [value, setValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const titleDescriptionContainerRef = useRef<HTMLDivElement>(null);
    const formFooterRef = useRef<HTMLDivElement>(null);

    const isValidEmail = validateEmail(value)


    let buttonState: SubmitButtonStates = "default"
    if (isValidEmail) buttonState = "valid"
    if (isSending) buttonState = "sending"
    if (isSuccess) buttonState = "success"

    const successMessageSwapElementsAnimationSequence = (callback: () => void,duration:number) => {
        if (titleDescriptionContainerRef.current)
            titleDescriptionContainerRef.current.style.opacity = "0";

        if (formFooterRef.current)
            formFooterRef.current.style.opacity = "0";


        if (callback) callback();


        setTimeout(() => {
            if (titleDescriptionContainerRef.current)
                titleDescriptionContainerRef.current.style.opacity = "1";

            if (formFooterRef.current)
                formFooterRef.current.style.opacity = "1";
        }, duration);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSending(true);

        setTimeout(() => {
            // since the success animation of the submit button takes about 1.5s , here we set duration for the sequence to be half of
            // this arbituary tho we just want to time it so that it feels right
            successMessageSwapElementsAnimationSequence(() => setShowSuccessMessage(true),700)

            setIsSending(false);
            setIsSuccess(true);
        }, 2000);
    }

    const handleBackToSignup = () => {
        successMessageSwapElementsAnimationSequence(() => {
            setShowSuccessMessage(false)
            setIsSuccess(false)
        },500)
        setValue('');
    }

    const shouldBlurTitleDescriptionContainer = value && !isSuccess;
    const shouldBlurFormFooter = shouldBlurTitleDescriptionContainer

    return (<div className="signup-form">
        <div></div>

        <div className='signup-form-container'>
            <div
                ref={titleDescriptionContainerRef}
                className={`title-description-container ${shouldBlurTitleDescriptionContainer ? 'blurred-faded' : ''}`}
            >
                <div className="reveal-with-slide-up-animation" style={{ animationDelay: "1.2s" }}>
                    <h1 className="title-container">
                        <span className="title-text-gradient">{
                            showSuccessMessage
                                ? "Check your inbox"
                                : "Welcome to Fey"
                        }</span>
                    </h1>
                </div>

                <div className="reveal-with-slide-up-animation" style={{ animationDelay: "1.3s" }}>
                    <div className="description-container">
                        <p className="description">
                            {showSuccessMessage
                                ? "We have sent you a secure login link. Please click the link to authenticate your account."
                                : "Your all-in-one research workspace. Set up your Fey account in just a few clicks."
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="reveal-with-slide-up-animation" style={{ animationDelay: "1.4s" }}>
                <form className="email-form" onSubmit={handleSubmit}>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        autoFocus
                        id="email-input"
                        className={"email-input" + (isSuccess ? " email-success" : "")}
                        type="email"
                        disabled={isSuccess}
                        placeholder="account email"
                    />
                    <SubmitButton state={buttonState} />
                </form>
            </div>

            <div className="reveal-with-slide-up-animation" style={{ animationDelay: "1.5s", width: "100%" }}>
                <div ref={formFooterRef} className={`signup-footer ${shouldBlurFormFooter ? 'blurred-faded' : ''}`}>
                    {!showSuccessMessage && (
                        <button className="google-button">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.72 8.15908C14.72 7.66272 14.6755 7.18545 14.5927 6.72726H8V9.43499H11.7673C11.605 10.31 11.1118 11.0514 10.3705 11.5477V13.3041H12.6327C13.9564 12.0854 14.72 10.2909 14.72 8.15908Z" fill="#E6E6E6"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.9996 15C9.8896 15 11.4741 14.3732 12.6323 13.3041L10.37 11.5477C9.74323 11.9677 8.94141 12.2159 7.9996 12.2159C6.17641 12.2159 4.63323 10.9845 4.08278 9.33H1.74414V11.1436C2.89596 13.4314 5.26323 15 7.9996 15Z" fill="#E6E6E6"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.08318 9.32999C3.94318 8.90999 3.86364 8.46135 3.86364 7.99999C3.86364 7.53863 3.94318 7.08999 4.08318 6.66999V4.85635H1.74455C1.27045 5.80135 1 6.87044 1 7.99999C1 9.12954 1.27045 10.1986 1.74455 11.1436L4.08318 9.32999Z" fill="#E6E6E6"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.9996 3.78409C9.02732 3.78409 9.95005 4.13727 10.6755 4.83091L12.6832 2.82318C11.471 1.69364 9.88641 1 7.9996 1C5.26323 1 2.89596 2.56864 1.74414 4.85636L4.08278 6.67C4.63323 5.01545 6.17641 3.78409 7.9996 3.78409Z" fill="#E6E6E6"></path>
                            </svg>
                            <span>Signup with Google</span>
                        </button>
                    )}
                    {showSuccessMessage && (
                        <div className='back-to-signup-button-container'>
                            <button onClick={handleBackToSignup} className='back-to-signup-button'>
                                Back to Signup
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className='terms-of-service'>
            By signing up, you agree to our
            <a href="/terms" target="_blank"> Terms of Service</a>
            .
        </div>
    </div>);
}

export default FeySignupForm;