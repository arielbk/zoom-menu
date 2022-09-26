import { motion, MotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import MotionBox from './MotionBox';

interface MenuItemProps {
  mouseX: MotionValue<number>;
  isHovered: boolean;
  itemLength: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  mouseX,
  isHovered,
  itemLength,
}) => {
  // console.log(itemLength);
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const distance = useTransform(mouseX, (newMouseX) => {
    return Math.abs(left + itemLength / 2 - newMouseX);
  });

  const length = useTransform(
    distance,
    [itemLength * 1.6, 0],
    [itemLength, itemLength * 1.4]
  );
  const rise = useTransform(
    distance,
    [0, itemLength * 2],
    [itemLength * -0.125, 0]
  );
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
        width={`${itemLength}px`}
        height={`${itemLength}px`}
        background="linear-gradient(to left, hsla(160 60% 100% / 1), hsla(210 60% 90% / 1))"
        borderRadius={itemLength * 0.22}
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
