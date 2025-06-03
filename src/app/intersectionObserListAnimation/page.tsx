"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const listRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.style.setProperty("--shown", entry.isIntersecting ? "1" : "0");
        });
      },
      { threshold: 0.1 } // Low threshold for early activation
    );

    listRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <ul className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <li
            key={i}
            ref={(el) => el && (listRef.current[i] = el)}
            className="w-64 p-4 text-center bg-gray-700 rounded-xl transition-transform duration-500"
            style={{
              scale: "calc(0.25 + (var(--shown, 1) * 0.75))",
              opacity: "calc(var(--shown, 1))",
            }}
          >
            Item {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
