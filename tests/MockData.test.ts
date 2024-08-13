// Copyright © 2024 Navarrotech

import type {
  AdvancedSelectOption
} from '../src/types'

export const basicStringOptions: AdvancedSelectOption[] = [
  'one', 'two', 'three'
]

export const mixedOptions: AdvancedSelectOption[] = [
  'Dogs',
  'Cats',
  'Birds',
  'Penguins',
  { text: 'Guinea Pigs', value: 'guinea' }
]

export const flagOptions: AdvancedSelectOption[] = [
  { key: 'en', value: 'en', text: 'US English', icon: 'https://flagsapi.com/US/flat/64.png' },
  { key: 'es', value: 'es', text: 'Spanish', icon: 'https://flagsapi.com/ES/flat/64.png' },
  { key: 'fr', value: 'fr', text: 'French', icon: 'https://flagsapi.com/FR/flat/64.png' },
  { key: 'de', value: 'de', text: 'German', icon: 'https://flagsapi.com/DE/flat/64.png' },
  { key: 'ja', value: 'ja', text: 'Japanese', icon: 'https://flagsapi.com/JP/flat/64.png' },
  { key: 'zh', value: 'zh', text: 'Chinese', icon: 'https://flagsapi.com/CN/flat/64.png' }
]
