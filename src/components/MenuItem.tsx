import styled from '@emotion/styled';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MenuItemProps {
  mouseX: MotionValue<number>;
  isHovered: boolean;
}

const Container = styled(motion.div)`
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px rgba(0, 0, 0, 0.123);
  cursor: pointer;
`;

const MenuItem: React.FC<MenuItemProps> = ({ mouseX, isHovered }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);

  const distance = useTransform(mouseX, (newMouseX) => {
    const mouseDiff = Math.abs(left + 32 - newMouseX);

    return mouseDiff;
  });
  const length = useTransform(distance, [0, 100], [87, 64]);
  const rise = useTransform(distance, [0, 120], [-8, 0]);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setLeft(rect.left);
  }, [ref.current]);

  return (
    <Container
      style={{ width: length, height: length, translateY: rise }}
      ref={ref}
    />
  );
};

export default MenuItem;
