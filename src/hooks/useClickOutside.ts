import { RefObject, useEffect } from "react";

/**
 * @ref: https://dev.to/brdnicolas/click-outside-magic-a-new-custom-hook-4np4#:~:text=The%20useClickOutside%20hook%20is%20designed,outside%20of%20the%20relevant%20component.
 * @param ref HTMLDivElement
 * @param handleOnClickOutside handlerFunction
 */
export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handleOnClickOutside: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handleOnClickOutside(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handleOnClickOutside]);
};
