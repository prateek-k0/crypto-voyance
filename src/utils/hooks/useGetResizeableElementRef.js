import { useEffect, useRef, useState } from 'react';

// hook for resize event
export const useGetResizeableElementRef = (
  resizeable,
  onResize
) => {
  const targetRef = useRef(null);
  const [refRectDimensions, setRefRectDimensions] = useState(JSON.stringify({
    width: 0,
    height: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    x: 0,
    y: 0,
  }));

  useEffect(() => {
    if(resizeable && (targetRef.current !== null || targetRef.current !== undefined)) {
      const target = targetRef.current;
      const observerInstsnce = new ResizeObserver(([entry]) => {
        onResize && onResize(entry);
        const { contentRect } = entry;
        const revisedRefRect = {
          width: contentRect?.width || 0,
          height: contentRect?.height || 0,
          bottom: contentRect?.bottom || 0,
          left: contentRect?.left || 0,
          right: contentRect?.right || 0,
          top: contentRect?.top || 0,
          x: contentRect?.x || 0,
          y: contentRect?.y || 0,
        };
        setRefRectDimensions(JSON.stringify(revisedRefRect));
      });
      observerInstsnce.observe(target);

      return () => {
        observerInstsnce.unobserve(target);
      }
    }

    return () => {}
  }, [resizeable, onResize]);

  return {
    elementRef: targetRef, dimComparable: refRectDimensions
  }
};
