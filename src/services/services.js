import axios from 'axios'
const boredUrl = 'http://www.boredapi.com/api/activity/'
const internalApi = '/api/'

//get random activity
const getRandom = () => {
    const request = axios.get(boredUrl)
    return request.then(response => response.data)
}

//get activity by category
const getType = (type) => {
    const request = axios.get(boredUrl + '?type=' + type)
    return request.then(response => response.data)
}

//get activity by participants
const getParticipants = (participants) => {
    const request = axios.get(boredUrl + '?participants=' + participants)
    return request.then(response => response.data)
}

//get activity by price range
const getPrice = (price) => {
    const request = axios.get(boredUrl + '?minprice=0&maxprice=' + price)
    return request.then(response => response.data)
}

//login with given username and password
const login = ({username, password}) => {
    return axios.post(internalApi + 'login', {username, password})
                .then(response => response.data)
}

//add current activity
const addActivity = (activity, user) => {
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.post(internalApi + `addactivity/${user.username}`, activity, config)
                .then(response => response.data)
}

//get given user's activities
const getActivities = ({username}, user) => {
    // const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.get(internalApi + `myactivities/${username}`)
                .then(response => response.data)
}

//register new user
const register = (user) => {
    return axios.post(internalApi + `register`, user)
                .then(response => response.data)
}

//complete clicked activity
const completeActivity = (activity, user) => {
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.post(internalApi + `completeactivity`, {data: activity}, config)
                .then(response => response.data)
}

//delete clicked activity
const deleteActivity = (activity, user) => {
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.delete(internalApi + `myactivities/${activity.id}`, config)
                .then(response => response.data)
}

//get leaderboard values
const getAllScores = () => {
    return axios.get(internalApi + 'leaderboard')
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