"use client";

import { useState } from "react";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import CheckIcon from "./icons/CheckIcon";
import "./signup-form.css";
import clsx from "clsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SignupForm() {
    const [email, setEmail] = useState("");
    const [agree, setAgree] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const hasValue = email.length > 0;
    const isActive = hasValue; // active state = there is input
    const emailValid = EMAIL_RE.test(email);
    const showError = submitted && !emailValid;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <form className="signup" method="POST" noValidate onSubmit={handleSubmit}>
            <div className="relative">

                <div className="signup__inputRow">
                    <input
                        className="signup__input"
                        name="email"
                        type="email"
                        placeholder="Sign up for updates"
                        autoComplete="off"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="signup__arrow" type="submit" aria-label="Submit">
                        <ArrowRightIcon />
                    </button>
                </div>

                <div className={clsx(
                    isActive && "signup__card_active",
                    !isActive && "signup__card_in_active",
                )} >
                    {isActive && (
                        <>
                            <label className="signup__agree">

                                <span className="signup__indicator">
                                    <CheckIcon />
                                </span>
                                <input
                                    className="signup__checkbox"
                                    type="checkbox"
                                    name="agree"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                />


                                <span className="signup__agreeText">
                                    I agree to receive emails from Figma, and that my data will be
                                    processed in accordance with Figma&rsquo;s{" "}
                                    <a
                                        href="https://www.figma.com/privacy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </span>
                            </label>

                            {showError && (
                                <div className="signup__error">
                                    Please provide a valid email address
                                </div>
                            )}
                        </>

                    )}
                </div>
            </div>
        </form>
    );
}

export default SignupForm;
