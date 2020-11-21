import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  className ?: string;
  btnType ?: ButtonType;
  size ?: ButtonSize;
  disabled ?: boolean;
  children : React.ReactNode;
  href ?: string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button:React.FC<ButtonProps> = (props) => {
  const {
    children,
    size,
    btnType,
    disabled,
    className,
    href,
    ...restProps
  } = props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`] : btnType,
    [`btn-${size}`] : size,
    'disabled' : (btnType===ButtonType.Link) && disabled,
  });
  if(btnType===ButtonType.Link && href) {
    return (
      <a 
        href={href}
        className={classes}
        {...restProps}
      >
        {children}
      </a>
    )
  }
  else {
    return (
      <button
        className={classes}
        {...restProps}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button;