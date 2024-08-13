// Copyright © 2024 Navarrotech

// Typescript
import type { AdvancedSelectOptionObject, AdvancedSelectProps } from './types'

// Core utility
import { useState, useEffect, useRef, useMemo } from 'react'

// Using lodash-es for tree shaking support
import { isEqual } from 'lodash-es'

// Search library
import Fuse from 'fuse.js'

// Utility subfunctions
import { getOption } from './utility/get-option'
import { ShowIcon } from './utility/show-icon'

// Local iconography
import MagnifyingGlass from './icons/magnifying-glass-solid.svg?react'
import CheckMark from './icons/check-solid.svg?react'

import styles from './styles.module.sass'

const defaultFuseSearchOptions = {
  threshold: 0.3
}

const defaultEmptyValue: string[] = []

export function AdvancedSelect(props: AdvancedSelectProps) {
  // Destructure props
  const {
    onSelect,
    multiple,
    className='',
    noResultsText='No results found',
    children
  } = props

  let value = props.value || defaultEmptyValue
  if (typeof value === 'string') {
    value = [ value ]
  }

  const options = props.options?.map(option => {
    if (typeof option === 'string') {
      return { value: option }
    }
    return option
  })

  // isActive is used to toggle the dropdown open/closed
  const [ isActive, setIsActive ] = useState(false)

  // Selected index is used to highlight the dropdown item & navigate using arrow keys + enter key
  const [ selectedIndex, setSelectedIndex ] = useState<number>(0)

  // Search term is used to filter the dropdown options by text
  const [ searchTerm, setSearchTerm ] = useState('')

  // Selected values are used to manage the selected values in the dropdown
  const [ selectedValues, setSelectedValues ] = useState<string[]>(value)

  const fuse = useMemo(() => {
    return new Fuse(options as any, {
      keys: [ 'text', 'value' ],
      ...defaultFuseSearchOptions,
      ...(props.searchOptions || {}),
      includeMatches: true
    })
  }, [ options, props.searchOptions ])

  // References for dropdown & search input
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  // When the search changes, we reset the selected index
  useEffect(() => {
    setSelectedIndex(0)
  }, [ searchTerm ])

  // When the dropdown is disabled, we close the dropdown
  useEffect(() => {
    if (props.disabled) {
      setIsActive(false)
    }
  }, [ props.disabled ])

  // When the value from the props changes, we update the selected values
  useEffect(() => {
    // If the prop value has actually changed, we should update the selected values accordingly
    if (!isEqual(value, selectedValues)) {
      setSelectedValues(value)
    }
    // Eslint disable next line because we don't want to trigger this effect when the value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ])

  // When the dropdown is active, we focus on the search input
  useEffect(() => {
    searchRef.current?.focus()
  }, [ isActive ])

  // A callback that handles the search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // A callback that handles the selection of an option
  const handleSelect = (option: AdvancedSelectOptionObject) => {
    if (!multiple) {

      // Close the dropdown on single select
      setSelectedValues([ option.value ])
      onSelect(option)
      setIsActive(false)
      triggerRef.current?.focus()

      return
    }

    setSelectedValues((prevValues) =>
      prevValues.includes(option.value)
        ? prevValues.filter((value) => value !== option.value)
        : [ ...prevValues, option.value ]
    )

    onSelect(option)
  }

  // A callback that handles the dropdown trigger click
  const handleDropdownClick = () => {
    if (props.disabled && !isActive) {
      return
    }
    setIsActive(!isActive)
  }

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) {
      return options
    }

    const results = fuse.search(searchTerm)
    return results.map((result) => options[result.refIndex])
  }, [ fuse, searchTerm, options ])

  // When the dropdown is active, we add event listeners for click outside & arrow keys
  useEffect(() => {
    // Handle click outside the dropdown that closes the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    // Handle arrow keys for navigation & enter key for selection
    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredOptions.length - 1)
        )
      }
      else if (event.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      }
      else if (event.key === 'Enter') {
        event.stopPropagation()
        event?.stopImmediatePropagation()
        event.preventDefault()
        const curr = filteredOptions[selectedIndex]
        if (curr) {
          handleSelect(curr)
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleArrowKeys)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleArrowKeys)
    }
    // Disabling eslint, because handleSelect is defined in this scope and will always re-render this function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ dropdownRef.current, filteredOptions, selectedIndex ])

  let rootClassName = `dropdown advanced-dropdown ${styles.dropdown} ${className}`
  let searchClassName = ''
  if (isActive) {
    rootClassName += ' is-active'
  }
  if (props.right) {
    rootClassName += ' is-right'
  }
  if (props.small) {
    rootClassName += ' is-small'
    searchClassName += ' is-small'
  }
  if (props.medium) {
    rootClassName += ' is-medium'
    searchClassName += ' is-medium'
  }
  if (props.large) {
    rootClassName += ' is-large'
    searchClassName += ' is-large'
  }

  // Safety check
  if (!options || !options.length) {
    console.error('AdvancedSelect: No options prop provided, only rendering children elements')
    return children
  }
  if (!value) {
    console.error('AdvancedSelect: No value prop provided, only rendering children elements')
    return children
  }

  return (
    <div id={props.id} className={rootClassName} ref={dropdownRef}>
      <div
        className='dropdown-trigger'
        onClick={handleDropdownClick}
        ref={triggerRef}
        // If the user is using the keyboard and happens to tab into the dropdown
        // We can allow opening the dropdown with the enter key
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            if (props.disabled && !isActive) {
              return
            }
            setIsActive(true)
            event.stopPropagation()
            event.preventDefault()
          }
        }}
      >{
          children
        }</div>
      <div className='dropdown-menu'>
        <div className='dropdown-content'>
          {
            props.title
              ? <div className='dropdown-item mb-2'>
                <ShowIcon icon={props.icon} />
                <h3 className='title is-size-4'>{ props.title }</h3>
              </div>
              : <></>
          }
          <div className={'dropdown-item ' + styles.searchDropdownItem}>
            <div className='field'>
              <div className='control has-icons-left'>
                <input
                  ref={searchRef}
                  className={`input ${styles.search} ${searchClassName}`}
                  role='search'
                  type='text'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setIsActive(false)
                    }

                    const curr = filteredOptions[0]
                    if (event.key === 'Enter' && curr) {
                      handleSelect(curr)
                    }
                  }}
                />
                <span className='icon is-left'>
                  <MagnifyingGlass className={styles.localIcon} />
                </span>
                { searchTerm
                  ? <div className={styles.clear}>
                    <span className='delete' onClick={(event) => {
                      setSearchTerm('')
                      event.preventDefault()
                      event.stopPropagation()
                      searchRef.current?.focus()
                    }} />
                  </div>
                  : <></>
                }
              </div>
            </div>
          </div>
          <div className='dropdown-wrapper'>
            {filteredOptions.map((option, index) => {

              const key = getOption(option, 'key')
              const val = getOption(option, 'value')
              const text = getOption(option, 'text')
              const icon = getOption(option, 'icon', true)

              const remainingProps: Record<string, any> = { ...option }
              delete remainingProps.key
              delete remainingProps.value
              delete remainingProps.text
              delete remainingProps.icon
              delete remainingProps.onClick
              delete remainingProps.className

              const selected = selectedValues.includes(val)
              const highlighted = index === selectedIndex && !selected

              let className = `dropdown-item icon-text is-clickable ${styles.dropdownItem}`
              if (highlighted) {
                className += ` ${styles.highlighted}`
              }
              if (selected) {
                className += ' is-active'
              }
              if (option?.className) {
                className += ` ${option.className}`
              }

              return (
                <a
                  key={key}
                  className={className}
                  onClick={(event) => {
                    handleSelect(option)
                    option?.onClick?.(event)
                  }}
                  { ...remainingProps }
                >
                  {
                    multiple && selected
                      ? <span className='icon is-small'>
                        <CheckMark className={styles.localIcon} />
                      </span>
                      : <ShowIcon icon={icon} />
                  }
                  <span>{ text }</span>
                </a>
              )
            })}
            { filteredOptions.length === 0
              ? typeof noResultsText === 'string'
                ? <div className='dropdown-item has-text-centered'>
                  <span>{ noResultsText }</span>
                </div>
                : noResultsText
              : <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedSelect
