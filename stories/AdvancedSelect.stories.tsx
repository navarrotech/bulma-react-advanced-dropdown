// Copyright © 2024 Navarrotech

/* eslint i18next/no-literal-string: 0 */

import React from 'react'
import { AdvancedSelect } from '../src'
import './index.sass'

export default {
  title: 'AdvancedSelect',
  component: AdvancedSelect
}

const PetChooserScenario = (args: Record<string, any>) => {
  const [ value, setValue ] = React.useState('en')

  return (
    <AdvancedSelect
      options={[
        'Dogs',
        'Cats',
        'Birds',
        'Penguins',
        { text: 'Guinea Pigs', value: 'guinea' }
      ]}
      value={value}
      onSelect={(v) => {
        setValue(v.value)
      }}
      {...args}
    >
      <button className="button is-white" type="button">
        <span>Choose your favorite animals</span>
      </button>
    </AdvancedSelect>
  )
}

export const PetChooser = PetChooserScenario.bind({})
PetChooser.args = {
  value: '',
  multiple: true
}

const LanguageChooserScenario = (args: Record<string, any>) => {
  const [ value, setValue ] = React.useState('en')

  const options = [
    { key: 'en', value: 'en', text: 'US English', icon: 'https://flagsapi.com/US/flat/64.png' },
    { key: 'es', value: 'es', text: 'Spanish',    icon: 'https://flagsapi.com/ES/flat/64.png' },
    { key: 'fr', value: 'fr', text: 'French',     icon: 'https://flagsapi.com/FR/flat/64.png' },
    { key: 'de', value: 'de', text: 'German',     icon: 'https://flagsapi.com/DE/flat/64.png' },
    { key: 'ja', value: 'ja', text: 'Japanese',   icon: 'https://flagsapi.com/JP/flat/64.png' },
    { key: 'zh', value: 'zh', text: 'Chinese',    icon: 'https://flagsapi.com/CN/flat/64.png' }
  ]

  const selected = options.find(option => option.value === value)

  return (
    <AdvancedSelect
      title="Select language"
      options={options}
      value={value}
      onSelect={(v) => {
        setValue(v.value)
      }}
      {...args}
    >
      <button className="button is-white" type="button">
        <span>Chosen language: { selected?.text || 'Undefined' }</span>
      </button>
    </AdvancedSelect>
  )
}

export const LanguageChooser = LanguageChooserScenario.bind({})
LanguageChooser.args = {
  multiple: false,
  className: ''
}
