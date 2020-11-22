import React, {ChangeEvent, useRef, useState} from 'react';
import axios from 'axios';
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

export type UploadFileStatus = 'ready' | 'success' | 'error' | 'uploading';

export interface UploadFile {
  uid : string;
  size : number;
  name : string;
  status ?: UploadFileStatus;
  percent ?: number;
  raw ?: File;
  response ?: any;
  error ?: any;
}

const MyUpload :React.FC<UploadProps> = (props) => {
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
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList||[]);
  const updateFileList = (uploadFile:UploadFile, updateObj:Partial<UploadFile>) => {
    setFileList((prevList) => {
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
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    const files = e.target.files;
    if(!files) {
      return ;
    }
    uploadFiles(files);
    if(fileInput.current) {
      fileInput.current.value = '';
    }
  }
  const uploadFiles = (files:FileList) => {
    console.log(files);
    let postFiles = Array.from(files);
    postFiles.forEach(file => {
      if(!beforeUpload) {
        post(file);
      }
      else {
        const result = beforeUpload(file);
        if(result && result instanceof Promise) {
          result.then(processFile => {
            post(processFile);
          })
        }
        if(result !== false) {
          post(file);
        }
      }
    })
  }
  const post = (file:File) => {
    let oneFile:UploadFile = {
      uid : Date.now() + 'upload-file',
      status : 'ready',
      name : file.name,
      size : file.size,
      raw : file,
      percent : 0,
    }
    setFileList((prevList) => {
      return [oneFile, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file);
    if(data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type' : 'multipart/form-data',
      },
      withCredentials,
      onDownloadProgress:(e) => {
        let percentage = Math.round((e.loaded*100)/e.total);
        if(percentage < 100) {
          updateFileList(oneFile,{percent:percentage, status:'uploading'})
          if(onProgress) {
            onProgress(percentage, file);
          }
        }
      }
    }).then(res => {
      console.log(res);
      updateFileList(oneFile,{response:res.data, status:'success'})
      if(onSuccess) {
        onSuccess(res.data, file);
      }
      if(onChange) {
        onChange(file);
      }
    }).catch(err => {
      console.log(err);
      updateFileList(oneFile,{error:err, status:'error'})
      if(onError) {
        onError(err, file);
      }
    })
  } 
  const handleDrag = (files:FileList) => {
    uploadFiles(files);
  }
  return (
    <div className="anbol-upload-component">
      <div className="anbol-upload-input" style={{display:'inline-block'}} onClick={handleClick}>
        {
          drag ? 
            <Dragger onFile={handleDrag}>
              {children}
            </Dragger>
            : {children}
        }
        <input 
          type='file'
          className='anbol-file-input'
          ref={fileInput}
          style={{display:'none'}}
          accept={accept}
          multiple={mutiple}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default MyUpload;