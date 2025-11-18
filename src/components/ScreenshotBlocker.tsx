import { useEffect } from "react";
import { toast } from "sonner";

export const ScreenshotBlocker = () => {
  useEffect(() => {
    // EXTREME mobile screenshot prevention
    let isHiding = false;
    
    const hideEverythingInstantly = () => {
      if (isHiding) return;
      isHiding = true;
      
      document.body.style.opacity = "0";
      document.body.style.backgroundColor = "#000000";
      document.body.style.visibility = "hidden";
      document.documentElement.style.backgroundColor = "#000000";
      document.documentElement.style.opacity = "0";
      
      const root = document.getElementById("root");
      if (root) {
        root.style.display = "none";
      }
      
      // Hide all elements
      const allElements = document.querySelectorAll("*");
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.visibility = "hidden";
          el.style.opacity = "0";
        }
      });
    };

    const showContentDelayed = () => {
      setTimeout(() => {
        isHiding = false;
        document.body.style.opacity = "1";
        document.body.style.backgroundColor = "";
        document.body.style.visibility = "visible";
        document.documentElement.style.backgroundColor = "";
        document.documentElement.style.opacity = "1";
        
        const root = document.getElementById("root");
        if (root) {
          root.style.display = "";
        }
        
        const allElements = document.querySelectorAll("*");
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.visibility = "";
            el.style.opacity = "";
          }
        });
      }, 1000);
    };

    const preventScreenshot = (e: KeyboardEvent) => {
      // Detect Windows Key press (before S is pressed)
      if (e.key === "Meta" || e.key === "OS" || e.metaKey || e.getModifierState?.("OS")) {
        hideEverythingInstantly();
        showContentDelayed();
      }

      // Block ALL screenshot shortcuts
      const isScreenshotAttempt = 
        e.key === "PrintScreen" ||
        e.key === "Print" ||
        (e.key === "s" && e.shiftKey) ||
        (e.key === "S" && e.shiftKey) ||
        (e.shiftKey && e.metaKey) ||
        (e.shiftKey && e.metaKey && (e.key === "3" || e.key === "4" || e.key === "5")) ||
        (e.shiftKey && e.metaKey && (e.key === "#" || e.key === "$" || e.key === "%")) ||
        (e.key === "PrintScreen" && e.metaKey) ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        e.key === "F12";

      if (isScreenshotAttempt) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        hideEverythingInstantly();
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

    // EXTREME visibility change detection (mobile screenshot detection)
    const handleVisibilityChange = () => {
      hideEverythingInstantly();
      showContentDelayed();
    };

    // EXTREME window blur (catches ALL screenshot tools on mobile)
    const handleBlur = () => {
      hideEverythingInstantly();
      showContentDelayed();
    };

    const handleFocus = () => {
      showContentDelayed();
    };

    // EXTREME mobile screenshot detection - monitor page lifecycle
    const handlePageHide = () => {
      hideEverythingInstantly();
    };

    const handlePageShow = () => {
      showContentDelayed();
    };

    // Detect screenshot via freeze/resume (mobile specific)
    const handleFreeze = () => {
      hideEverythingInstantly();
    };

    const handleResume = () => {
      showContentDelayed();
    };

    // EXTREME mobile touch detection
    const preventTouchScreenshot = (e: TouchEvent) => {
      if (e.touches.length >= 2) {
        hideEverythingInstantly();
        showContentDelayed();
      }
    };

    let longPressTimer: NodeJS.Timeout;
    const handleTouchStart = () => {
      longPressTimer = setTimeout(() => {
        hideEverythingInstantly();
        showContentDelayed();
      }, 500);
    };

    const handleTouchEnd = () => {
      clearTimeout(longPressTimer);
    };

    // Add ALL event listeners with maximum aggression
    document.addEventListener("keydown", preventScreenshot, true);
    document.addEventListener("keyup", preventScreenshot, true);
    document.addEventListener("copy", preventCopy, true);
    document.addEventListener("cut", preventCopy, true);
    document.addEventListener("contextmenu", preventContextMenu, true);
    
    // Visibility and blur - EXTREME
    document.addEventListener("visibilitychange", handleVisibilityChange, true);
    window.addEventListener("blur", handleBlur, true);
    window.addEventListener("focus", handleFocus, true);
    window.addEventListener("pagehide", handlePageHide, true);
    window.addEventListener("pageshow", handlePageShow, true);
    document.addEventListener("freeze", handleFreeze as any, true);
    document.addEventListener("resume", handleResume as any, true);
    
    // Mobile touch - EXTREME
    document.addEventListener("touchstart", preventTouchScreenshot, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    
    disableSelection();

    // EXTREME CSS protection for mobile
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
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }
      
      /* EXTREME mobile protection */
      @media (max-width: 768px) {
        * {
          -webkit-user-drag: none !important;
          -webkit-user-modify: none !important;
          pointer-events: auto !important;
          -webkit-appearance: none !important;
        }
        
        body {
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
        }
      }
      
      /* Block ALL printing */
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
      
      /* Multiple protection layers */
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
      
      /* Prevent ANY content capture */
      img, canvas, video, svg {
        -webkit-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
        -webkit-touch-callout: none !important;
      }
      
      /* EXTREME: Make everything non-capturable on mobile */
      @media (max-width: 768px) {
        img, canvas, video, svg, div, span, p, h1, h2, h3, h4, h5, h6 {
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-user-drag: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Mobile-specific meta tags
    const metaViewport = document.createElement("meta");
    metaViewport.name = "screenshot";
    metaViewport.content = "disabled";
    document.head.appendChild(metaViewport);

    const metaNoCapture = document.createElement("meta");
    metaNoCapture.name = "no-capture";
    metaNoCapture.content = "true";
    document.head.appendChild(metaNoCapture);

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
      document.removeEventListener("visibilitychange", handleVisibilityChange, true);
      document.removeEventListener("dragstart", preventDrag, true);
      document.removeEventListener("drop", preventDrag, true);
      document.removeEventListener("touchstart", preventTouchScreenshot);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);
      window.removeEventListener("blur", handleBlur, true);
      window.removeEventListener("focus", handleFocus, true);
      window.removeEventListener("pagehide", handlePageHide, true);
      window.removeEventListener("pageshow", handlePageShow, true);
      document.removeEventListener("freeze", handleFreeze as any, true);
      document.removeEventListener("resume", handleResume as any, true);
      
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
