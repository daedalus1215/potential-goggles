import React from 'react'
import cn from 'classnames'
import useRippleEffect from './button/useRippleEffect/useRippleEffect'
import styles from './Button.module.css'

interface ButtonProps {
  className?: string
  onClick?: (e?: any) => void
  value?: string | number
  children?:any
  testid?: string
  title?: string
  type?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  value,
  children,
  testid,
  title,
  type,
  disabled,
  ...rest
}) => {
  const clickCallback = useRippleEffect(
    'button',
    onClick
  )
  return (
    <button
      className={cn(styles.baseBtn, className)}
      onClick={clickCallback}
      data-testid={testid}
      disabled={disabled}
      {...rest}
    >
      <>
        {children}
        {value}
      </>
    </button>
  )
}

export default Button
