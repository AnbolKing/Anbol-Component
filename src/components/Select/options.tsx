import React, { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { SelectContext } from './select';
import Icon from '../Icon/icon';

export interface OptionProps {
  index ?: string;
  value : string;
  label ?: string;
  disabled ?: boolean;
}

const Option:React.FC<OptionProps> = (props) => {
  const {
    index,
    value,
    label,
    disabled,
  } = props;
  const context = useContext(SelectContext);
  const [selected, setSelected] = useState(false);
  const optionClass = classNames('anbol-select-item', {
    'is-disabled' : disabled,
    'is-selected' : context.tags && selected,
  })
  useEffect(() => {
    if(context.onAdd && context.onDelete) {
      if(selected) {
        context.onAdd(value);
      }
      if(!selected) {
        context.onDelete(value);
      }
    }
  }, [selected])
  const handleClick = () => {
    setSelected(!selected)
    if(context.onSelect && !disabled && (typeof index==='string')) {
      context.onSelect(index, value);
    }
  }
  return (
    <li className={optionClass} onClick={handleClick} key={label}>
      {value}
      {selected && <Icon icon='check'/>}
    </li>
  )
}

Option.displayName = 'OptionItem';
export default Option;