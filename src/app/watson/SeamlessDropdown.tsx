"use client"
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { usePathname } from 'next/navigation'
import "./watson.dropdown.style.css"
import TextSlideReveal from "./TextSlideReveal";

const items = [
    "digital",
    "strategy",
    "social",
    "av",
    "production",
    "design",
    "writing",
]

const PutActiveLinkOnTopOfList = (item: string, items: string[]) => {
    const prevTemp = [...items]
    const indexOfItem = items.indexOf(item)

    if (indexOfItem > -1) {
        prevTemp.splice(indexOfItem, 1)
    }

    return [item, ...prevTemp]
}

const formatText = (text: string) => {
    return text === 'av' ? "AV" : text.charAt(0).toUpperCase() + text.substring(1, text.length)
}
function SeamlessDropdown() {
    const pathname = usePathname()
    const pathnameSplit = pathname.split('/');
    const itemFromUrl = pathnameSplit[pathnameSplit.length - 1]
    console.log({ itemFromUrl })

    const [orderedItems, setOrderedItems] = useState<string[]>([]);

    const backDropRef = useRef<HTMLDivElement>(null)
    const dropdownItemsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Set orderedItems based on the item from the URL only on the first load
        if (itemFromUrl) {
            setOrderedItems(PutActiveLinkOnTopOfList(itemFromUrl, items));
        } else {
            setOrderedItems(items);
        }
    }, [itemFromUrl]);

    const onClick = (item: string) => () => {
        setOrderedItems(PutActiveLinkOnTopOfList(item, orderedItems));
    }

    return (
        <div>
            <TextSlideReveal className="selectedItem" key="selected" text={orderedItems.length > 0 ? formatText(orderedItems[0]) : ""} />
            <div
                onMouseOver={() => {
                    backDropRef.current?.classList.remove('dropDownItemsBackDropScaleOutFadeOutAnimation')
                    backDropRef.current?.classList.add('dropDownItemsBackDropScaleInFadeInAnimation')
                }}
                onMouseLeave={() => {
                    backDropRef.current?.classList.remove('dropDownItemsBackDropScaleInFadeInAnimation')
                    backDropRef.current?.classList.add('dropDownItemsBackDropScaleOutFadeOutAnimation')
                }}
                className="dropDownItemsContainer"
            >
                <ul ref={dropdownItemsRef as any} className="dropDownItems">
                    {orderedItems.map(item => (
                        <li key={item}>
                            <Link
                                href={`/watson/${item.toLowerCase()}`} onClick={onClick(item)}
                            >
                                <TextSlideReveal
                                    text={formatText(item)}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
                <div ref={backDropRef as any} className="dropDownItemsBackDrop" />
            </div>
        </div>
    );
}

export default SeamlessDropdown;
