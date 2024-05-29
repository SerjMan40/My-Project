import {v4 as uuidv4} from 'uuid'

import imgDataGenerator from './imgDataGenerator'
import {ArrOfObj, ExistingObject} from '../types/interfaces'

const imgArrGenerator = async (quantity: number): Promise<ArrOfObj[]> => {
  const imgArr: ArrOfObj[] = []

  for (let count = 0; quantity > imgArr.length; count++) {
    try {
      const pictureData: ExistingObject = await imgDataGenerator()

      imgArr.push({
        ...pictureData,
        uuId: uuidv4(),
        isChanged: false,
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return imgArr
}

export default imgArrGenerator
