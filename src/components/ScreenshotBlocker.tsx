import { useEffect } from "react";
import { toast } from "sonner";

export const ScreenshotBlocker = () => {
  useEffect(() => {
    // Disable screenshots, print screen, and dev tools
    const preventScreenshot = (e: KeyboardEvent) => {
      // Block PrintScreen, Snipping Tool shortcuts, Mac screenshots
      if (
        e.key === "PrintScreen" ||
        e.key === "Print" ||
        (e.shiftKey && e.metaKey && e.key === "3") ||
        (e.shiftKey && e.metaKey && e.key === "4") ||
        (e.shiftKey && e.metaKey && e.key === "5") ||
        (e.ctrlKey && e.shiftKey && e.key === "S") ||
        (e.metaKey && e.shiftKey && e.key === "S") ||
        // Block dev tools
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toast.error("Screenshots are not allowed");
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

    // Detect visibility change (common during screenshots)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.body.style.opacity = "0";
        document.body.style.filter = "blur(50px)";
        setTimeout(() => {
          if (document.hidden) {
            document.body.style.backgroundColor = "#000000";
          }
        }, 10);
      } else {
        setTimeout(() => {
          document.body.style.opacity = "1";
          document.body.style.filter = "none";
          document.body.style.backgroundColor = "";
        }, 100);
      }
    };

    // Detect window blur (screenshot tools often cause this)
    const handleBlur = () => {
      document.body.style.opacity = "0";
      setTimeout(() => {
        document.body.style.backgroundColor = "#000000";
      }, 5);
    };

    const handleFocus = () => {
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
      
      /* Watermark overlay */
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
      
      /* Additional screenshot blocking layer */
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
    `;
    document.head.appendChild(style);

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
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      
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
