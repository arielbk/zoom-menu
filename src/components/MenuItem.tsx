import styled from '@emotion/styled';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MenuItemProps {
  mouseX: MotionValue<number>;
}

const Container = styled(motion.div)`
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 14px;
`;

const MenuItem: React.FC<MenuItemProps> = ({ mouseX }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);

  const scale = useTransform(mouseX, (newMouseX) => {
    const mouseDiff = Math.abs(left + 32 - newMouseX);
    if (mouseDiff > 50) return 1;
    return 1.2;
  });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setLeft(rect.left);
  }, [ref.current]);

  console.log(left);

  return <Container style={{ scale }} ref={ref} />;
};

export default MenuItem;
