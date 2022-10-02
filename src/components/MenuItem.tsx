import { Box } from '@chakra-ui/react';
import { motion, MotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactElement, useEffect, useRef, useState } from 'react';
import MotionBox from './MotionBox';

interface MenuItemProps {
  mouseX: MotionValue<number>;
  isHovered: boolean;
  isResizing: boolean;
  scale: MotionValue<number>;
  children: ReactElement;
}

const ITEM_LENGTH = 64;

const MenuItem: React.FC<MenuItemProps> = ({
  mouseX,
  isHovered,
  isResizing,
  scale,
  children,
}) => {
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
  const iconScale = useTransform(length, (length) => length / 64);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setLeft(rect.left);
  }, [ref.current, isHovered, isResizing]);

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
        background="linear-gradient(to left, hsla(160 60% 100% / 1), hsla(220 60% 85% / 1))"
        borderRadius="14px"
        boxShadow="0 8px 16px rgba(0 0 0 / 0.15)"
        onTap={() => setIsSelected((prev) => !prev)}
        color="gray.500"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="2rem"
      >
        <motion.div style={{ scale: iconScale }}>{children}</motion.div>
      </MotionBox>
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
