import { motion, MotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import MotionBox from './MotionBox';

interface MenuItemProps {
  mouseX: MotionValue<number>;
  isHovered: boolean;
  scale: MotionValue<number>;
}

const ITEM_LENGTH = 64;

const MenuItem: React.FC<MenuItemProps> = ({ mouseX, isHovered, scale }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const distance = useTransform<number, number>(
    [mouseX, scale],
    ([newMouseX, scale]) => {
      return Math.abs(left + (ITEM_LENGTH * scale) / 2 - newMouseX);
    }
  );
  const adjustedDistance = useTransform<number, number>(
    [distance, scale],
    ([newDistance, newScale]) => newDistance / newScale
  );
  const length = useTransform(
    adjustedDistance,
    [100, 0],
    [ITEM_LENGTH, ITEM_LENGTH * 1.4]
  );
  const rise = useTransform(adjustedDistance, [0, 120], [-8, 0]);
  const riseSpring = useSpring(rise, {
    damping: 20,
    mass: 1,
    stiffness: 500,
  });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setLeft(rect.left);
  }, [ref.current, isHovered]);

  return (
    <Box display="flex" flexDir="column" alignItems="center" gap={2}>
      <MotionBox
        style={{
          cursor: 'pointer',
          width: length,
          height: length,
          translateY: riseSpring,
        }}
        ref={ref}
        whileTap={{ translateY: 0 }}
        width={`${ITEM_LENGTH}px`}
        height={`${ITEM_LENGTH}px`}
        background="linear-gradient(to left, hsla(160 60% 100% / 1), hsla(210 60% 90% / 1))"
        borderRadius="14px"
        boxShadow="0 8px 16px rgba(0 0 0 / 0.15"
        onTap={() => setIsSelected((prev) => !prev)}
      />
      <Box
        as={motion.div}
        width={1}
        height={1}
        background="#ddd"
        borderRadius="full"
        animate={isSelected ? { scale: 1 } : { scale: 0 }}
      />
    </Box>
  );
};

export default MenuItem;
