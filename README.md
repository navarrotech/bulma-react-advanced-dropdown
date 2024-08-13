# Bulma React Advanced Dropdown

A React.js component that:
- Is fuzzy searchable with Fuse.js built-in
- Can handle multiple selections
- Has icon support per item
- Can be navigated with keyboard
- Looks awesome in mobile with a fullscreen view
- Works with color themes
- Is light-weight

## Installation
To add to your project, just use:
```bash
npm install @navarrotech/bulma-react-advanced-dropdown
# or
yarn add @navarrotech/bulma-react-advanced-dropdown
```

## Examples
Multi selection:
![Multi Selection](/examples/multi-select.png)
Searchable:
![Searchable](/examples/searchable.png)
Goes full screen on mobile:
![Mobile](/examples/mobile.png)

## Usage
Here's an example of using it with just it's search functionality and base functionality:
```typescript
import type { AdvancedSelectOption } from '@navarrotech/bulma-react-advanced-dropdown';
import { AdvancedSelect } from '@navarrotech/bulma-react-advanced-dropdown';

function MyLayout() {

  // Only the "value" option is required
  // Key, text, and icon are used to set the attributes correctly.
  // Key === Used as the react.js key to distinguish correct vs incorrect item. If not set, value will be used instead.
  // Value === Underlying value that will be returned on selection.
  // Text === User facing attribute, if not set it will show the value instead.
  // All other attributes will appear in the HTML option.
  // For example "id" can be set and will appear in the <option /> HTML tag output.
  const options: AdvancedSelectOption[] = [
    { key: "en", value: "en-US", text: "US English", icon: 'https://flagsapi.com/US/flat/64.png' },
    { key: "es", value: "es-ES", text: "Spanish",    icon: 'https://flagsapi.com/ES/flat/64.png' },
    { key: "fr", value: "fr-FR", text: "French",     icon: 'https://flagsapi.com/FR/flat/64.png' },
    { key: "de", value: "de-DE", text: "German",     icon: 'https://flagsapi.com/DE/flat/64.png' },
    { key: "ja", value: "ja-JP", text: "Japanese",   icon: 'https://flagsapi.com/JP/flat/64.png' },
    { key: "zh", value: "zh-CN", text: "Chinese",    icon: 'https://flagsapi.com/CN/flat/64.png' },
  ]

  return (
    <AdvancedSelect
      title="Select a language"
      onSelect={(value) => {
        console.log("Chosen language: ", value)
      }}
      options={options}
      value={language}
    >
      // The component's children are used as the dropdown's trigger:
      <span className="icon">
        <FontAwesomeIcon icon={faGlobeAmericas} />
      </span>
      <span>{ value }</span>
    </AdvancedSelect>
  )
}
```

If you want to spice it up a little, we can have the user select multiple items too:
```typescript

import type { AdvancedSelectOption } from '@navarrotech/bulma-react-advanced-dropdown';
import { AdvancedSelect } from '@navarrotech/bulma-react-advanced-dropdown';

function MyLayout() {

  // You also don't have to pass an array of objects, you could just pass an array of strings!
  const options: AdvancedSelectOption[] = [
    "dogs",
    "cats",
    "birds",
    "penguins",
    // Or get funky and mix objects with strings
    { text: "Guinea Pigs", value: "guinea" }
  ]

  return (
    <AdvancedSelect
      multiple={true}
      title="Select your favorite household pets"
      onSelect={(value) => {
        // Value will be an array, because the "multiple" attribute is set
        console.log("Chosen pets: ", pets.join(', '))
      }}
      options={options}
      value={pet}
    >
      <span>Choose your favorite pet animal!</span>
    </AdvancedSelect>
  )
}
```

## Fuzzy/smart searching
Fuzzy search matching is done through [Fuse.js](https://www.fusejs.io/), a powerful & lightweight framework for fuzzy searching

## Available props

| Prop  | Expected Value Type | Description |
| ------------- | ------------- | ------------- |
| Options | AdvancedSelectOption[] | An array of either strings or objects |
| onSelect | event callback | When the user makes a choice, this will return an object of their selection |
| multiple | boolean | When set, the user can select multiple choices |
| title | string | A title will be shown on top of the dropdown content, before the search bar |
| noResultsText | string or ReactNode | Content to show when a user makes a search that filters all results |
| value | string array or string | The selection of option values that the state has |
| icon | string or ReactNode | An icon to show to the left of the title. This will only appear if using the title |
| searchOptions | IFuseOptions | Optional Fuse.js settings that you can set to alter how Fuse.js performs |
| id | string | Applies an id to the root of the dropdown |
| className | string | Applies the root dropdown any optional classname. Works with bulma dropdown class name modifiers |
| disabled | boolean | Will disable the dropdown, preventing it from opening and will close it if open while set disabled |
| small | boolean | Sets the size of the searchbar to be small. You will still need to adjust your trigger separately, as it's a child component |
| medium | boolean | Sets the size of the searchbar to be medium. You will still need to adjust your trigger separately, as it's a child component |
| large | boolean | Sets the size of the searchbar to be large. You will still need to adjust your trigger separately, as it's a child component |
| right | boolean | Right aligns the dropdown to the child trigger component, same as adding 'is-right' onto a Bulma dropdown |

## Contributing
To contribute, fork this repository and make your changes!

Use [storybook](https://storybook.js.org/) for development, there's no Vite HTML page.

When it's time to pull request, pull requests are automatically tested by Github Actions for linting, unit tests, and buildability.

All new functionality is expected to have unit tests written with them.

There's no need to worry about including a dist/ folder in your PR, as this is automatically handled by the github action.

If your pull request is merged, it will be automatically added to npm through the github action, so please ensure that your package.json version is appropriately modified!
