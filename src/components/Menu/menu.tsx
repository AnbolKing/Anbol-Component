import React, { CSSProperties, useState, createContext } from 'react';
import classNames from 'classnames';

type MenuMode = 'vertical' | 'horizontal';

export interface MenuProps {
  defaultIndex ?: string;
  className ?: string;
  mode ?: MenuMode;
  style ?: CSSProperties;
  onSelect ?: (selectIndex:string) => void;
  defaultOpenMenu ?: string[];
}
interface MenuItemContext {
  index : string;
  onSelect ?: (selectIndex:string) => void;
  mode ?: MenuMode;
  defaultOpenMenu ?: string[];
}
export const MenuContext = createContext<MenuItemContext>({index : '0'});

export const Menu:React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    onSelect,
    children,
    defaultIndex,
    defaultOpenMenu,
  } = props;
  //设置当前被点击的菜单项
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('anbol-menu', className, {
    'menu-vertical' : mode==='vertical',
    'menu-horizontal' : mode!=='vertical',
  });
  const handleClick = (index:string) => {
    setActive(index);
    if(onSelect) {
      onSelect(index);
    }
  }
  const passedContext:MenuItemContext = {
    index : currentActive ? currentActive : '0',
    onSelect : handleClick,
    mode,
    defaultOpenMenu,
  }
  return (
    <ul 
      className={classes}
      style={style}
    >
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex : '0',
  mode : 'horizontal',
  defaultOpenMenu:[],
}

export default Menu;