import { Box } from '@chakra-ui/react';
import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem';

const Menu: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isFirstTransition = useRef(true);

  const mouseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

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
      bottom={2}
      height="98px"
      padding="0.5rem 1rem"
      border="1px solid rgba(200 200 200 / 0.6)"
      left="50%"
      transform="translateX(-50%)"
      borderRadius={24}
      backdropFilter="blur(18px) brightness(60%)"
      boxShadow="0 0 2px rgba(0 0 0 / 0.4)"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <MenuItem isHovered={isHovered} mouseX={mouseX} key={i} />
      ))}
    </Box>
  );
};

export default Menu;
