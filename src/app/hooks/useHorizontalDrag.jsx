import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to handle horizontal drag behavior.
 * @param {React.RefObject} ref - Ref of the element to apply drag behavior.
 */
const useHorizontalDrag = (ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const handleMouseDown = (e) => {
      // Prevent dragging if e.target.classList does not contain any of the valid class names
      const validClasses = ['task-list-group', 'columns-container'];
      const isValidTarget = validClasses.some(className => e.target.classList.contains(className));

      if (!isValidTarget) return;

      setIsDragging(true);
      startX.current = e.pageX - element.offsetLeft;
      scrollLeft.current = element.scrollLeft;
      document.body.classList.add("no-select"); // Disable text selection
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX.current) * 2; // Adjust scroll speed if necessary
      element.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.classList.remove("no-select"); // Enable text selection
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      document.body.classList.remove("no-select"); // Enable text selection
    };

    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDragging, ref]);

  return isDragging;
};

export default useHorizontalDrag;
