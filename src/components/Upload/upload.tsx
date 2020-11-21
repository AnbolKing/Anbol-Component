import React, { ChangeEvent, useRef, useState } from 'react';
import axios from 'axios';
import Button from '../Button/button';
import { ButtonType } from '../Button/button';
import UploadList from './uploadList';

interface UploadProps {
  action : string;
  defaultFileList ?: UploadFile[];
  beforeUpload ?: (file:File) => boolean | Promise<File>
  onProgress ?: (percent:number, file:File) => void;
  onSuccess ?: (data:any, file:File) => void;
  onError ?: (err:any, file:File) => void;
  onChange ?: (file:File) => void;
  onRemove ?: (file:UploadFile) => void;
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
    setFileList([_file,...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios.post(action, formData, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      },
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
      <Button btnType={ButtonType.Primary} onClick={handleClick}>Upload File...</Button>
      <input 
        type="file"
        className="anbol-file-input"
        ref={fileInput}
        style={{display:'none'}}
        onChange={handleFileChange}
      />
      <UploadList
        fileList={fileList}
        onRemove={() => {}}
      />
    </div>
  )
}

export default Upload;