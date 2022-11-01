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
