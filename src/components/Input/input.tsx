import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  disabled ?: boolean;
  size ?: InputSize;
  icon ?: IconProp;
  prepend ?: string | ReactElement;
  append ?: string | ReactElement;
  style ?: React.CSSProperties;
  onChange ?: (e:ChangeEvent<HTMLInputElement>) => void;
}

const Input:React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ...restProps
  } = props;
  const classes = classNames('anbol-input-wrapper', {
    'is-disabled' : disabled,
    'input-group' : prepend || append,
    'input-group-append' : !!append,
    'input-group-prepend' : !!prepend,
    [`input-size-${size}`] : size,
  })
  return (
    <div style={style} className={classes}>
      {prepend && <div className='anbol-input-group-prepend'>{prepend}</div>}
      {icon && <div className='icon-wrapper'><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input 
        className='anbol-input-inner'
        disabled={disabled}
        {...restProps}
      />
      {append && <div className='anbol-input-group-append'>{append}</div>}
    </div>
  )
}

export default Input;