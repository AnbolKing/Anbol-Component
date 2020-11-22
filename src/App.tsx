import React from 'react';
import Icon from './components/Icon/icon';
import Upload, {UploadFile} from './components/Upload/upload';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]

function App() {
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
      </header>
    </div>
  );
}

export default App;
