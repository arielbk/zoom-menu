import { Box, Divider } from '@chakra-ui/react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem';

const Menu: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isFirstTransition = useRef(true);
  const [itemLength, setItemLength] = useState(64);

  const mouseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const [isResizing, setIsResizing] = useState(false);
  const mouseYOrigin = useRef<null | number>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!isHovered) return;
    const handleMouseMove = (e: MouseEvent) => {
      let duration = 0.05;
      if (isFirstTransition.current === true) duration = 0;
      animate(mouseX, e.clientX, { duration });
      isFirstTransition.current = false;
    };
    ref.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
      isFirstTransition.current = true;
      animate(mouseX, 0, { duration: 0 });
    };
  }, [isHovered, isResizing]);

  useEffect(() => {
    if (!isResizing) {
      mouseYOrigin.current = null;
      return;
    }
    const handleResize = (e: MouseEvent) => {
      if (mouseYOrigin.current === null)
        return (mouseYOrigin.current = e.clientY);
      const dragDiff = e.clientY - mouseYOrigin.current;
      const newLength = 64 - dragDiff / 2;
      if (newLength > (window.innerWidth * 0.7) / 5) return;
      if (newLength < 32) return;
      setItemLength(newLength);
    };
    const handleResizeEnd = () => setIsResizing(false);
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing]);

  return (
    <Box
      as={motion.nav}
      ref={ref}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      display="flex"
      alignItems="flex-end"
      gap={itemLength / 6 + 'px'}
      position="fixed"
      bottom={2}
      height={itemLength * 1.4 + 'px'}
      paddingX="1rem"
      paddingBottom={itemLength * 0.1}
      border="1px solid rgba(200 200 200 / 0.6)"
      left="50%"
      transform="translateX(-50%)"
      borderRadius={24}
      backdropFilter="blur(18px) brightness(60%)"
      boxShadow="0 0 2px rgba(0 0 0 / 0.4)"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <MenuItem
          isHovered={isHovered}
          mouseX={mouseX}
          itemLength={itemLength}
          key={i}
        />
      ))}
      <Box
        px={2}
        py={2}
        height="full"
        cursor="row-resize"
        as={motion.div}
        onMouseDown={() => {
          setIsResizing(true);
        }}
      >
        <Divider orientation="vertical" />
      </Box>
      {Array.from({ length: 2 }).map((_, i) => (
        <MenuItem
          isHovered={isHovered}
          mouseX={mouseX}
          itemLength={itemLength}
          key={i}
        />
      ))}
    </Box>
  );
};

export default Menu;
