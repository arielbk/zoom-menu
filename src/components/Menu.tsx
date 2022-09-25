import styled from '@emotion/styled';
import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem';

const Container = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  bottom: 8px;
  height: 72px;
  padding: 0.5rem 1rem 1.4rem;
  border: 1px solid rgba(116 116 116 0.5);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 24px;
`;

const Menu: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const handleMouseMove = (e: MouseEvent) => {
      animate(mouseX, e.clientX);
    };
    ref.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <Container
      ref={ref}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <MenuItem isHovered={isHovered} mouseX={mouseX} key={i} />
      ))}
    </Container>
  );
};

export default Menu;
