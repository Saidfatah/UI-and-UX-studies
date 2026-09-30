"use client"
import { useEffect, useRef } from 'react';
import styles from './header.module.scss'

function Header() {
    const containerRef = useRef<HTMLDivElement>(null);

    const previousScroll = useRef({
        y: 0,
        time: performance.now(),
    });

    useEffect(() => {
        const handleScroll = () => {
            const now = performance.now();
            const currentY = window.scrollY;

            const previous = previousScroll.current;

            const deltaY = currentY - previous.y;
            const deltaTime = now - previous.time;

            const velocity = deltaY / deltaTime;

            const container = containerRef.current;

            if (!container) return;

            // Fast upward scroll → show
            if (velocity < -0.8) {
                container.style.transition = "all 0.7s cubic-bezier(0.33, 1, 0.68, 1)";
                container.style.transform = "translateY(0)";
            }

            // Fast downward scroll → hide
            if (velocity > 0.8) {
                container.style.transition = "all 0.7s cubic-bezier(0.65, 0, 0.35, 1)";
                container.style.transform = "translateY(-100%)";
            }

            previousScroll.current = {
                y: currentY,
                time: now,
            };
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={styles.root}>
            <div
                className={styles.header__container}
                ref={containerRef}
            // style={{
            //     transform: "translateY(-100%)"
            // }}
            >
                <a className={styles.header__logo} href="https://grapheine.com/en/" aria-label="Homepage">
                    <svg viewBox="0 0 140 28" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M102.142 1L100.613 4.40164H102.188L105.314 1H102.142ZM110.95 6.79297H108.574V21.1159H110.95V6.79297ZM108.531 1H110.994V3.48001H108.531V1ZM52.2164 6.71317C50.9093 6.71317 48.467 7.9448 47.558 8.74075L47.5286 6.79696H45.2539V21.1115H47.6292V10.6343C48.7687 9.68332 50.9931 9.07589 52.2206 9.02562V6.70898L52.2164 6.71317ZM93.3629 12.0763V21.1166H90.9876V12.0763C90.9876 9.88531 90.1079 8.67882 88.4825 8.67882C86.857 8.67882 85.3573 9.56274 84.2932 11.1253V21.1166H81.918V1H84.2932V8.51125C85.5584 7.17908 87.167 6.50881 88.8595 6.50881C90.8745 6.52975 93.3629 7.51422 93.3629 12.0763ZM74.1987 6.49638C72.4015 6.49638 70.8682 7.11638 69.712 8.40247L69.645 6.798H67.3828V26.9104H69.7371L69.7455 19.9521C70.575 20.7271 72.213 21.4183 73.8677 21.4183C77.5333 21.4183 79.6362 18.6535 79.6362 13.8317C79.6362 9.0099 77.6548 6.49219 74.1987 6.49219V6.49638ZM73.6289 19.2944C71.4254 19.2944 70.3739 18.1466 69.7623 17.4721V10.6353C70.6713 9.35761 72.1962 8.5449 73.7127 8.5449C75.4135 8.5449 77.2275 9.93572 77.2275 13.8359C77.2275 17.359 75.9497 19.2986 73.6289 19.2986V19.2944ZM125.57 12.0715V21.1118H123.195V12.0715C123.195 9.88058 122.315 8.67409 120.689 8.67409C119.064 8.67409 117.564 9.55801 116.5 11.1206L116.479 21.1118H114.125V6.79314H116.391L116.429 8.65734C117.263 7.66868 118.926 6.48733 121.146 6.50408C124.799 6.54179 125.57 9.55383 125.57 12.0715ZM101.445 19.3151C99.6017 19.3151 98.2403 18.4982 98.2403 16.8476C98.2403 15.3688 99.2792 14.5813 100.138 14.5142H104.084V12.583H99.6143C99.1409 12.4448 98.4707 11.7913 98.4707 10.7607C98.4707 9.31962 99.6017 8.3938 101.529 8.3938C102.685 8.3938 103.577 8.69962 104.474 9.31962L105.731 7.64394C104.855 7.08258 103.326 6.49609 101.558 6.49609C98.1439 6.49609 96.1834 8.08799 96.1834 10.8612C96.1834 11.9463 96.6693 13.1025 97.4736 13.735C96.4724 14.3299 95.8398 15.528 95.8398 16.9105C95.8398 19.646 97.7292 21.4181 101.391 21.4181C103.339 21.4181 105.069 20.752 105.873 20.2493V18.1044C104.507 18.8124 102.836 19.3067 101.445 19.3067V19.3151ZM127.988 14.0914C127.988 9.19004 130.209 6.49219 134.234 6.49219L134.239 6.49638C138.172 6.49638 140.61 9.95666 139.865 14.724H130.405C130.514 17.602 131.943 19.2776 134.419 19.2776C135.814 19.2776 137.133 18.6618 138.281 17.5726L139.521 19.2693C138.185 20.7145 136.505 21.4183 134.377 21.4183C130.317 21.4183 127.988 18.9928 127.988 14.0914ZM134.234 8.45693C131.888 8.45693 130.519 10.0991 130.443 12.709H130.447H137.682C137.628 10.0614 136.371 8.45693 134.234 8.45693ZM40.0457 6.79772L39.9117 8.44408C39.0319 7.32975 37.7752 6.49609 35.8481 6.49609C32.0108 6.49609 30 9.65476 30 13.9236C30 18.1924 32.2747 21.1541 35.6638 21.1541C37.8548 21.1541 39.0906 20.1026 39.7902 19.2899V21.1499C39.7902 22.5868 39.2791 24.9998 35.8439 24.9998C34.6123 24.9998 33.7451 24.7066 32.8193 24.2248L31.3615 26.1142C32.5596 26.8682 34.0174 27.2243 35.9445 27.2243C39.7818 27.2243 42.1655 24.9119 42.1655 21.1918V6.79772H40.0457ZM39.7776 17.0948C39.166 18.2133 37.6453 18.9967 36.0827 18.9967C33.7745 18.9967 32.3962 17.0571 32.3962 13.8063C32.3962 11.3179 33.5524 8.64097 36.0827 8.64097C37.616 8.64097 38.8937 9.34894 39.7776 10.6895L39.7902 10.7104L39.7818 17.0948H39.7776ZM59.1969 6.48828C62.4686 6.48828 64.425 8.31059 64.425 11.3603L64.4208 11.3561V21.1086H62.3094L62.1838 19.1187C61.2663 20.6436 59.4859 21.4228 57.9359 21.4228C54.9532 21.4228 53.1016 19.789 53.1016 17.1582C53.1016 13.878 55.3595 12.4118 60.4285 12.4076H62.0455V10.9498C62.0455 9.37046 60.9647 8.38599 59.2094 8.38599C57.6008 8.38599 56.4445 8.90964 55.1375 10.0575L53.8514 8.29383C55.1794 7.11247 57.0269 6.48828 59.1969 6.48828ZM57.9359 19.4874C60.0682 19.4874 61.6015 18.1552 62.0497 17.3174H62.0455V14.2132H60.8181C57.119 14.2132 55.4685 15.1097 55.4685 17.1205C55.4685 18.7585 56.6373 19.4874 57.9359 19.4874Z" fill="#FFFFFF"></path>
                        <rect x="13.3359" y="4" width="9.42497" height="18.8593" transform="rotate(45 13.3359 4)" fill="#FFFFFF"></rect>
                        <rect width="9.42384" height="9.42384" transform="matrix(0.707022 0.707191 -0.707022 0.707191 6.67188 10.6641)" fill="#FF2B2B"></rect>
                    </svg>
                </a>

                <nav className={styles.navigation}>
                    <ul className={styles.navigation__list}>
                        <li className={styles.navigation__item}>
                            <a className={styles.navigation__link} href="https://grapheine.com/en/portfolio/">
                                Portfolio
                            </a>
                        </li>
                        <li className={styles.navigation__item}>
                            <a className={styles.navigation__link} href="https://grapheine.com/en/magazine/">
                                Magazine
                            </a>
                        </li>
                        <li className={styles.navigation__item}>
                            <a className={styles.navigation__link} href="https://grapheine.com/en/agency/">
                                Agency
                            </a>
                        </li>
                        <li className={styles.navigation__item}>
                            <a className={styles.navigation__link} href="https://grapheine.com/en/contact/">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
                <a className={styles.header__lang} href="https://grapheine.com/"> fr </a>
            </div>
        </header>
    );
}

export default Header;