function ImagesGalleryHeader({
    selectModeActive,
    handleSelectModeToggle,
}: {
    selectModeActive: boolean;
    handleSelectModeToggle: () => void;
}) {
    return (<>
        {/* Header */}
        <div className="z-[6] w-full h-fit flex justify-between items-center p-[12px] absolute top-0 left-0">
            <div className="flex flex-col gap-[6px] text-white">
                <p className="font-bold text-[24px] tracking-[0.02em]">Library</p>
                <p className="text-[12px] tracking-[0.02em] font-semibold">21–24 Sep 2025</p>
            </div>

            <div>
                <button onClick={handleSelectModeToggle} className="relative px-[6px] rounded-[24px] py-[2px] text-white overflow-hidden bg-transparent backdrop-blur-xl">
                    <div className="z-[0] bg-[#9492928b] absolute top-0 left-0 rounded-[24px] h-full w-full" />
                    <p className="relative z-[3] tracking-[0.02em] text-[12px]">
                        {
                            selectModeActive ? "Cancel" : "Select"
                        }
                    </p>
                </button>
            </div>
        </div>

        {/* Backdrop blur layer */}
        <div className="z-[3] w-full h-[100px] gradientBackdropBlur absolute top-0 left-0 transition-none" />

        {/* Gradient overlay */}
        <div className="z-[3] w-full h-[100px] bg-gradient-to-b from-[#00000092] to-transparent absolute top-0 left-0" />
    </>);
}

export default ImagesGalleryHeader;