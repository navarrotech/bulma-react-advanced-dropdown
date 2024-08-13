// Copyright © 2024 Navarrotech

// A helper function to get the option value

import type { AdvancedSelectOptionObject } from '../types'

// This ensures that the value is always returned correctly
export function getOption(options: AdvancedSelectOptionObject, key: string, defaultUndefined: boolean = false) {
  if (options[key] === undefined) {
    if (defaultUndefined) {
      return undefined
    }
    return options.value
  }

  return options[key]
}
