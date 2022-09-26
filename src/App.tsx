import { Box, ChakraProvider } from '@chakra-ui/react';
import Menu from './components/Menu';
import RandomSlide from './components/RandomSlide';

function App() {
  return (
    <ChakraProvider>
      <Menu />
      {Array.from({ length: 3 }).map((_, i) => (
        <RandomSlide
          key={i}
          src={`https://source.unsplash.com/random/2000x2000/?abstract&id=${i}`}
        />
      ))}
    </ChakraProvider>
  );
}

export default App;
