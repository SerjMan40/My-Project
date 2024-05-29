import {ExistingObject} from '../types/interfaces'
import randomNumber from './randomNumber'

const imgDataGenerator = async (): Promise<ExistingObject> => {
  const ramNum = randomNumber(1000)
  try {
    const response = await fetch(`https://picsum.photos/id/${ramNum}/info`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    const {id, author} = data
    const pictureData: ExistingObject = {
      id,
      author,
      url: `https://picsum.photos/id/${id}/200`,
    }
    return pictureData
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export default imgDataGenerator
