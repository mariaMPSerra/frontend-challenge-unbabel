import axios from 'axios'

const URL = 'https://run.mocky.io/v3/ebac0b77-a220-46d3-963c-ae8881c7e4c3'

export const getTranscriptions = async () => {
  const response = await axios.get(URL)

  //the JSON Im receiving its not well formatted because the object keys doesnt have the ""
  //so because of that the JSON.parse() returns an error

  const cleanedJsonString = response.data
    .replace(/(\w+):/g, '"$1":') // Wrap keys in double quotes
    .replace(/'/g, '"') // Replace single quotes with double quotes

  const data = JSON.parse(cleanedJsonString)

  return data
}
