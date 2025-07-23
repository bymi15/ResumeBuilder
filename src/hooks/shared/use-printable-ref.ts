import { RefObject, useCallback, useRef, useState } from "react";

export function usePrintableRef(): {
  ref: RefObject<HTMLDivElement | null>;
  setRef: (node: HTMLDivElement | null) => (() => void) | undefined;
  pageStyle: string;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [pageStyle, setPageStyle] = useState("");

  const pxToMm = (px: number) => px * 0.264583;

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    ref.current = node;

    const update = () => {
      const heightPx = node.offsetHeight;
      const heightMm = pxToMm(heightPx);

      const style = `
        @page {
          size: 210mm ${heightMm}mm;
          margin: 0;
        }

        @media print {
          html, body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          * {
            box-shadow: none !important;
            overflow: visible !important;
          }

          .page-break {
            break-after: always;
          }
        }
      `;

      setPageStyle(style);
    };

    // Run measurement on mount
    requestAnimationFrame(update);

    // Watch for future size changes
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

  return { ref, setRef, pageStyle };
}
