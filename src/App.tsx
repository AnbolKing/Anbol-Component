import React from 'react';
import Menu from './components/Menu/menu';
import SubMenu from './components/Menu/subMenu';
import MenuItem from './components/Menu/menuItem';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import Icon from './components/Icon/icon';

library.add(fas)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='arrow-down' className='arrow-icon'></Icon>
        <Menu>
          <MenuItem>
            list one
          </MenuItem>
          <MenuItem>
            list one
          </MenuItem>
          <MenuItem>
            list one
          </MenuItem>
          <MenuItem>
            list one
          </MenuItem>
          <SubMenu title='hello'>
            <MenuItem>
              list one
            </MenuItem>
            <MenuItem>
            list one
          </MenuItem>
          </SubMenu>
        </Menu>
      </header>
    </div>
  );
}

export default App;
