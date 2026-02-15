"use client" // <- must be at the very top

import { useEffect, useState } from "react"
import { Heading } from "@medusajs/ui"

const Hero = () => {
  const [titleText, setTitleText] = useState(""); // text without cursor
  const [showCursor, setShowCursor] = useState(true); // cursor visibility

  useEffect(() => {
    const titles = ["Welcome!", "pls be rich", "i need money", "cool code", "right?", ":p"];
    const typingSpeed = 200; // ms per character
    const deletingSpeed = 100; // ms per character
    const pauseAfterTyping = 1500;
    const pauseAfterDeleting = 0;
    const blinkSpeed = 500; // ms for blinking cursor

    let active = true;

    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Cursor blinking independent of typing
    const blinkInterval = setInterval(() => {
      if (!active) return;
      setShowCursor(prev => !prev);
    }, blinkSpeed);

    async function typeWriter() {
      while (active) {
        for (const title of titles) {
          // Type letters
          for (let i = 0; i <= title.length; i++) {
            if (!active) return;
            setTitleText(title.slice(0, i));
            await sleep(typingSpeed);
          }
          await sleep(pauseAfterTyping);

          // Delete letters
          for (let i = title.length; i >= 0; i--) {
            if (!active) return;
            setTitleText(title.slice(0, i));
            await sleep(deletingSpeed);
          }
          await sleep(pauseAfterDeleting);
        }
      }
    }

    typeWriter();

    return () => {
      active = false;
      clearInterval(blinkInterval);
    }
  }, []);

  // Update document.title with blinking cursor
  useEffect(() => {
    document.title = titleText + (showCursor ? "|" : "");
  }, [titleText, showCursor]);

  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-ui-fg-base font-normal"
          >
            Well done! You have successfully changed things AGAIN!
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-ui-fg-subtle font-normal"
          >
            Need help!!!?
          </Heading>
        </span>
        <a
          href="https://funkyton.com/medusajs-2-0-is-finally-here/"
          target="_blank"
          rel="noreferrer"
        >
          <h1 style={{ textDecoration: "underline" }}>
            Visit the tutorial
          </h1>
        </a>
      </div>
    </div>
  )
}

export default Hero
