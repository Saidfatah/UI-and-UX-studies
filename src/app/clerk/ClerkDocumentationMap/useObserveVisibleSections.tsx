import { useEffect, useRef, useCallback, useState } from 'react';
import { sectionIds } from './utils';

// Custom hook to observe visible sections
function useObserveVisibleSections(
  sectionsLinks: { href: string; title: string; subLinks?: { href: string; title: string }[] }[],
  linksRefs: React.MutableRefObject<{ element: HTMLDivElement; id: string; parent?: HTMLOListElement }[]>
) {
  const [lastVisibleLinkTop, setLastVisibleLinkTop] = useState<number | undefined>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .map(entry => ({
            id: entry.target.id,
            top: entry.target.getBoundingClientRect().top
          }))
          .sort((a, b) => b.top - a.top);

        if (visibleSections.length > 0) {
          const lastVisibleSectionId = visibleSections[0].id;
          const correspondingLink = linksRefs.current.find(
            ref => ref.id === `#${lastVisibleSectionId}`
          );

          if (correspondingLink) {
            const parentOffset = correspondingLink.parent ? correspondingLink.parent.offsetTop : 0;
            const topPosition = correspondingLink.element.offsetTop + parentOffset;
            setLastVisibleLinkTop(topPosition);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [sectionsLinks, linksRefs]);

  return lastVisibleLinkTop;
}


export default useObserveVisibleSections;