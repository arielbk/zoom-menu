import { MotionValue, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MotionBox from './MotionBox';

interface MenuItemProps {
  mouseX: MotionValue<number>;
  isHovered: boolean;
}

const ITEM_LENGTH = 64;

const MenuItem: React.FC<MenuItemProps> = ({ mouseX, isHovered }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);

  const distance = useTransform(mouseX, (newMouseX) => {
    return Math.abs(left + ITEM_LENGTH / 2 - newMouseX);
  });

  const length = useTransform(
    distance,
    [100, 0],
    [ITEM_LENGTH, ITEM_LENGTH * 1.4]
  );
  const rise = useTransform(distance, [0, 120], [-8, 0]);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setLeft(rect.left);
  }, [ref.current, isHovered]);

  return (
    <MotionBox
      style={{ width: length, height: length, translateY: rise }}
      ref={ref}
      whileTap={{ translateY: 0 }}
      width={`${ITEM_LENGTH}px`}
      height={`${ITEM_LENGTH}px`}
      background="linear-gradient(to left, hsla(160 60% 90% / 1), hsla(210 60% 90% / 1))"
      borderRadius="14px"
      boxShadow="0 8px 16px rgba(0 0 0 / 0.15"
      cursor="pointer"
    />
  );
};

export default MenuItem;
