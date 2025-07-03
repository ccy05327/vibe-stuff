import React from 'react'
import { MotionDiv } from './MotionWrapper'

// Main Card component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isHoverable?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, isHoverable = false, ...props }, ref) => {
    if (isHoverable) {
      // Extract safe props for MotionDiv
      const { 
        onClick, 
        onMouseEnter, 
        onMouseLeave, 
        id, 
        style,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        ...otherProps 
      } = props

      return (
        <MotionDiv
          ref={ref}
          className={`bg-white rounded-xl shadow-md ${className}`}
          whileHover={{ y: -5 }}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          id={id}
          style={style}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
        >
          {children}
        </MotionDiv>
      )
    }

    return (
      <div
        ref={ref}
        className={`bg-white rounded-xl shadow-md ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

// CardHeader component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`pt-6 px-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardHeader.displayName = 'CardHeader'

// CardTitle component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-lg font-semibold text-galah-grey-dark ${className}`}
        {...props}
      >
        {children}
      </h3>
    )
  }
)
CardTitle.displayName = 'CardTitle'

// CardDescription component
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-sm text-galah-grey-mid mt-1 ${className}`}
        {...props}
      >
        {children}
      </p>
    )
  }
)
CardDescription.displayName = 'CardDescription'

// CardContent component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-6 ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardContent.displayName = 'CardContent'

// Export all components
export { Card, CardHeader, CardTitle, CardDescription, CardContent }
export default Card
