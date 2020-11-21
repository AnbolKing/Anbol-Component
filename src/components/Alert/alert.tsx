import React from 'react';
import classNames from 'classnames';

export enum AlertType  {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Default = 'default',
}

interface BaseAlertProps {
  title ?: string;
  description ?: string;
  type ?: AlertType;
  closable ?: boolean;
  className ?: string;
}

const Alert:React.FC<BaseAlertProps> = (props) => {
  const {
    title,
    description,
    type,
    closable,
    className,
  } = props;
  const Alertclass = classNames('alert', className, {
    [`alert-${type}`] : type,
  })
  const closeClass = classNames('alert', className, {
    [`alert-${type}`] : type,
    'closed': closable,
  })
  const handleClode = () => {
    let element = document.getElementsByClassName('alert')[0];
    console.log(element);
    element.className = closeClass;
    console.log(element.className);
  }
  return (
    <div className={Alertclass}>
      <span className="alert-title">
        {title}
      </span>
      <p className="alert-desc">
        {description}
      </p>
      {
        closable ? (
          <span className="alert-close" onClick={handleClode}>
            <svg width='1.2rem' height='1.2rem' aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11 viking-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
          </span>
        ) : null
      }
    </div>
  )
}

Alert.defaultProps = {
  closable:true
}

export default Alert;