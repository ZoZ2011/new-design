import { useEffect } from "react";
import { toast } from "sonner";

export const ScreenshotBlocker = () => {
  useEffect(() => {
    // Ultra-aggressive instant screenshot prevention
    const hideContentInstantly = () => {
      document.body.style.opacity = "0";
      document.body.style.backgroundColor = "#000000";
      document.body.style.visibility = "hidden";
      const root = document.getElementById("root");
      if (root) {
        root.style.opacity = "0";
        root.style.visibility = "hidden";
      }
    };

    const showContentDelayed = () => {
      setTimeout(() => {
        document.body.style.opacity = "1";
        document.body.style.backgroundColor = "";
        document.body.style.visibility = "visible";
        const root = document.getElementById("root");
        if (root) {
          root.style.opacity = "1";
          root.style.visibility = "visible";
        }
      }, 800);
    };

    const preventScreenshot = (e: KeyboardEvent) => {
      // Detect Windows Key press (before S is pressed)
      if (e.key === "Meta" || e.key === "OS" || e.metaKey || e.getModifierState?.("OS")) {
        hideContentInstantly();
        showContentDelayed();
      }

      // Block ALL screenshot shortcuts
      const isScreenshotAttempt = 
        e.key === "PrintScreen" ||
        e.key === "Print" ||
        // Windows Snipping Tool (Win + Shift + S) - detect any part of combo
        (e.key === "s" && e.shiftKey) ||
        (e.key === "S" && e.shiftKey) ||
        (e.shiftKey && e.metaKey) ||
        // Mac screenshots
        (e.shiftKey && e.metaKey && (e.key === "3" || e.key === "4" || e.key === "5")) ||
        (e.shiftKey && e.metaKey && (e.key === "#" || e.key === "$" || e.key === "%")) ||
        // Windows + PrtScn
        (e.key === "PrintScreen" && e.metaKey) ||
        // Block dev tools
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        e.key === "F12";

      if (isScreenshotAttempt) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        hideContentInstantly();
        toast.error("Screenshots are not allowed");
        showContentDelayed();
        return false;
      }
    };

    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Copying is not allowed");
    };

    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Right-click is disabled");
    };

    // Disable text selection
    const disableSelection = () => {
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
      (document.body.style as any).mozUserSelect = "none";
      (document.body.style as any).msUserSelect = "none";
    };

    // Instant visibility change detection (catches Snipping Tool opening)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Instant black screen - no delays
        document.body.style.opacity = "0";
        document.body.style.filter = "blur(100px)";
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#000000";
        document.body.style.visibility = "hidden";
        const root = document.getElementById("root");
        if (root) {
          root.style.display = "none";
        }
      } else {
        setTimeout(() => {
          document.body.style.opacity = "1";
          document.body.style.filter = "none";
          document.body.style.backgroundColor = "";
          document.body.style.color = "";
          document.body.style.visibility = "visible";
          const root = document.getElementById("root");
          if (root) {
            root.style.display = "";
          }
        }, 500);
      }
    };

    // Instant window blur detection (catches Snipping Tool)
    const handleBlur = () => {
      // Instant hide - zero delay
      document.body.style.opacity = "0";
      document.body.style.backgroundColor = "#000000";
      document.body.style.filter = "blur(100px)";
      document.body.style.visibility = "hidden";
      const root = document.getElementById("root");
      if (root) {
        root.style.display = "none";
      }
    };

    const handleFocus = () => {
      setTimeout(() => {
        document.body.style.opacity = "1";
        document.body.style.backgroundColor = "";
        document.body.style.filter = "none";
        document.body.style.visibility = "visible";
        const root = document.getElementById("root");
        if (root) {
          root.style.display = "";
        }
      }, 500);
    };

    // Mobile-specific touch protection
    const preventTouchScreenshot = (e: TouchEvent) => {
      // Detect multi-touch gestures (common in mobile screenshots)
      if (e.touches.length >= 2) {
        document.body.style.opacity = "0";
        document.body.style.backgroundColor = "#000000";
        setTimeout(() => {
          document.body.style.opacity = "1";
          document.body.style.backgroundColor = "";
        }, 500);
      }
    };

    // Detect long press (Android screenshot method)
    let longPressTimer: NodeJS.Timeout;
    const handleTouchStart = () => {
      longPressTimer = setTimeout(() => {
        document.body.style.opacity = "0";
        document.body.style.backgroundColor = "#000000";
      }, 800);
    };

    const handleTouchEnd = () => {
      clearTimeout(longPressTimer);
      setTimeout(() => {
        document.body.style.opacity = "1";
        document.body.style.backgroundColor = "";
      }, 100);
    };

    // Add event listeners
    document.addEventListener("keydown", preventScreenshot, true);
    document.addEventListener("keyup", preventScreenshot, true);
    document.addEventListener("copy", preventCopy, true);
    document.addEventListener("cut", preventCopy, true);
    document.addEventListener("contextmenu", preventContextMenu, true);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("touchstart", preventTouchScreenshot, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    disableSelection();

    // Add comprehensive CSS protection
    const style = document.createElement("style");
    style.id = "screenshot-blocker";
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      /* Mobile-specific protection */
      @media (max-width: 768px) {
        * {
          -webkit-user-drag: none !important;
          -webkit-user-modify: none !important;
          pointer-events: auto !important;
        }
      }
      
      /* Block printing */
      @media print {
        * {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
        body, html {
          background: #000 !important;
          color: #000 !important;
        }
        body::before {
          content: 'PROTECTED CONTENT' !important;
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          font-size: 48px !important;
          color: #000 !important;
          z-index: 999999 !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      }
      
      /* Invisible watermark overlay */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 999999;
        background: transparent;
        mix-blend-mode: difference;
      }
      
      /* Additional protection layer */
      body::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        pointer-events: none;
        z-index: 999998;
      }
      
      /* Prevent canvas/image capture on mobile */
      img, canvas, video {
        -webkit-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    // Add meta tags for mobile screenshot prevention
    const metaViewport = document.createElement("meta");
    metaViewport.name = "screenshot";
    metaViewport.content = "disabled";
    document.head.appendChild(metaViewport);

    // Disable drag and drop
    const preventDrag = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener("dragstart", preventDrag, true);
    document.addEventListener("drop", preventDrag, true);

    // Monitor for screenshot tools
    let screenshotDetected = false;
    const detectScreenshotTools = () => {
      const beforePrint = () => {
        screenshotDetected = true;
        document.body.style.opacity = "0";
        document.body.style.backgroundColor = "#000000";
      };
      
      window.addEventListener("beforeprint", beforePrint);
      
      return () => {
        window.removeEventListener("beforeprint", beforePrint);
      };
    };
    
    const cleanupScreenshotDetection = detectScreenshotTools();

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", preventScreenshot, true);
      document.removeEventListener("keyup", preventScreenshot, true);
      document.removeEventListener("copy", preventCopy, true);
      document.removeEventListener("cut", preventCopy, true);
      document.removeEventListener("contextmenu", preventContextMenu, true);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("dragstart", preventDrag, true);
      document.removeEventListener("drop", preventDrag, true);
      document.removeEventListener("touchstart", preventTouchScreenshot);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      
      clearTimeout(longPressTimer);
      
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      (document.body.style as any).mozUserSelect = "";
      (document.body.style as any).msUserSelect = "";
      document.body.style.opacity = "";
      document.body.style.filter = "";
      document.body.style.backgroundColor = "";
      
      const styleElement = document.getElementById("screenshot-blocker");
      if (styleElement) {
        styleElement.remove();
      }
      
      cleanupScreenshotDetection();
    };
  }, []);

  return null;
};
