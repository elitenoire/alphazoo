import type { ComponentType } from 'react'
/**
 * Random shuffle an Array
 *
 * @param array Array to shuffle
 * @immutable
 */
export const shuffle = <T>(array: T[]) => {
  const newArray = array.slice()
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = temp
  }
  return newArray
}

/**
 * Returns the display name of a React component. Falls back to 'Component'.
 *
 * @param component React component
 *
 */
export const getDisplayName = <P>(component: ComponentType<P>): string => {
  if (typeof component === 'string') {
    return component
  }

  return (component.displayName ?? component.name) || 'Component'
}
