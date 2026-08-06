interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}

function CheckIcon(props: CheckIconProps) {
    return (
        <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M0.353546 0.353554L12.3535 12.3536M0.353546 12.3536L12.3535 0.353554"
                stroke="currentColor"
            />
        </svg>
    );
}

export default CheckIcon;
