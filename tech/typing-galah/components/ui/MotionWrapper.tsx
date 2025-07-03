'use client'

import { motion } from 'framer-motion'
import React from 'react'

// Motion Button wrapper
interface MotionButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' | 'onDrop'> {
  children: React.ReactNode
  whileHover?: any
  whileTap?: any
}

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, whileHover, whileTap, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {children}
    </motion.button>
  )
)
MotionButton.displayName = 'MotionButton'

// Motion Div wrapper
interface MotionDivProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' | 'onDrop'> {
  children: React.ReactNode
  whileHover?: any
  whileTap?: any
  initial?: any
  animate?: any
  exit?: any
  transition?: any
}

export const MotionDiv = React.forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, whileHover, whileTap, initial, animate, exit, transition, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={whileHover}
      whileTap={whileTap}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  )
)
MotionDiv.displayName = 'MotionDiv' 