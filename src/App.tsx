import { ChakraProvider } from '@chakra-ui/react';
import Menu from './components/Menu';
import RandomSlide from './components/RandomSlide';

function App() {
  return (
    <ChakraProvider>
      <Menu />
      {Array.from({ length: 3 }).map((_, i) => (
        <RandomSlide key={i} id={i} />
      ))}
    </ChakraProvider>
  );
}

export default App;
