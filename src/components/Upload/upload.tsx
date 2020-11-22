import React, { ChangeEvent, useRef, useState } from 'react';
import axios from 'axios';
import Button from '../Button/button';
import { ButtonType } from '../Button/button';
import UploadList from './uploadList';
import Dragger from './dragger';

interface UploadProps {
  action : string;
  defaultFileList ?: UploadFile[];
  beforeUpload ?: (file:File) => boolean | Promise<File>
  onProgress ?: (percent:number, file:File) => void;
  onSuccess ?: (data:any, file:File) => void;
  onError ?: (err:any, file:File) => void;
  onChange ?: (file:File) => void;
  onRemove ?: (file:UploadFile) => void;
  headers ?: {[key: string] : any};
  name ?: string;
  data ?: {[key: string] : any};
  withCredentials ?: boolean;
  accept ?: string;
  mutiple ?: boolean;
  drag ?: boolean;
}
export type UploadFilesStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
  uid : string;
  size : number;
  name : string;
  status ?: UploadFilesStatus;
  percent ?: number;
  raw ?: File;
  response ?: any;
  error ?: any;
}

const Upload:React.FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    withCredentials,
    data,
    headers,
    accept,
    mutiple,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (uploadFile:UploadFile, updateObj:Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if(file.uid === uploadFile.uid) {
          return {...file, ...updateObj}
        }
        else {
          return file;
        }
      })
    })
  }
  const handleClick = () => {
    if(fileInput.current) {
      fileInput.current.click();
    }
  }
  const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if(!files) {
      return;
    }
    uploadFiles(files);
    if(fileInput.current) {
      fileInput.current.value = '';
    }
  }
  const handleRemove = (file:UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid!==file.uid)
    })
    if(onRemove) {
      onRemove(file)
    }
  }
  const uploadFiles = (file:FileList) => {
    let postFiles = Array.from(file);
    postFiles.forEach(file => {
      if(!beforeUpload) {
        post(file)
      }
      else {
        const result = beforeUpload(file);
        if(result && result instanceof Promise) {
          result.then(processFile => {
            post(processFile);
          })
        }
        else if(result !== false) {
          post(file);
        }
      }
    })
  }
  const post = (file:File) => {
    let _file:UploadFile = {
      uid : Date.now() + 'upload-file',
      status : 'ready',
      name : file.name,
      size : file.size,
      percent : 0,
      raw : file,
    }
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file);
    if(data) {
      Object.keys(data).forEach(key => {
        formData.append(key,data[key]);
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type' : 'multipart/form-data'
      },
      withCredentials,
      onUploadProgress:(e) => { 
        let percentage = Math.round((e.loaded*100) / e.total) || 0;
        if(percentage < 100) {
          updateFileList(_file, { percent:percentage, status:'uploading'})
          if(onProgress) {
            onProgress(percentage, file);
          }
        }
      }
    }).then(res => {
      console.log(res);
      updateFileList(_file, {status:'success', response:res.data})
      if(onSuccess) {
        onSuccess(res.data, file);
      }
      if(onChange) {
        onChange(file);
      }
    }).catch(err => {
      console.log(err);
      updateFileList(_file, {status:'error', error:err})
      if(onError) {
        onError(err, file)
      }
      if(onChange) {
        onChange(file);
      }
    })
  }
  console.log(fileList);
  return (
    <div className="anbol-upload-component">
      {/* <Button btnType={ButtonType.Primary} onClick={handleClick}>Upload File...</Button> */}
      
      <div className="anbol-upload-input" style={{display:'inline-block'}} onClick={handleClick}>
          {drag ? 
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          }
        <input 
          type="file"
          className="anbol-file-input"
          ref={fileInput}
          style={{display:'none'}}
          onChange={handleFileChange}
          accept={accept}
          multiple={mutiple}
        />
      </div>
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

Upload.defaultProps = {
  name : 'file',
}
export default Upload;