
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
// import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY).then((toys) => {
        if (filterBy.maxPrice) toys = toys.filter(toy => (toy.price <= filterBy.maxPrice))
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            toys = toys.filter(toy => regExp.test(toy.name))
            console.log('toys:', toys)
        }
        return toys
    })
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

// function query(filterBy = {}) {
//     return httpService.get(BASE_URL, filterBy)
// }

// function getById(toyId) {
//     return httpService.get(BASE_URL + toyId)
// }

// function remove(toyId) {
//     // return Promise.reject('Not now!')
//     return httpService.delete(BASE_URL + toyId)
// }
// function save(toy) {
//     if (toy._id) {
//         return httpService.put(BASE_URL, toy)
//     } else {
//         // when switching to backend - remove the next line
//         return httpService.post(BASE_URL, toy)
//     }
// }

function getEmptyToy() {
    return {
        name: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(10, 90),
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: 40 }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


