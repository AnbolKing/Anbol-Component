import React from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';

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
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList;