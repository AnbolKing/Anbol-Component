import React, { CSSProperties, createContext, useState } from 'react';
import classNames from 'classnames';
import { TabItemProps } from './tabItem';

type TabType = 'line' | 'card';
interface TabContextProps {
  onSelect ?: (selectIndex:number) => void;
  type ?: TabType;
  index ?: number;
}
// interface ChildProps {
//   label ?: string;
//   index ?: number;
//   children ?: React.ElementType
// }
export interface TabProps {
  defaultIndex ?: number;
  onSelect ?: (selectIndex:number) => void;
  className ?: string;
  type ?: TabType;
  style ?: CSSProperties
}
export const TabContext = createContext<TabContextProps>({ index:0 });

const Tab:React.FC<TabProps> = (props) => {
  const {
    defaultIndex,
    children,
    className,
    type,
    style,
    onSelect,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  // const [currentContent, setContent] = useState<React.ElementType>();
  const classesNav = classNames('anbol-tabs-nav', className, {
    'nav-line' : type==='line',
    'nav-card' : type==='card',
  })
  const handleClick = (key:number) => {
    setActive(key);
    if(onSelect) {
      onSelect(key)
    }
  }
  const passedContext:TabContextProps = {
    index : currentActive ? currentActive : 0,
    type,
    onSelect : handleClick,
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const { displayName } = childElement.type
      if (displayName === 'TabItem') {
        return React.cloneElement(childElement, {
          key: index
        })
      } 
      else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if(index === currentActive) {
        const childElement = child as React.FunctionComponentElement<TabItemProps>
        const childProps:any = childElement.props;
        return childProps.children;  
      }
    })
  }
  return (
    <div className="anbol-tabs">
      <ul className={classesNav} style={style}>
        <TabContext.Provider value={passedContext}>
          {/* {children} */}
          {renderChildren()}
        </TabContext.Provider>
      </ul>
      {React.createElement('div',{ className: "anbol-tabs-content" }, renderContent())}
    </div>
  )
}

Tab.defaultProps = {
  defaultIndex : 0,
  type : 'line',
}

export default Tab;