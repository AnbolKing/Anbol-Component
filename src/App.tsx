import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Select from './components/Select/select';
import Option from './components/Select/options';

library.add(fas);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Select 
          placeholder='请选择'
          onChange={(value) => console.log(value)}
          // disabled={true}
          multiple={true}
        >
          <Option value="One" index='0'/>
          <Option value="Two" index='1'/>
          <Option value="Three" index='2'/>
          <Option value="Four" index='3' disabled={true}/>
          <Option value="Five" index='4'/>
        </Select>
      </header>
    </div>
  );
}

export default App;
