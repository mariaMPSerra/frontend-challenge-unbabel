import axios from 'axios'

const URL = 'https://run.mocky.io/v3/ebac0b77-a220-46d3-963c-ae8881c7e4c3'

export const updateTranscriptions = async (data) => {
  const newData = JSON.stringify(data)

  const response = await axios.post(URL, newData)

  return response
}
