import { useCallback, useEffect, useRef, useState } from "react";
import ClerkDocumentationProgress from "./ClerkDcoumentationProgress";
import useVisibleSections from "./useVisibleSections";
import { generateXValues, sectionIds, sectionsLinks } from "./utils";

export type DocMapLink = {
    title: string,
    href: string,
    height?: string,
    subLinks?: DocMapLink[]
}


const SectionLink = ({ title, href }: { title: string, href: string }) => (
    <li className="relative text-[.8125rem] font-book text-gray-400 group/item">
        <a
            href={href}
            className="block  leading-normal transition-colors hover:text-white [&amp;_*]:[font:inherit]"
        >
            {title}
        </a>
    </li>
)

function ClerkDocumentationMap() {
    const linksRefs = useRef<{ element: HTMLDivElement, isSubLink?: boolean, id: string, parent?: HTMLOListElement }[]>([])
    const [yValues, setYValues] = useState<number[]>([]);
    const [heightValues, setHeightValues] = useState<number[]>([]);

    const [clipPathBounds, setClipPathBounds] = useState({ top: 0, bottom: 0 });

    const visibleSectionsIds = useVisibleSections(sectionIds)
    useEffect(() => {
        console.log(visibleSectionsIds)
        if (visibleSectionsIds.length && linksRefs.current?.length > 0) {
            const topElement = linksRefs.current.filter(link => link.id.indexOf(visibleSectionsIds[0]) > -1)[0]
            const parentOffset = topElement.parent ? topElement.parent.offsetTop : 0
            const top = topElement.element.offsetTop + parentOffset

            const bottomElement = linksRefs.current.filter(link => link.id.indexOf(visibleSectionsIds[visibleSectionsIds.length - 1]) > -1)[0]
            const bottomParentOffset = bottomElement.parent ? bottomElement.parent.offsetTop : 0
            const offsetHeight = !bottomElement.isSubLink ? bottomElement.element.offsetHeight : 0
            const bottom = bottomElement.element.offsetTop + offsetHeight + bottomElement.element.offsetHeight + bottomParentOffset
            setClipPathBounds({ top, bottom })
        }
    }, [visibleSectionsIds, linksRefs]);


    useEffect(() => {
        if (!linksRefs.current) return;

        const yValues_ = linksRefs.current.map(el => {
            const parentOffset = el.parent ? el.parent.offsetTop : 0
            return el.element.offsetTop + parentOffset
        })
        const heightValues_ = linksRefs.current.map(el => {
            return el.element.offsetHeight
        })
        setHeightValues(heightValues_)
        setYValues(yValues_)
    }, [linksRefs]);



    const onLinkClick = useCallback((id: string) => {
        const targetLink = linksRefs.current.find(link => link.id === id);
        if (targetLink) {
            const sectionId = id.substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            window.location.hash = id;
        }
    }, []);


    return (<div className="fixed bottom-0 right-0 top-0  w-56 overflow-y-auto py-16 " >
        <div className="relative">
            <div className="absolute z-[9] left-[11px] h-full ">
                {yValues.length && <ClerkDocumentationProgress
                    heightValues={heightValues}
                    clipPathTop={clipPathBounds.top}
                    clipPathBottom={clipPathBounds.bottom}
                    yValues={yValues}
                    xValues={generateXValues(sectionsLinks)}
                />}
            </div>

            <ol className="relative z-[10] pl-9 flex flex-col gap-[8px] ">
                {sectionsLinks.map((link) => (
                    <>
                        <div
                            ref={(el) => {
                                if (!linksRefs.current.filter(link => link.id === el?.id).length)
                                    linksRefs.current.push({ id: link.href, element: el as HTMLDivElement })
                            }}
                            onClick={() => {
                                onLinkClick(link.href)
                            }}
                        >
                            <SectionLink

                                title={link.title}
                                href={link.href}
                            />
                        </div>
                        {
                            link.subLinks && (
                                <ol className="relative pl-4  my-[4px] flex flex-col gap-[8px]">
                                    {link.subLinks.map((subLink, index) => (
                                        <div
                                            onClick={() => {
                                                onLinkClick(subLink.href)
                                            }}
                                            ref={(el) => {
                                                if (!linksRefs.current.filter(sl => sl.id === el?.id).length)
                                                    linksRefs.current.push({ element: el as HTMLDivElement, id: subLink.href, isSubLink: true, parent: el?.parentElement as HTMLOListElement })
                                            }}
                                        >
                                            <SectionLink
                                                title={subLink.title}
                                                href={subLink.href}
                                            />
                                        </div>
                                    ))}
                                </ol>
                            )
                        }
                    </>
                ))}
            </ol>

        </div>
    </div>);
}

export default ClerkDocumentationMap;