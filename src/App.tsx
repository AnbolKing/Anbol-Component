import React from 'react';
import Icon from './components/Icon/icon';
import Upload, {UploadFile} from './components/Upload/upload';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import AutoComplete, { DataSourceType } from './components/AutoComplete/autoComplete';

library.add(fas);

// interface LakerProps {
//   value : string;
//   number : number;
// }

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

// const lakersWithNumber = [
//   {value: 'bradley', number: 11},
//   {value: 'pope', number: 1},
//   {value: 'caruso', number: 4},
//   {value: 'cook', number: 2},
//   {value: 'cousins', number: 15},
//   {value: 'james', number: 23},
//   {value: 'AD', number: 3},
//   {value: 'green', number: 14},
//   {value: 'howard', number: 39},
//   {value: 'kuzma', number: 0},
// ]


function App() {
  const handleFetch = (query:string) => {
      return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({items}) => {
        console.log(items);
        return items.slice(0,10).map((item:any) => ({value : item.login, ...item}))
      })
  }
  // const renderOption = (item:DataSourceType<LakerProps>) => {
  //   return (
  //     <>
  //     <h2>Name: {item.value}</h2>
  //     <p>Number: {item.number}</p>
  //     </>
  //   )
  // }
  return (
    <div className="App">
      <header className="App-header">
        <Upload
          action='http://jsonplaceholder.typicode.com/posts'
          defaultFileList={defaultFileList}
          mutiple={true}
          drag={true}
        >
          <Icon icon="upload" size="5x" theme="secondary" />
          <br/>
          <p>Drag file over to upload</p>
        </Upload>
        <AutoComplete 
          fetchSuggestions={handleFetch}
          onSelect={(item) => {console.log(item)}}
          // renderOptions={renderOption}
        />
      </header>
    </div>
  );
}

export default App;
