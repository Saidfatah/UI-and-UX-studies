import { DocMapLink } from "./ClerkDocumentationMap";


const subLinkXOffset = 20;
const xOffset = 0;
export const yStep = 20;

export const generateXValues = (linkArray:DocMapLink[]) => {
    return linkArray.flatMap(section => {
        let values = [xOffset];
        if (section.subLinks) {
            values = values.concat(section.subLinks.map(() => subLinkXOffset));
        }
        return values;
    })
}

export const sectionsLinks: DocMapLink[] = [
    {
        title: "Properties",
        href: "#properties",
        // height:"h-[300px]",
    },
    {
        title: "Customize elements of a Clerk component",
        href: "#customize-elements-of-a-clerk-component",
        // height:"h-[500px]",
        subLinks: [
        
            {
                title: "Use inline CSS objects to style Clerk components",
                href: "#use-inline-css-objects-to-style-clerk-components",
                // height:"h-[200px]",
            },
        ]
    },
    {
        title: "Customize the layout",
        href: "#customize-the-layout",
        // height:"h-[300px]",
    },
    {
        title: "Customize the base theme",
        href: "#customize-the-theme",
        // height:"h-[200px]",
    },
    {
        title: "Customize elements of a Clerk component",
        href: "#customize-elements-of-a-clerk-component",
        // height:"h-[500px]",
        subLinks: [
            {
                title: "Use global CSS to style Clerk components",
                href: "#use-global-css-to-style-clerk-components",
                // height:"h-[200px]",
            },
            {
                title: "Use custom CSS classes to style Clerk components",
                href: "#use-custom-css-classes-to-style-clerk-components",
                // height:"h-[200px]",
            },
            {
                title: "Use inline CSS objects to style Clerk components",
                href: "#use-inline-css-objects-to-style-clerk-components",
                // height:"h-[200px]",
            },
        ]
    },
    {
        title: "Next Steps",
        href: "#next-steps",
        // height:"h-[600px]",
    },
]

export const sectionIds = sectionsLinks
.flatMap(link => [link.href, ...(link.subLinks?.map(sl => sl.href) || [])])
.map(href => href.substring(1));
