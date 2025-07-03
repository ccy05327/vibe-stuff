import React from 'react'
import Link from 'next/link'
import { MotionButton, MotionDiv } from './MotionWrapper'
import { cva, type VariantProps } from 'class-variance-authority'

// Define button variants using CVA
export const buttonVariants = cva(
  // Base styles
  'font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-galah-pink-vibrant text-white hover:bg-galah-pink-soft focus:ring-galah-pink-vibrant',
        secondary: 'bg-transparent text-galah-pink-vibrant border border-galah-pink-vibrant hover:bg-galah-pink-vibrant hover:text-white focus:ring-galah-pink-vibrant',
        icon: 'bg-transparent text-galah-pink-vibrant border border-galah-pink-vibrant hover:bg-galah-pink-vibrant hover:text-white focus:ring-galah-pink-vibrant px-0 h-10 w-10 flex items-center justify-center',
        ghost: 'bg-transparent text-galah-grey-dark hover:bg-gray-50 hover:text-galah-pink-vibrant focus:ring-galah-pink-vibrant border-0',
      },
      size: {
        default: 'text-sm',
        lg: 'text-lg py-3 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

// Base props shared by both variants
interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  className?: string
}

// Button props (when no href)
interface ButtonElementProps extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never
}

// Link props (when href is provided)
interface LinkElementProps extends BaseButtonProps, Omit<React.ComponentProps<typeof Link>, keyof BaseButtonProps> {
  href: string
}

// Union type for the polymorphic component
export type ButtonProps = ButtonElementProps | LinkElementProps

// Button component
const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className = '', variant, size, children, href, ...props }, ref) => {
    const buttonClasses = buttonVariants({ variant, size, className })

    if (href) {
      // Render as Link wrapped in MotionDiv
      return (
        <MotionDiv
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={buttonClasses}
            {...(props as Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>)}
          >
            {children}
          </Link>
        </MotionDiv>
      )
    }

    // Render as MotionButton
    // Extract only the safe props we want to pass through
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
    const { 
      onClick, 
      onFocus, 
      onBlur, 
      onMouseEnter, 
      onMouseLeave, 
      disabled, 
      type, 
      form, 
      value, 
      name, 
      id, 
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...otherProps 
    } = buttonProps
    
    return (
      <MotionButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={buttonClasses}
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        type={type}
        form={form}
        value={value}
        name={name}
        id={id}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      >
        {children}
      </MotionButton>
    )
  }
)

Button.displayName = 'Button'

export default Button
