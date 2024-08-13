// Copyright © 2024 Navarrotech

/* eslint i18next/no-literal-string: 0 */

// JSX & React
import React from 'react'
import '@testing-library/jest-dom'

// Testing framework
import { describe, expect, it } from 'vitest'
import { act, render, screen, fireEvent } from '@testing-library/react'

// Components to test
import { AdvancedSelect } from '../src/index'

// Mock data
import * as mockData from './MockData.test'

describe('AdvancedSelect', () => {
  it('should render without crashing, using basic props', async () => {
    render(<AdvancedSelect
      options={mockData.basicStringOptions}
      onSelect={() => {}} >
      <button>Click me</button>
    </AdvancedSelect>
    )

    const button = screen.getByText('Click me')
    
    expect(button).toBeInTheDocument()
  })
  it('should render without crashing, using no props', async () => {
    // eslint-disable-next-line
    // @ts-ignore
    render(<AdvancedSelect>
      <button>Click me</button>
    </AdvancedSelect>
    )

    const button = screen.getByText('Click me')
    
    expect(button).toBeInTheDocument()
  })
  it('should open/close when clicking on the trigger', async () => {
    const { container } = render(<AdvancedSelect
      id="test-dropdown"
      options={mockData.mixedOptions}
      onSelect={() => {}} >
      <button>Click me</button>
    </AdvancedSelect>
    )

    const button = screen.getByText('Click me')

    const dropdown = container.getElementsByClassName('advanced-dropdown')[0]
    expect(dropdown).toBeDefined()
    expect(dropdown).toBeInTheDocument()
    expect(dropdown).not.toHaveClass('is-active')
    await act(async () => {
      await button.click()
    })
    expect(dropdown).toHaveClass('is-active')
    await act(async () => {
      await button.click()
    })
    expect(dropdown).not.toHaveClass('is-active')
  })
  it('should close when clicked outside', async () => {
    const { container } = render(<div className="container">
      <AdvancedSelect
        id="test-dropdown"
        options={mockData.mixedOptions}
        onSelect={() => {}} >
        <button>Click me</button>
      </AdvancedSelect>
      <button className="button is-primary" type="button">
        <span>A distraction</span>
      </button>
    </div>
    )

    const button = screen.getByText('Click me')

    const dropdown = container.getElementsByClassName('advanced-dropdown')[0]
    expect(dropdown).toBeDefined()
    expect(dropdown).toBeInTheDocument()
    expect(dropdown).not.toHaveClass('is-active')

    // Open the dropdown
    await act(async () => {
      await button.click()
    })
    expect(dropdown).toHaveClass('is-active')

    const distraction = screen.getByText('A distraction')
    expect(distraction).toBeDefined()
    expect(distraction).toBeInTheDocument()
    
    // Click outside the dropdown
    await act(async () => {
      await distraction.click()
    })

    expect(dropdown).not.toHaveClass('is-active')
  })
  it('escape key should close the content', async () => {
    const { container } = render(<AdvancedSelect
      id="test-dropdown"
      options={mockData.mixedOptions}
      onSelect={() => {}} >
      <button>Click me</button>
    </AdvancedSelect>
    )

    const button = screen.getByText('Click me')

    const dropdown = container.getElementsByClassName('advanced-dropdown')[0]
    expect(dropdown).toBeDefined()
    expect(dropdown).toBeInTheDocument()
    expect(dropdown).not.toHaveClass('is-active')

    // Open the dropdown
    await act(async () => {
      await button.click()
    })
    expect(dropdown).toHaveClass('is-active')
    
    // Fire an escape key event
    const search = screen.getByRole('search')
    expect(search).toBeDefined()
    expect(search).toBeInTheDocument()

    await act(async () => {
      await fireEvent(
        search,
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      )
    })

    expect(dropdown).not.toHaveClass('is-active')
  })
  it('should be searchable', async () => {
    const { container } = render(<AdvancedSelect
      id="test-dropdown"
      options={mockData.basicStringOptions}
      onSelect={() => {}} >
      <button>Click me</button>
    </AdvancedSelect>
    )

    const button = screen.getByText('Click me')

    const dropdown = container.getElementsByClassName('advanced-dropdown')[0]
    expect(dropdown).toBeDefined()
    expect(dropdown).toBeInTheDocument()
    expect(dropdown).not.toHaveClass('is-active')

    // Open the dropdown
    await act(async () => {
      await button.click()
    })
    expect(dropdown).toHaveClass('is-active')
    
    const search = screen.getByRole('search')
    expect(search).toBeDefined()
    expect(search).toBeInTheDocument()

    const one = screen.getByText('one')
    expect(one).toBeDefined()
    expect(one).toBeInTheDocument()
  
    const two = screen.getByText('two')
    expect(two).toBeDefined()
    expect(two).toBeInTheDocument()
  
    // Search for "Cats"
    await act(async () => {
      await fireEvent.change(search, { target: { value: 'one' }, bubbles: true })
    })

    const onePostSearch = screen.getByText('one')
    expect(onePostSearch).toBeDefined()
    expect(onePostSearch).toBeInTheDocument()
  
    let twoPostSearch: HTMLElement | undefined
    try {
      twoPostSearch = screen.getByText('two')
    }
    // eslint-disable-next-line
    catch (error: any) {
      twoPostSearch = undefined
    }
    expect(twoPostSearch).toBeUndefined()
  })
})
