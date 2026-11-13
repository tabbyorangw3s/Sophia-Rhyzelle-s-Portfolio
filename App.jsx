import { useEffect, useState } from "react";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import FeaturedProjects from "./components/FeaturedProjects";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LearningNotebook from "./components/LearningNotebook";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import WhatIDo from "./components/WhatIDo";

const ambientSparkles = [
  { left: "12%", top: "3%", tone: "yellow", size: 28, duration: "4.8s", delay: "-1.2s" },
  { left: "92%", top: "7%", tone: "blue", size: 38, duration: "5.7s", delay: "-3s" },
  { left: "27%", top: "11%", tone: "pink", size: 20, duration: "4.3s", delay: "-2s" },
  { left: "79%", top: "16%", tone: "yellow", size: 32, duration: "6.2s", delay: "-4s" },
  { left: "6%", top: "21%", tone: "blue", size: 35, duration: "5s", delay: "-2.6s" },
  { left: "94%", top: "26%", tone: "pink", size: 23, duration: "5.4s", delay: "-3.5s" },
  { left: "34%", top: "30%", tone: "yellow", size: 31, duration: "6.4s", delay: "-1.8s" },
  { left: "86%", top: "36%", tone: "pink", size: 37, duration: "4.9s", delay: "-2.8s" },
  { left: "10%", top: "41%", tone: "blue", size: 25, duration: "5.8s", delay: "-4.1s" },
  { left: "73%", top: "46%", tone: "pink", size: 36, duration: "6.1s", delay: "-1.5s" },
  { left: "3%", top: "51%", tone: "yellow", size: 26, duration: "4.6s", delay: "-3.2s" },
  { left: "91%", top: "56%", tone: "blue", size: 33, duration: "5.5s", delay: "-2.2s" },
  { left: "24%", top: "61%", tone: "pink", size: 22, duration: "6.3s", delay: "-4.4s" },
  { left: "96%", top: "66%", tone: "yellow", size: 35, duration: "5.1s", delay: "-1.9s" },
  { left: "8%", top: "71%", tone: "pink", size: 30, duration: "4.7s", delay: "-3.6s" },
  { left: "83%", top: "76%", tone: "yellow", size: 22, duration: "6.5s", delay: "-2.4s" },
  { left: "37%", top: "81%", tone: "blue", size: 36, duration: "5.2s", delay: "-4.6s" },
  { left: "93%", top: "86%", tone: "pink", size: 26, duration: "5.9s", delay: "-1.7s" },
  { left: "14%", top: "91%", tone: "blue", size: 23, duration: "4.5s", delay: "-3.8s" },
  { left: "82%", top: "96%", tone: "yellow", size: 36, duration: "6.6s", delay: "-2.7s" },
];

const themeStorageKey = "sophia-portfolio-theme";

export default function App() {
  const [theme, setTheme] = useState(() =>
    window.localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const revealTargets = document.querySelectorAll(
      ".frame main > section, .frame .project-card, .frame .note",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -24px 0px" },
    );

    revealTargets.forEach((target, index) => {
      target.classList.add("scroll-reveal");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      revealTargets.forEach((target) => {
        target.classList.remove("scroll-reveal", "is-visible");
        target.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return (
    <div className="page" data-theme={theme}>
      <div className="ambient-sparkles" aria-hidden="true">
        {ambientSparkles.map((sparkle, index) => (
          <svg
            key={index}
            className={`ambient-sparkle sparkle-${sparkle.tone}`}
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 64 64"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDuration: sparkle.duration,
              animationDelay: sparkle.delay,
            }}
            aria-hidden="true"
          >
            <path d="M32 2 C36 23 41 28 62 32 C41 36 36 41 32 62 C28 41 23 36 2 32 C23 28 28 23 32 2Z" />
          </svg>
        ))}
      </div>
      <div className="frame">
        <Navbar
          theme={theme}
          onToggleTheme={() =>
            setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
          }
        />
        <main>
          <Hero />
          <WhatIDo />
          <FeaturedProjects />
          <Achievements />
          <Education />
          <Experience />
          <Skills />
          <LearningNotebook />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
