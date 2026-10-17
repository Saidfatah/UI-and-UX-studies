"use client";

import { useRouter } from "next/navigation";

export function TransitionLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const router = useRouter();

    const navigate = () => {
        if (!document.startViewTransition) {
            router.push(href);
            return;
        }

        document.startViewTransition(() => {
            router.push(href);
        });
    };

    return (
        <a
            href={href}
            onClick={(event) => {
                event.preventDefault();
                navigate();
            }}
        >
            {children}
        </a>
    );
}