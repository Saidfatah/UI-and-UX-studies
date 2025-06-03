import React, { useRef, useCallback, useImperativeHandle, forwardRef } from "react";

interface BlockedUserItemProps {
  email: string;
  blockedDate: string;
  index: number;
}

// Define the handle type for the exposed methods
export interface BlockedUserItemHandle {
  fadeIn: () => void;
  fadeOut: () => void;
}

const X_ICON_DELAY = 0;
const EMAIL_DELAY = 0.2;
const DATE_DELAY = 0.3;
const DELAY = 0.1

const BlockedUserItem = forwardRef<BlockedUserItemHandle, BlockedUserItemProps>(
  ({ email, blockedDate, index }: BlockedUserItemProps, ref) => {
    const xIconRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLDivElement>(null);
    const dateRef = useRef<HTMLDivElement>(null);

    const fadeIn = useCallback(() => {
      if (!xIconRef.current) return;
      if (!emailRef.current) return;
      if (!dateRef.current) return;

      xIconRef.current.style.opacity = "1";
      xIconRef.current.style.transform = "scale(1)";

      emailRef.current.style.opacity = "1";
      emailRef.current.style.filter = 'blur(0px)'
      emailRef.current.style.transform = "scale(1)";

      dateRef.current.style.opacity = "1";
      dateRef.current.style.transform = "translateY(0)";
    }, [xIconRef, emailRef, dateRef]);

    const fadeOut = useCallback(() => {
      if (!xIconRef.current) return;
      if (!emailRef.current) return;
      if (!dateRef.current) return;

      xIconRef.current.style.opacity = "0";
      xIconRef.current.style.transform = "scale(0.8)";

      emailRef.current.style.opacity = "0";
      emailRef.current.style.filter = 'blur(8px)';
      emailRef.current.style.transform = "scale(1.2)";

      dateRef.current.style.opacity = "0";
      dateRef.current.style.transform = "translateY(0.5rem)";
    }, [xIconRef, emailRef, dateRef]);

    // Expose fadeIn and fadeOut to parent component via ref
    useImperativeHandle(ref, () => ({
      fadeIn,
      fadeOut,
    }));


    console.log(DELAY * index + X_ICON_DELAY)
    return (
      <div className="flex items-start gap-4 text-[0.625rem]/[1.125rem]">
        <div className="relative mt-[calc(1/16*1rem)] flex size-5 flex-none items-center justify-center rounded-full bg-gray-600/20">
          <div className="size-1 rounded-full bg-gray-600 shadow-[0_1px_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.25)]"></div>
          <div
            ref={xIconRef}
            className="will-change-auto absolute inset-0 flex items-center justify-center rounded-full bg-red-500"
            style={{
              opacity: 0,
              transform: "scale(0.8)",
              transition: `all 0.4s ${DELAY * index + X_ICON_DELAY}s ease-in`
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
              <path
                stroke="#131316"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="m5 5 6 6M11 5l-6 6"
              ></path>
            </svg>
          </div>
        </div>
        <div>
          <div
            ref={emailRef}
            className="font-medium labelConfig   origin-left text-white"
            style={{
              opacity: 0,
              transform: "scale(1.2)",
              filter: 'blur(8px)',
              transition: `all 0.4s ${DELAY * index + EMAIL_DELAY}s ease`
            }}
          >
            {email}
          </div>
          <div
            ref={dateRef}
            className="text-gray-600"
            style={{
              opacity: 0,
              transform: "translateY(0.5rem)",
              transition: `all 0.2s ${DELAY * index + DATE_DELAY}s ease-in-out`
            }}
          >
            Blocked {blockedDate}
          </div>
        </div>
      </div >
    );
  }
);

// Ensure the ref is typed correctly with LegacyRef
export default BlockedUserItem
