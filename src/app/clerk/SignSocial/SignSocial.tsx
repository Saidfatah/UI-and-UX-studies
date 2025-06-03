function SignSocial() {
    return (<div className="w-[348px] h-[280px] group isolate flex flex-col rounded-2xl bg-[#212126] shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden">
        <div className="pointer-events-none relative flex-auto select-none min-h-[10.25rem]">
            <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,white_60%,transparent)]">
                <div className="relative mx-auto aspect-[98/192] w-[calc(98/16*1rem)]">
                    <div className="relative mx-auto aspect-[98/192] w-[calc(98/16*1rem)]">
                        <svg
                            viewBox="0 0 98 192"
                            fill="none"
                            aria-hidden="true"
                            className="absolute inset-0 h-full w-full">
                            <path
                                stroke="#fff"
                                stroke-opacity=".06"
                                d="M49 192V96.266a8 8 0 0 0-2.285-5.599L3.285 46.333A8 8 0 0 1 1 40.734V-28M49 93l45.715-46.667A8 8 0 0 0 97 40.734V-23"
                            >
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <div className="relative z-10 flex-none px-6 order-last pb-6">
            <h3 className="text-[.8125rem] font-medium text-white">
                Social Sign-On
            </h3>
            <p className="mt-2 text-pretty text-[.8125rem] text-gray-400">
                Add high-conversion Social Sign-on (SSO) to your application in minutes. 20+ options and growing.
            </p>
        </div>
    </div>);
}

export default SignSocial;