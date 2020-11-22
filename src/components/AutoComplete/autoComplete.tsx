import { type } from 'os';
import React, { ChangeEvent, useState } from 'react';  
import Input, { InputProps }  from '../Input/input';

interface DataSourceObject {
  value : string;
  number : number;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions : (str:string) => DataSourceType[];
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
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if(value) {
      const result = fetchSuggestions(value);
      setSuggestions(result);
    }
    else {
      setSuggestions([]);
    }
  }
  const handleSelect = (item:DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if(onSelect) {
      onSelect(item);
    }
  }
  const renderTemplate = (item:DataSourceType) => {
    return renderOptions ? renderOptions(item) : item;
  }
  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="anbol-auto-complete">
      <Input 
        value={inputValue}
        {...restProps}
        onChange={handleChange}
      />
      {suggestions.length>0 && generateDropDown()}
    </div>
  )
}

export default AutoComplete;