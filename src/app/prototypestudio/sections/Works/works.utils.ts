import { WorkItem } from "./types";


export const initialStates = {
    firstWorkItemInner:{
        yPercent: 50,
        scale: 0.9,
    },
    secondWorkItemInner:{
        yPercent: 20,
        scale: 0.95,
    },
    thirdWorkItemInner:{
        yPercent: 7,
        scale: 0.97,
    },
};
export const targetStates = {
    firstWorkItemInner:{
        yPercent: 0,
        scale: 1,
    },
    secondWorkItemInner:{
        yPercent: 0,
        scale: 1,
    },
    thirdWorkItemInner:{
        yPercent: 0,
        scale: 1,
    },
};


export const workItems: WorkItem[] = [
    {
        imageSrc: "https://www.prototypestudio.fr/wp-content/uploads/2025/02/img_principale-1-480x270.jpg",
        imageAspectRatio: "56.171875%",
        imgAlt: "Valentine's Day",
        videoSrc: "https://www.prototypestudio.fr/wp-content/uploads/2025/02/Boucle_MJ_compressed.mp4",
        href: "https://www.prototypestudio.fr/work/valentines-day-marc-jacobs/",
        title: "Valentine's Day",
        category: "Fashion",
        client: "Marc Jacobs"
    },
    {
        imageSrc: "https://www.prototypestudio.fr/wp-content/uploads/2026/01/STILLS_D1_22_clean-480x270.jpg",
        imageAspectRatio: "56.25%",
        imgAlt: "Spring Evergreen",
        videoSrc: "https://www.prototypestudio.fr/wp-content/uploads/2026/01/BB_SPRING_LOOP_2026-01-25_Personnalise.mp4",
        href: "https://www.prototypestudio.fr/work/bb-spring-evergreen/",
        title: "Spring Evergreen",
        category: "Commercials",
        client: "Boll & Branc"
    },
    {
        imageSrc: "/images/prototypestudio/img_principale-1920x1126.webp",
        imageAspectRatio: "58.671875%",
        imgAlt: "TVC 100 ans",
        videoSrc: "/videos/prototypestudio/Boucle_Linvosges_compressed.mp4",
        href: "https://www.prototypestudio.fr/work/tvc-100-ans-linvosges/",
        title: "TVC 100 ans",
        category: "Commercials",
        client: "Linvosges"
    },
    {
        imageSrc: "/images/prototypestudio/riviera_cover-480x270.webp",
        imageAspectRatio: "56.2109375%",
        imgAlt: "Malmaison Riviera",
        videoSrc: "/videos/prototypestudio/loop_riviera.mp4",
        href: "https://www.prototypestudio.fr/work/malmaison-riviera/",
        title: "Malmaison Riviera",
        category: "Luxury",
        client: "Christofle"
    },
    {
        imageSrc: "/images/prototypestudio/img_principale-480x269.webp",
        imageAspectRatio: "56.1328125%",
        imgAlt: "The Light You Feel",
        videoSrc: "/videos/prototypestudio/Boucle_Lutron_compressed.mp4",
        href: "https://www.prototypestudio.fr/work/the-light-you-feel-lutron/",
        title: "The Light You Feel",
        category: "Commercials",
        client: "Lutron"
    },
    {
        imageSrc: "/images/prototypestudio/Beau_main2-480x270.webp",
        imageAspectRatio: "56.25%",
        imgAlt: "Parco x Miu Miu",
        videoSrc: "/videos/prototypestudio/Boucle_Beaumag.mp4",
        href: "https://www.prototypestudio.fr/work/edito-beau-magazine-x-miumiu/",
        title: "Parco x Miu Miu",
        category: "Fashion",
        client: "Beau Magazine"
    },
    {
        imageSrc: "/images/prototypestudio/img_principale-480x270.webp",
        imageAspectRatio: "56.328125%",
        imgAlt: "Abyssae",
        videoSrc: "/videos/prototypestudio/Boucle_Abyssae_compressed.mp4",
        href: "https://www.prototypestudio.fr/work/abyssae-lartisan-parfumeur/",
        title: "Abyssae",
        category: "Cosmetics",
        client: "L’artisan parfumeur"
    },
    {
        imageSrc: "/images/prototypestudio/Capture-decran-2026-01-25-a-15.55.17-480x269.webp",
        imageAspectRatio: "55.9375%",
        imgAlt: "Boredom on Set",
        videoSrc: "/videos/prototypestudio/carton_olivia_loop.mp4",
        href: "https://www.prototypestudio.fr/work/boredom-on-set/",
        title: "Boredom on Set",
        category: "Cosmetics",
        client: "Carton Magazine"
    },
    {
        imageSrc: "/images/prototypestudio/img_principale-2-480x270.webp",
        imageAspectRatio: "56.328125%",
        imgAlt: "Home Collection",
        videoSrc: "/videos/prototypestudio/Boucle_Hermes_compressed.mp4",
        href: "https://www.prototypestudio.fr/work/home-collection-hermes/",
        title: "Home Collection",
        category: "Luxury",
        client: "Hermes"
    },
    {
        imageSrc: "/images/prototypestudio/Copie-de-LV_Image1-480x269.webp",
        imageAspectRatio: "56.1328125%",
        imgAlt: "Dualtime",
        videoSrc: "/videos/prototypestudio/Boucle_LV_compressed.mp4",
        href: "https://www.prototypestudio.fr/work/dualtime-louis-vuitton/",
        title: "Dualtime",
        category: "Luxury",
        client: "Louis Vuitton"
    },
    {
        imageSrc: "/images/prototypestudio/Pusspuss_vignetteprincipale-480x270.webp",
        imageAspectRatio: "56.25%",
        imgAlt: "Nothing is static",
        videoSrc: "/videos/prototypestudio/Boucle_pusspuss_compressed.mp4",
        href: "https://www.prototypestudio.fr/work/nothing-is-static-pusspuss-magazine/",
        title: "Nothing is static",
        category: "Fashion",
        client: "Pusspuss Magazine"
    },

]
