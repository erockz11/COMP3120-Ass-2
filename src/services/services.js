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
    return axios.post(`http://localhost:3001/api/addactivity/${user.username}`, activity)
                .then(response => response.data)
}

const getActivities = ({username}) => {
    return axios.get(`http://localhost:3001/api/myactivities/${username}`)
                .then(response => response.data)
}

const register = (user) => {
    return axios.post(`http://localhost:3001/api/register`, user)
                .then(response => response.data)
}

const completeActivity = (activity) => { //changed to post
    return axios.post(`http://localhost:3001/api/completeactivity`, {data: activity})
                .then(response => response.data)
}

const deleteActivity = (activity) => { 
    return axios.delete(`http://localhost:3001/api/myactivities/${activity.id}`)
                .then(response => response.data)
}

const getAllScores = () => {
    return axios.get('http://localhost:3001/api/leaderboard')
                .then(response => response.data)
}

export default { 
    getRandom, 
    getType, 
    getParticipants, 
    getPrice, 
    login, 
    addActivity, 
    getActivities,
    register,
    completeActivity,
    getAllScores,
    deleteActivity
}