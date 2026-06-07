import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [hoverState, setHoverState] = useState<"none" | "interactive" | "image">("none");
  const [opacity, setOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [isInFooter, setIsInFooter] = useState(false);

  const trailRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Detect mobile / touch devices
    const touchQuery = window.matchMedia ? window.matchMedia("(pointer: coarse)") : null;
    setIsMobile(touchQuery ? touchQuery.matches : true);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    if (touchQuery) {
      if (typeof touchQuery.addEventListener === "function") {
        touchQuery.addEventListener("change", handleMediaChange);
      } else if (typeof (touchQuery as any).addListener === "function") {
        (touchQuery as any).addListener(handleMediaChange);
      }
    }

    return () => {
      if (touchQuery) {
        if (typeof touchQuery.removeEventListener === "function") {
          touchQuery.removeEventListener("change", handleMediaChange);
        } else if (typeof (touchQuery as any).removeListener === "function") {
          (touchQuery as any).removeListener(handleMediaChange);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    // Set utility body class to let CSS hide the default pointer safely
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);

      // Check current hover target
      const target = e.target as HTMLElement | null;
      if (target) {
        // Detect image hover or parents indicating design gallery grid
        const isImage = target.closest("img") || target.closest("[data-cursor='view']");
        const isLinkOrBtn = 
          target.closest("a") || 
          target.closest("button") || 
          target.closest(".project-row") || 
          target.closest('[role="button"]') ||
          target.closest('input') ||
          target.closest('textarea');

        if (isImage) {
          setHoverState("image");
        } else if (isLinkOrBtn) {
          setHoverState("interactive");
        } else {
          setHoverState("none");
        }

        // Adjust cursor colors for contrast inside the dark footer
        const isFooter = !!target.closest("#footer-section");
        setIsInFooter((prev) => (prev !== isFooter ? isFooter : prev));
      }
    };

    const onMouseLeave = () => {
      setOpacity(0);
    };

    const onMouseEnter = () => {
      setOpacity(1);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Easing loop for the lagging trailing ring via requestAnimationFrame
    let animId = 0;
    const updateTrail = () => {
      const easeFactor = 0.12; // Easing lag factor
      const dx = mouseRef.current.x - trailRef.current.x;
      const dy = mouseRef.current.y - trailRef.current.y;

      trailRef.current.x += dx * easeFactor;
      trailRef.current.y += dy * easeFactor;

      setTrailPosition({ x: trailRef.current.x, y: trailRef.current.y });
      animId = requestAnimationFrame(updateTrail);
    };

    animId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isMobile]);

  if (isMobile || opacity === 0) return null;

  // Custom Cursor rendering sizes and states based on hovers
  let ringStyle = "";
  let ringChildren = null;

  if (hoverState === "interactive") {
    // Ring expands to 56px, filled with translucent accent color, borderless/or matching outline
    const ringBg = isInFooter ? "bg-accent/20" : "bg-[rgba(255,77,0,0.12)]";
    const ringBorder = isInFooter ? "border-accent/60" : "border-[rgba(255,77,0,0.3)]";
    ringStyle = `w-[56px] h-[56px] ${ringBg} ${ringBorder} -translate-x-[28px] -translate-y-[28px]`;
  } else if (hoverState === "image") {
    // Ring expands to 80px, displays 'VIEW' in 10px uppercase capsule typography, border turns electric orange
    ringStyle = "w-[80px] h-[80px] bg-black/60 border-accent -translate-x-[40px] -translate-y-[40px] flex items-center justify-center";
    ringChildren = (
      <span className="text-[10px] font-sans font-semibold text-white tracking-widest pointer-events-none">
        VIEW
      </span>
    );
  } else {
    // Default ring size 36px, solid primary charcoal/cream border, transparent center
    ringStyle = `w-[36px] h-[36px] ${isInFooter ? "border-accent" : "border-primary"} -translate-x-[18px] -translate-y-[18px]`;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* 1. Inner fine dot layer: follows exact cursor layout without lag */}
      {hoverState !== "interactive" && (
        <div
          className={`absolute w-[10px] h-[10px] ${isInFooter ? "bg-bg-cream" : "bg-primary"} rounded-full transition-transform duration-150 ease-out -translate-x-[5px] -translate-y-[5px]`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          id="custom-cursor-dot"
        />
      )}

      {/* 2. Trailing ring layer: follows cursor coordinates via linear interpolation (lerp) */}
      <div
        className={`absolute rounded-full border-[1.5px] pointer-events-none duration-300 ease-out transition-[width,height,background-color,border-color] ${ringStyle}`}
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
        }}
        id="custom-cursor-ring"
      >
        {ringChildren}
      </div>
    </div>
  );
}
