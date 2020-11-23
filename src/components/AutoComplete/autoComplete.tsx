import React, { ChangeEvent, KeyboardEvent, useState, useEffect, useRef } from 'react';  
import Input, { InputProps }  from '../Input/input';
import Icon from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutSide from '../../hooks/useClickOutSide';
import classNames from 'classnames';

interface DataSourceObject {
  value : string;
  // number : number;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions : (str:string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect ?: (item:DataSourceType) => void;
  renderOptions ?: (item:DataSourceType) => React.ReactElement;
}

const AutoComplete:React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce(inputValue, 500);
  useClickOutSide(componentRef, () => {
    setSuggestions([]);
  })
  useEffect(() => {
    if(debounceValue && triggerSearch.current) {
      const result = fetchSuggestions(inputValue);
      if(result instanceof Promise) {
        console.log('trigger');
        setLoading(true);
        result.then(data => {
          setLoading(false);
          setSuggestions(data);
        })
      }
      else {
        setSuggestions(result);
      }
    }
    else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  },[debounceValue]);
  const hightlight = (index:number) => {
    if(index < 0) {
      index = 0;
    }
    if(index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  }
  const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if(suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        hightlight(highlightIndex - 1);
        break;
      case 40:
        hightlight(highlightIndex + 1);
        break;
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
    
  }
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  }
  const handleSelect = (item:DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if(onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  }
  const renderTemplate = (item:DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  }
  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const classes = classNames('suggestion-item', {
            'item-highlighted' : index===highlightIndex,
          });
          return (
            <li key={index} className={classes} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="anbol-auto-complete" ref={componentRef}>
      <Input 
        value={inputValue}
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {loading && <ul><Icon icon='spinner' spin /></ul>}
      {suggestions.length>0 && generateDropDown()}
    </div>
  )
}

export default AutoComplete;