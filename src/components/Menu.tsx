import { Box } from '@chakra-ui/react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem';

const Menu: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (!isHovered) {
      animate(mouseX, 0, { duration: 0 });
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      animate(mouseX, e.clientX, { duration: 0 });
    };
    ref.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <Box
      as={motion.nav}
      ref={ref}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      display="flex"
      alignItems="flex-end"
      gap={4}
      position="fixed"
      background="rgba(0 0 0 / 0.5)"
      bottom={2}
      height="72px"
      padding="0.5rem 1rem 1.4rem"
      border="1px solid rgba(200 200 200 / 0.5)"
      left="50%"
      transform="translateX(-50%)"
      borderRadius={24}
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <MenuItem isHovered={isHovered} mouseX={mouseX} key={i} />
      ))}
    </Box>
  );
};

export default Menu;
