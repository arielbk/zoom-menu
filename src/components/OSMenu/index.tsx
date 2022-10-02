import { animate, MotionValue, useMotionValue } from 'framer-motion';
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import MenuPane, { MenuDivider } from './MenuPane';
import MenuItem from './MenuItem';

interface MenuValues {
  isHovered: boolean;
  setIsHovered: (is: boolean) => void;
  scale: MotionValue<number>;
  mouseX: MotionValue<number>;
  isResizing: boolean;
  setIsResizing: (is: boolean) => void;
}
const MenuContext = createContext({} as MenuValues);

const OSMenu: React.FC<{ children: ReactElement | Array<ReactElement> }> = ({
  children,
}) => {
  const isFirstTransition = useRef(true);

  const mouseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const [isResizing, setIsResizing] = useState(false);
  const mouseYOrigin = useRef<null | number>(null);
  const [scaleOrigin, setScaleOrigin] = useState(1);

  const scale = useMotionValue(1);

  useEffect(() => {
    if (!isHovered && !isResizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      let duration = 0.05;
      if (isFirstTransition.current === true) duration = 0;
      animate(mouseX, e.clientX, { duration });
      isFirstTransition.current = false;
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      isFirstTransition.current = true;
      animate(mouseX, 0, { duration: 0 });
    };
  }, [isHovered, isResizing]);

  useEffect(() => {
    if (!isResizing) {
      mouseYOrigin.current = null;
      setScaleOrigin(scale.get());
      return;
    }
    document.body.style.cursor = 'row-resize';
    const handleResize = (e: MouseEvent) => {
      if (mouseYOrigin.current === null)
        return (mouseYOrigin.current = e.clientY);
      const dragDiff = e.clientY - mouseYOrigin.current;
      const newScale = scaleOrigin + -dragDiff / 100;
      if (newScale < 0.5) return;
      if (newScale > 2) return;
      animate(scale, newScale);
    };
    const handleResizeEnd = () => setIsResizing(false);
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
    return () => {
      document.body.style.cursor = 'inherit';
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing]);

  return (
    <MenuContext.Provider
      value={{
        isHovered,
        setIsHovered,
        scale,
        mouseX,
        isResizing,
        setIsResizing,
      }}
    >
      <MenuPane>{children}</MenuPane>
    </MenuContext.Provider>
  );
};

export default OSMenu;

const useMenuValues = () => useContext(MenuContext);

export { useMenuValues, MenuItem, MenuDivider };
