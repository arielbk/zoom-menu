import styled from '@emotion/styled';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MenuItemProps {
  mouseX: MotionValue<number>;
  isHovered: boolean;
}

const ITEM_WIDTH = 64;

const Container = styled(motion.div)`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_WIDTH}px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.123);
  cursor: pointer;
`;

const MenuItem: React.FC<MenuItemProps> = ({ mouseX, isHovered }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);

  const distance = useTransform(mouseX, (newMouseX) => {
    return Math.abs(left + ITEM_WIDTH / 2 - newMouseX);
  });

  const length = useTransform(
    distance,
    [100, 0],
    [ITEM_WIDTH, ITEM_WIDTH * 1.4]
  );
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
