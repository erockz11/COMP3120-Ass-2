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

const getParticipants = (participants) => {
    const request = axios.get(baseUrl + '?participants=' + participants)
    return request.then(response => response.data)
}

const getPrice = (price) => {
    const request = axios.get(baseUrl + '?price=' + price)
    return request.then(response => response.data)
}

export default { getRandom, getType, getParticipants, getPrice }