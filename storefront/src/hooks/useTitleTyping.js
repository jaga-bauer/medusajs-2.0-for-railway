import { useEffect } from "react";

const titles = ["Welcome!", "pls be rich", "i need money", "cool code", "right?", ":p"];
const typingSpeed = 300;      // ms per character
const deletingSpeed = 200;    // ms per character
const pauseAfterTyping = 1000; // ms after full title
const pauseAfterDeleting = 500; // ms before next title

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function useTitleTyping() {
  useEffect(() => {
    let isMounted = true;

    async function typeWriter() {
      while (isMounted) {
        for (let title of titles) {
          // Type letters
          for (let i = 0; i <= title.length; i++) {
            if (!isMounted) return;
            document.title = title.slice(0, i) + "|";
            await sleep(typingSpeed);
          }

          await sleep(pauseAfterTyping);

          // Delete letters
          for (let i = title.length; i >= 0; i--) {
            if (!isMounted) return;
            document.title = title.slice(0, i) + (i > 0 ? "|" : "");
            await sleep(deletingSpeed);
          }

          await sleep(pauseAfterDeleting);
        }
      }
    }

    typeWriter();

    return () => {
      isMounted = false; // stops loop on unmount
    };
  }, []);
}
