import axios from 'axios'
const baseUrl = 'http://www.boredapi.com/api/activity/'

const getRandom = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getRandom }