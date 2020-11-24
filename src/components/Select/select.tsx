import React, { useState, useRef, createContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import { OptionProps } from './options';
import useClickOutSide from './selectHooks/useClickOutSide';

export interface SelectProps {
  defaultIndex ?: string;
  placeholder ?: string;
  disabled ?: boolean;
  multiple ?: boolean;
  name ?: string;
  onChange ?: (selectedValues: string) => void;
  onVisibleChange ?: (visible: boolean) => void;
}

interface SelectContextProps {
  index : string;
  onSelect ?: (index:string, values:string) => void;
  tags ?: boolean;
  onAdd ?: (item:string) => void;
  onDelete ?: (item:string) => void;
}
export const SelectContext = createContext<SelectContextProps>({index : '0'})

const Select:React.FC<SelectProps> = (props) => {
  const {
    defaultIndex,
    placeholder,
    disabled,
    multiple,
    name,
    onChange,
    onVisibleChange,
    children,
  } = props;
  const componentRef = useRef<HTMLDivElement>(null);
  const [hold,setHold] = useState(placeholder);
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const selectClass = classNames('anbol-select', {
    'is-opened' : selectOpen,
    'is-disabled' : disabled,
  })
  useClickOutSide(componentRef, () => {
    setSelectOpen(false);
  })
  const handleChangeItem = (selectIndex:string,selectValues:string) => {
    setCurrentIndex(selectIndex);
    if(!multiple) {
      setSelectOpen(false);
      setHold(selectValues);
    }
    if(onChange) {
      onChange(`${selectIndex}-${selectValues}`);
    }
  }
  const handleAddItem = (item:string) => {
    setSelectedValues([...selectedValues, item])
  }
  const handleDeleteItem = (item:string) => {
    // let valueIndex = selectedValues.indexOf(item);
    // if(valueIndex > -1) {
    //   let newList:string[] = selectedValues.splice(valueIndex, 1);
    //   console.log(newList);
    //   setSelectedValues(newList);
    // }
    let newList = selectedValues.filter(query => (
      query !== item
    ));
    setSelectedValues(newList);
  }
  const inputClass = classNames('anbol-input-inner');
  const iconClass = classNames('icon-wrapper');
  const passedContext:SelectContextProps = {
    index : currentIndex ? currentIndex : '0',
    onSelect : handleChangeItem,
    tags : multiple,
    onAdd : handleAddItem,
    onDelete : handleDeleteItem
  }
  const handleClick = () => {
    if(disabled) {
      return ;
    }
    else {
      setSelectOpen(open => {
        open = !open;
        if(onVisibleChange) {
          onVisibleChange(open);
        }
        return open;
      })
    }
  }
  const renderSelectList = () => {
    const dropClass = classNames('anbol-select-dropdown', {
      'is-children' : !children,
    });
    const childrenElement = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<OptionProps>;
      if(childElement.type.displayName === 'OptionItem') {
        return React.cloneElement(childElement)
      }
      else {
        console.error("Warning: Option has a child which is not a OptionItem component");
      }
    })
    return (
      <ul className={dropClass}>
        <SelectContext.Provider value={passedContext}>
          {childrenElement}
        </SelectContext.Provider>
      </ul>
    )
  }
  const renderSelectedTag = () => {
    const tagClass = classNames('anbol-select-tags');
    return (
      <div className={tagClass}>
        {
          selectedValues.map(item => {
            return (
            <span className="select-tag">
              {item}
              <Icon icon='times' style={{cursor:'pointer', marginLeft:'3px'}} onClick={() => {handleDeleteItem(item)}}/>
            </span>
            )
          })
        }
      </div>
    )
  }
  return (
    <div className={selectClass} ref={componentRef}>
      <div className="anbol-select-input">
        <div className="anbol-input-wrapper" onClick={handleClick}>
          <div className={iconClass}>
            <Icon icon='angle-down'/>
          </div>
          <input 
            type='text' 
            className={inputClass} 
            readOnly
            placeholder={disabled ? '被禁止' : (selectedValues.length>0 ? '' : hold)}
            name={name}
          />
        </div>
      </div>
      {selectOpen && renderSelectList()}
      {(multiple && selectedValues.length>0) && renderSelectedTag()}
    </div>
  )
}

export default Select;