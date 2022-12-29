import {
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
} from "react";
import { PerfectCursor } from "perfect-cursors";

type CursorProps = {
  color: string;
  x: number;
  y: number;
};

type PointType = Array<number>;
export function Cursor({ color, x, y }: CursorProps) {
  const rCursor = useRef<HTMLDivElement>(null);

  const animateCursor = useCallback((point: PointType) => {
    const elm = rCursor.current;
    if (!elm) return;
    elm.style.setProperty(
      "transform",
      `translate(${point[0]}px, ${point[1]}px)`
    );
  }, []);

  const onPointMove = usePerfectCursor(animateCursor);

  useEffect(() => onPointMove([x, y]), [onPointMove, x, y]);

  return (
    <div
      ref={rCursor}
      style={{
        position: "absolute",
        top: "0",
        left: "0",
      }}
    >
      <CursorSvg color={color} />
    </div>
  );
}

// Hook for adding perfect-cursors
function usePerfectCursor(cb: (point: number[]) => void, point?: PointType) {
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  const [pc] = useState(() => new PerfectCursor(cb));

  useIsomorphicLayoutEffect(() => {
    if (point) {
      pc.addPoint(point);
    }
    return () => pc.dispose();
  }, [pc]);

  return useCallback((point: PointType) => pc.addPoint(point), [pc]);
}

function CursorSvg({ color }: { color: string }) {
  return (
    <svg width="32" height="44" viewBox="0 0 24 36" fill="none">
      <path
        fill={color}
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      />
    </svg>
  );
}
