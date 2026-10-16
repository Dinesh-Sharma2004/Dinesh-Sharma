import { TextSplitter } from "../../utils/textSplitter";
import gsap from "gsap";
import { lenis } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  if (lenis) {
    lenis.start();
  }
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const selectors = [".landing-info h3", ".landing-intro h2", ".landing-intro h1"];
  const elements = selectors.flatMap(selector => Array.from(document.querySelectorAll(selector)));
  const landingText = new TextSplitter(elements, {
    type: "chars,lines",
    linesClass: "split-line",
  });
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const landingText2 = new TextSplitter(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingText3 = new TextSplitter(".landing-h2-info-1", TextProps);
  const landingText4 = new TextSplitter(".landing-h2-1", TextProps);
  const landingText5 = new TextSplitter(".landing-h2-2", TextProps);

  // Rotate each role with an alternate: AI Engineer <-> ML Engineer and
  // Data Scientist <-> Backend Dev. Starts after the intro has settled.
  swapRoles(landingText4, landingText5, 4.5);
  swapRoles(landingText2, landingText3, 5.1);
}

/**
 * Clean slide-swap between two split texts: `first` shows, then `second` takes
 * over, and so on. Every tween has explicit start/end values, so the loop is
 * deterministic (no repeating-timeline rewind surprises).
 */
function swapRoles(first: TextSplitter, second: TextSplitter, startDelay: number) {
  if (first.chars.length === 0 || second.chars.length === 0) return;
  const hide = 80;
  const ease = "power3.inOut";
  let showingFirst = true;
  gsap.set(second.chars, { y: hide, opacity: 1 });

  const run = () => {
    const out = showingFirst ? first.chars : second.chars;
    const inn = showingFirst ? second.chars : first.chars;
    // stop quietly if React re-rendered / replaced the elements
    if (!out[0]?.isConnected) return;
    gsap.fromTo(out, { y: 0 }, { y: -hide, duration: 0.8, ease, stagger: 0.03, overwrite: true });
    gsap.fromTo(inn, { y: hide }, { y: 0, duration: 0.8, ease, stagger: 0.03, overwrite: true });
    showingFirst = !showingFirst;
    gsap.delayedCall(3.4, run);
  };
  gsap.delayedCall(startDelay, run);
}
