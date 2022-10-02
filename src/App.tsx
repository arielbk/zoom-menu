import { ChakraProvider } from '@chakra-ui/react';
import {
  FiCloudLightning,
  FiFile,
  FiLock,
  FiHeart,
  FiTag,
  FiGithub,
  FiSun,
} from 'react-icons/fi';
import OSMenu, { MenuDivider, MenuItem } from './components/OSMenu';
import RandomSlide from './components/RandomSlide';

function App() {
  return (
    <ChakraProvider>
      {Array.from({ length: 4 }).map((_, i) => (
        <RandomSlide
          key={i}
          src={`https://source.unsplash.com/random/2000x2000/?abstract&id=${i}`}
        />
      ))}
      <OSMenu>
        <MenuItem>
          <FiCloudLightning />
        </MenuItem>
        <MenuItem>
          <FiFile />
        </MenuItem>
        <MenuItem>
          <FiLock />
        </MenuItem>
        <MenuItem>
          <FiHeart />
        </MenuItem>
        <MenuItem>
          <FiTag />
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <FiSun />
        </MenuItem>
        <MenuItem>
          <FiGithub />
        </MenuItem>
      </OSMenu>
    </ChakraProvider>
  );
}

export default App;
