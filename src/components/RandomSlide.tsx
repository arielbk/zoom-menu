import { Box, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const RandomSlide: React.FC<{ src: string }> = ({ src }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <Box
      backgroundImage={src}
      backgroundSize="cover"
      minW="100vw"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      scrollSnapAlign="center"
    >
      {isLoading && <Spinner size="xl" color="gray" />}
    </Box>
  );
};

export default RandomSlide;
