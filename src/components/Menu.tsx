import { Box, Divider } from '@chakra-ui/react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem';

const Menu: React.FC = () => {
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
    <Box
      as={motion.nav}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      display="flex"
      alignItems="flex-end"
      gap={2}
      position="fixed"
      height={'96px'}
      paddingX="0.7rem"
      paddingBottom="0.5rem"
      border="1px solid rgba(200 200 200 / 0.6)"
      left="50%"
      transform="translateX(-50%)"
      borderRadius={24}
      backdropFilter="blur(18px) brightness(60%)"
      boxShadow="0 0 2px rgba(0 0 0 / 0.4)"
      userSelect="none"
      style={{
        scale,
        translateX: '-50%',
        bottom: 8,
        transformOrigin: 'bottom center',
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <MenuItem
          scale={scale}
          isHovered={isHovered}
          isResizing={isResizing}
          mouseX={mouseX}
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
        draggable="false"
      >
        <Divider orientation="vertical" />
      </Box>
      {Array.from({ length: 2 }).map((_, i) => (
        <MenuItem
          scale={scale}
          isHovered={isHovered}
          isResizing={isResizing}
          mouseX={mouseX}
          key={i}
        />
      ))}
    </Box>
  );
};

export default Menu;
