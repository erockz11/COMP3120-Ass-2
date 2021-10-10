import axios from 'axios'
const baseUrl = 'http://www.boredapi.com/api/activity/'

const getRandom = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getType = (type) => {
    const request = axios.get(baseUrl + '?type=' + type)
    return request.then(response => response.data)
}

export default { getRandom, getType }