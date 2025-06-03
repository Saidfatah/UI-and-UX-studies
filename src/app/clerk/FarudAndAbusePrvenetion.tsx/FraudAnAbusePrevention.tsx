import { useCallback, useRef, useState } from 'react';
import BlockedUserItem, { BlockedUserItemHandle } from './BlockedUserItem';
import FraudDetectedSourceCard from './FraudDetecedSourceCard';
import FraudDetectionFlowLine from './Line';


function FraudAnAbusePrevention() {
    // Store refs in an array
    const blockedUserRefs = useRef<BlockedUserItemHandle[]>([]);
    const [hovered, setHovered] = useState(false);

    // Handle mouse enter to call fadeIn
    const handleMouseEnter = useCallback((e: any) => {
        setHovered(true)

        setTimeout(() => {
            for (let index = 0; index < blockedUserRefs.current.length; index++) {
                const blockedUserRef = blockedUserRefs.current[index];
                blockedUserRef.fadeIn();
            }
        }, 200);
    }, [blockedUserRefs]);

    const handleMouseLeave = useCallback((e: any) => {
        setHovered(false)
        for (let index = 0; index < blockedUserRefs.current.length; index++) {
            const blockedUserRef = blockedUserRefs.current[index];
            blockedUserRef.fadeOut();
        }
    }, [blockedUserRefs]);

    const blockedUsers = [
        { email: "bad_actor+1@email.com", blockedDate: "Aug 4 at 14:09" },
        { email: "bad_actor+2@email.com", blockedDate: "Aug 4 at 14:10" },
        { email: "bad_actor+3@email.com", blockedDate: "Aug 4 at 14:12" },
        { email: "bad_actor+3@email.com", blockedDate: "Aug 4 at 14:16" },
    ];


    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group w-[453px] h-[562px] isolate flex row-span-2 flex-col rounded-2xl bg-[#212126] shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden"
        >
            <div className="relative z-10 flex-none px-6 pt-6">
                <h3 className="text-[.8125rem] font-medium text-white">
                    Fraud and Abuse Prevention
                </h3>
                <p className="mt-2 text-pretty text-[.8125rem] text-gray-400">
                    Reduce fraudulent sign-ups and free trial abuse by blocking high-risk disposable email domains and restricting the use of email subaddresses with the “+” separator.
                </p>
            </div>

            <div
                className="pointer-events-none relative flex-auto select-none min-h-[10rem]"
                aria-hidden="true"
            >
                <div className="flex h-full items-center justify-center">
                    <div className='min-w-min'>
                        <FraudDetectedSourceCard animateLoader={hovered} />

                        <div className="relative pl-[2.875rem] pt-16">
                            <div className="absolute left-[calc(19/16*1rem)] top-0 -z-10 aspect-[39/393] w-[calc(39/16*1rem)]">
                                <FraudDetectionFlowLine showMovingDash={hovered} />
                            </div>
                            <div className="space-y-6">
                                {/* Pass refs and mouse events to BlockedUserItem */}
                                {blockedUsers.map((user, index) => (
                                    <BlockedUserItem
                                        key={index}
                                        index={index}
                                        ref={(el) => (blockedUserRefs.current[index] = el as BlockedUserItemHandle)}
                                        email={user.email}
                                        blockedDate={user.blockedDate}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FraudAnAbusePrevention;
