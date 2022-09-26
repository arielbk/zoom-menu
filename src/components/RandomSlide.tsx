import { Box, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const RandomSlide: React.FC<{ id: number }> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = `https://source.unsplash.com/random/2000x2000/?abstract&id=${id}`;
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <Box
      backgroundImage={`https://source.unsplash.com/random/2000x2000/?abstract&id=${id}`}
      backgroundSize="cover"
      minW="100vw"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading && <Spinner size="xl" color="gray" />}
    </Box>
  );
};

export default RandomSlide;
