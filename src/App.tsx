import { ChakraProvider } from '@chakra-ui/react';
import Menu from './components/Menu';

function App() {
  return (
    <ChakraProvider>
      <Menu />
    </ChakraProvider>
  );
}

export default App;
