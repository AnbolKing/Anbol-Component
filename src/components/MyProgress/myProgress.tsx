import React from 'react';
import { ThemeProps } from '../Icon/icon';

export interface ProgressProps {
  percent : number;
  height ?: number;
  showText ?: boolean;
  style ?: React.CSSProperties;
  theme ?: ThemeProps;
}

const MyProgress:React.FC<ProgressProps> = (props) => {
  const {
    percent,
    height,
    showText,
    style,
    theme,
  } = props;
  return (
    <div className="anbol-progress-bar" style={style}>
      <div className="anbol-progress-bar-outer" style={{height:`${height}px`}}>
        <div className={`anbol-progress-bar-inner color-${theme}`} style={{width:`${percent}%`}}>
          {showText && <span className="inner-text">{`${percent}`}</span>}
        </div>
      </div>
    </div>
  )
}

MyProgress.defaultProps = {
  height: 15,
  theme : 'primary',
  showText : true,
}
export default MyProgress;