import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
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
        >
          <h1 style={{ textDecoration: "underline" }}>
            Visit the tutorial
          </h1>
        </a>
      </div>
    </div>
    <script>
      const titles = ["Welcome!", "pls be rich", "i need money", "cool code", "right?", ":p"];
      const typingSpeed = 300; // ms per character
      const deletingSpeed = 200; // ms per character
      const pauseAfterTyping = 1000;
      const pauseAfterDeleting = 500;
      
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      async function typeWriter() {
        while (true) {
          for (let title of titles) {
            // Type letters
            for (let i = 0; i <= title.length; i++) {
              document.title = title.slice(0, i) + "|";
              await sleep(typingSpeed);
            }
            await sleep(pauseAfterTyping);
      
            // Delete letters
            for (let i = title.length; i >= 0; i--) {
              document.title = title.slice(0, i) + "|";
              await sleep(deletingSpeed);
            }
            await sleep(pauseAfterDeleting);
          }
        }
      }
      
      typeWriter();
    </script>
  )
}

export default Hero
