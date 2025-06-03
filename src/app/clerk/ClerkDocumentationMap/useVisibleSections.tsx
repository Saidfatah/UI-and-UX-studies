import { useEffect, useState } from "react";

const useVisibleSections = (sectionIds: string[], threshold = 0.2) => {
    const [visibleSections, setVisibleSections] = useState<string[]>([]);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                setVisibleSections((prevSections) => {
                    const visibleSet = new Set(prevSections);

                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            visibleSet.add(entry.target.id);
                        } else {
                            visibleSet.delete(entry.target.id);
                        }
                    });

                    // Maintain order based on sectionIds
                    const orderedVisibleSections = sectionIds.filter((id) => visibleSet.has(id));

                    return orderedVisibleSections;
                });
            },
            { root: null, threshold }
        );

        const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
        elements.forEach((el) => observer.observe(el!));

        return () => {
            observer.disconnect();
        };
    }, [sectionIds, threshold]);

    return visibleSections;
};

export default useVisibleSections;
