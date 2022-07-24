import supertest from 'supertest'
import app from '../index'
import path from 'path'
import fs from 'fs'
import { imgResize } from '../util/process'

// create a request object
const request = supertest(app)

const testId = "santamonica.jpg"
const testWi = 1500
const testHi = 600

describe('Testing Endpoint Response', () => {
  it('testing api endpoint', async () => {
    const response = await request.get(`/api/image?id=${testId}&width=${testWi}&height=${testHi}`)
    expect(response.status).toBe(200)
  })
})

describe('Testing Values', () => {
  it('testing id', async () => {
    const wrongId = "none.jpg"
    const response = await request.get(`/api/image?id=${wrongId}&width=${testWi}&height=${testHi}`)
    expect(response.text).toBe("image not found")
  })

  it('testing width value', async () => {
    const response = await request.get(`/api/image?id=${testId}&width=-400&height=${testHi}`)
    expect(response.text).toBe("Enter a valid width and height")
  })

  it('testing height value', async () => {
    const response = await request.get(`/api/image?id=${testId}&width=${testWi}&height=-400`)
    expect(response.text).toBe("Enter a valid width and height")
  })
})

describe('Testing if width and height are existed or not', () => {
  it('testing empty width', async () => {
    const response = await request.get(`/api/image?id=${testId}&height=${testHi}`)
    expect(response.text).toBe('cannot be empty, set width and height')
  })

  it('testing empty height', async () => {
    const response = await request.get(`/api/image?id=${testId}&width=${testWi}`)
    expect(response.text).toBe('cannot be empty, set width and height')
  })
})

describe("test functions", () => {
  it("testing if image will be existed or not", async () => {
    const test2Id = "encenadaport.jpg"
    const test2Wi = 1555
    const test2Hi = 666
    const testPath = path.normalize(
      __dirname + '../../../images/thumb/' + test2Id + '-' + test2Wi + '-' + test2Hi + '.jpg'
    );
    await imgResize(test2Id, test2Wi, test2Hi)
    expect(fs.existsSync(testPath)).toBeTrue()
  })
})
