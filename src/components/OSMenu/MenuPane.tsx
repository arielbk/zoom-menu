import { Box, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import { useMenuValues } from '.';

const MenuPane: React.FC<{ children: ReactElement | Array<ReactElement> }> = ({
  children,
}) => {
  const { setIsHovered, scale } = useMenuValues();
  return (
    <Box
      as={motion.nav}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      display="flex"
      alignItems="flex-end"
      gap={2}
      position="fixed"
      height={'96px'}
      paddingX="0.7rem"
      paddingBottom="0.5rem"
      border="1px solid rgba(200 200 200 / 0.6)"
      left="50%"
      transform="translateX(-50%)"
      borderRadius={24}
      backdropFilter="blur(18px) brightness(60%)"
      boxShadow="0 0 2px rgba(0 0 0 / 0.4)"
      userSelect="none"
      style={{
        scale,
        translateX: '-50%',
        bottom: 8,
        transformOrigin: 'bottom center',
      }}
    >
      {children}
    </Box>
  );
};

const MenuDivider = () => {
  const { setIsResizing } = useMenuValues();
  return (
    <Box
      px={2}
      py={2}
      height="full"
      cursor="row-resize"
      as={motion.div}
      onMouseDown={() => {
        setIsResizing(true);
      }}
      draggable="false"
    >
      <Divider orientation="vertical" />
    </Box>
  );
};

export default MenuPane;

export { MenuDivider };
