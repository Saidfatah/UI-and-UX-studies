"use client"
import clsx from 'clsx';
import React, { ReactNode, useRef, useState, useEffect, useCallback } from 'react'
import './style.css';
import { motion } from 'framer-motion'
const steps = [
    { id: "step1" },
    { id: "step2" },
    { id: "step3" },
    { id: "step4" },
];

const Modal = ({ children, onClick, zIndex, active, modalRef }: {
    active: boolean;
    zIndex: number;
    children: ReactNode;
    onClick: () => void;
    modalRef: React.RefObject<HTMLDivElement>;
}) => {

    return (
        <div
            ref={modalRef}
            style={{
                zIndex,
            }}
            onClick={onClick}
            className={clsx(
                'modalContent w-full h-full bg-white  shadow-2xl p-4 border border-gray-400 rounded-lg flex flex-col justify-between ',
                active ? " pointer-events-auto" : " pointer-events-none"
            )}
        >
            {children}
        </div>
    );
};

const ModalStack = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const modalRefs = useRef<(HTMLDivElement | null)[]>(steps.map(() => null));

    const handleNext = useCallback(() => {
        if (currentStep < steps.length - 1) {
            const currentModal = modalRefs.current[currentStep];
            const nextModal = modalRefs.current[currentStep + 1];

            if (currentStep > 0) {
                const previousStep = modalRefs.current[currentStep - 1];

                if (previousStep) {
                    previousStep.style.transition = 'all 0.4s cubic-bezier(0.36, 0, 0.66, -0.56)'
                    previousStep.style.transform = 'scale(0.9) translateY(-20%)';
                    // previousStep.style.opacity = '0';
                    previousStep.style.pointerEvents = 'none';
                }
            }

            if (currentModal && nextModal) {
                // Animate current modal out
                currentModal.style.transform = 'scale(0.95) translateY(-10%)';
                currentModal.style.pointerEvents = 'none';
                currentModal.style.transition = 'all 0.4s 0.1s cubic-bezier(0.68, -0.6, 0.32, 1.6)'

                // Animate next modal in
                nextModal.style.transition = 'all 0.4s 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                nextModal.style.transform = 'scale(1) translateY(0)';
                nextModal.style.opacity = '1';
                nextModal.style.pointerEvents = 'auto';
            }

            setCurrentStep(prev => prev + 1);
        }
    }, [currentStep, modalRefs]);

    const setModalsPosition = useCallback(() => {
        if (!modalRefs.current) return

        modalRefs.current.forEach((element, index) => {
            if (!element) return;

            if (index === 0) {
                element.style.transform = 'scale(1) translateY(0)';
            } else {
                element.style.transform = 'scale(1) translateY(15%)';
                element.style.opacity = '0';
                element.style.pointerEvents = 'none';
            }
        });
    }, [modalRefs])


    useEffect(() => {
        setModalsPosition()
    }, [setModalsPosition,modalRefs]);

    const [open, setOpen] = useState(false);
    return (
        <div className="relative w-screen h-screen flex flex-col justify-center items-center bg-[#f2f2f2]">

            <button onClick={() => { setOpen(true) }}>Open modal</button>
            {
                open && (
                    <>
                        <div className="absolute left-0 top-0 w-screen h-screen bg-gray-500 opacity-50" />

                        <motion.div className='modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-80 h-[200px]'>
                            {steps.map((step, index) => (
                                <Modal
                                    active={index === currentStep}
                                    key={step.id}
                                    zIndex={index}
                                    onClick={() => {

                                    }}
                                    modalRef={((el: any) => modalRefs.current[index] = el) as any}
                                >
                                    <p className="text-center text-lg font-semibold">{step.id}</p>
                                    {index < steps.length - 1 && (
                                        <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleNext}>
                                            Next
                                        </button>
                                    )}
                                </Modal>
                            ))}
                        </motion.div>
                    </>
                )
            }
        </div >
    );
};
export default ModalStack;
