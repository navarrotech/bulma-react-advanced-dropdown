// Copyright © 2024 Navarrotech

// Types
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import type { IFuseOptions } from 'fuse.js'

export type AdvancedSelectOptionObject = {
  icon?: ReactNode | string
  key?: string
  value: string
  text?: string

  // Uncommon but possible:
  id?: string
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement, MouseEvent>) => void
  className?: string
  [key: string]: any
}

export type AdvancedSelectOption = string | AdvancedSelectOptionObject

export type AdvancedSelectProps = {
  options: AdvancedSelectOption[]
  onSelect: (value: AdvancedSelectOptionObject) => void
  multiple?: boolean
  title?: string
  noResultsText?: string | ReactNode
  value?: string[] | string // Prop to accept value from parent
  icon?: ReactNode | string // Icon to show in the dropdown trigger

  // Settings:
  searchOptions?: IFuseOptions<string[]>

  // Options:
  id?: string
  className?: string

  disabled?: boolean

  small?: boolean
  medium?: boolean
  large?: boolean

  right?: boolean

  children: ReactNode // Dropdown trigger content
}
