import React from 'react';
import Menu from './components/Menu/menu';
import SubMenu from './components/Menu/subMenu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
