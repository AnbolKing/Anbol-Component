import React from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';
import MyProgress from '../MyProgress/myProgress';

interface UploadListProps {
  fileList : UploadFile[];
  onRemove : (_file:UploadFile) => void;
}

const UploadList:React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove,
  } = props;
  return (
    <ul className="anbol-upload-list">
      {fileList.map(item => {
        return (
          <li className="anbol-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary"/>
              {item.name}
            </span>
            <span className="file-status">
              {item.status==='uploading' && <Icon icon='spinner' spin theme='primary'></Icon>}
              {item.status==='success' && <Icon icon='check-circle' theme='success'></Icon>}
              {item.status==='error' && <Icon icon='times-circle' theme='danger'></Icon>}
            </span>
            <span className="file-actions">
              <Icon icon='times' onClick={() => {onRemove(item)}}></Icon>
            </span>
            {item.status==='uploading' && 
              <MyProgress 
                percent={item.percent || 0}
              />
            }
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList;