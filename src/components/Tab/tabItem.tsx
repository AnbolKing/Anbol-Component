import React, { CSSProperties, useContext } from 'react';
import classNames from 'classnames';
import { TabContext } from './tab';

export interface TabItemProps {
  label ?: string;
  disabled ?: boolean;
  className ?: string;
  style ?: CSSProperties;
  index ?: number;
}

const TabItem:React.FC<TabItemProps> = (props) => {
  const {
    label,
    disabled,
    style,
    className,
    index,
  //  children,
  } = props;
  const context = useContext(TabContext);
  const classes = classNames('tab-item', className, {
    'is-disbaled' : disabled,
    'is-active' : context.index===index
  })
  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index === 'number')) {
      context.onSelect(index);
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {label}
    </li>
  )
}

TabItem.displayName = 'TabItem';
TabItem.defaultProps = {
  label : 'This is Label',
}

export default TabItem;