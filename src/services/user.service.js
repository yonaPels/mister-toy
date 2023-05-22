// import axios from 'axios'
import { storageService } from './async-storage.service.js'
// import { httpService } from './http.service.js'

const STORAGE_KEY = 'userDB'
const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore
}

window.us = userService

// function getById(userId) {
//     return httpService.get(BASE_URL + userId)
// }

// function login({ username, password }) {
//     return httpService.post(BASE_URL + 'login', { username, password })
//         .then(user => {
//             if (user) return _setLoggedinUser(user)
//         })
// }

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

// function signup({ username, password, fullname }) {
//     const user = { username, password, fullname, score: 10000 }
//     return httpService.post(BASE_URL + 'signup', user)
//         .then(_setLoggedinUser)
// }

function updateScore(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.score + diff < 0) return Promise.reject('No credit')
            user.score += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.score
                })
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

// function logout() {
//     return httpService.post(BASE_URL + 'logout')
//         .then(() => {
//             sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
//         })
// }

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, activities: [] }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



