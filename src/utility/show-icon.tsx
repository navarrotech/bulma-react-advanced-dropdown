// Copyright © 2024 Navarrotech

import type { ReactNode } from 'react'

import styles from '../styles.module.sass'

// A helper component to show the icon
type ShowIconProps = {
  icon: string | ReactNode | undefined
  alt?: string
}
export function ShowIcon({ icon, alt = 'icon' }: ShowIconProps) {
  if (!icon) {
    return <></>
  }
  return typeof icon === 'string'
    ? <img className={styles.customIconAsImage} src={icon} alt={alt} />
    : icon
}
