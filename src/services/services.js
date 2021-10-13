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
    const request = axios.get(baseUrl + '?minprice=0&maxprice=' + price)
    return request.then(response => response.data)
}

const login = ({username, password}) => {

    return axios.post('http://localhost:3001/api/login', {username, password})
                .then(response => response.data)
}

const addActivity = (activity, user) => {
    console.log("calling function in services.js with activity:", activity);
    console.log("and user", user);
    return axios.post(`http://localhost:3001/api/addactivity/${user.username}`)
                .then(response => response.data)
}

export default { getRandom, getType, getParticipants, getPrice, login, addActivity }