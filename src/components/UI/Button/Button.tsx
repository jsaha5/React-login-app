import React, { MouseEventHandler } from 'react';

import classes from './Button.module.css';
type ButtonProps = {
  type: 'submit' | 'reset' | 'button' | undefined,
  onClick?:MouseEventHandler | undefined,
  disabled:boolean | null,
  className: string,
  children?:React.ReactNode
};

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default Button;
