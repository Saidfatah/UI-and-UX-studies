interface ArrowRightIconProps extends React.SVGProps<SVGSVGElement> {}

function ArrowRightIcon(props: ArrowRightIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="18"
            viewBox="0 0 37 18"
            fill="none"
            aria-hidden="true"
            {...props}
        >
            <path d="M28.7208 1L36 9M36 9L28.7208 17M36 9H0" stroke="currentColor" />
        </svg>
    );
}

export default ArrowRightIcon;
