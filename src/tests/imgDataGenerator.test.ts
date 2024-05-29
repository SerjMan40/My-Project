import { ExistingObject } from '../types/interfaces'
import imgDataGenerator from '../utils/imgDataGenerator'

describe('imgDataGenerator', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should fetch image data correctly', async () => {
    const expectedData: ExistingObject = {
      id: '123',
      url: 'https://picsum.photos/id/123/200',
      author: 'Mark Doda',
    }

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({id: expectedData.id, author: expectedData.author, url: expectedData.url}),
    } as any)

    const result = await imgDataGenerator()

    expect(result).toEqual(expectedData)
  })

  it('should handle error when fetching image data', async () => {
    const status = 404
    const expectedError = new Error(`HTTP error! Status: ${status}`)
    
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status,
    } as any)


    await expect(imgDataGenerator()).rejects.toThrow(expectedError)
  })
})
