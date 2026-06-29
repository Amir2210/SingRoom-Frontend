import { userService } from '../../services/user.service.js';
import { socketService, SOCKET_EMIT_ADMIN_SET_SONG, SOCKET_EMIT_ADMIN_SEARCH_FOR_NEW_SONG } from '../../services/socket.service.js';
import { store } from '../store.js';

import { LOADING_DONE, LOADING_START, SET_SONG } from "../reducers/system.reducer.js";
import { SET_USER, } from "../reducers/user.reducer.js";

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function setSong(song, isAdmin) {
    try {
        store.dispatch({
            type: SET_SONG,
            song
        })
        if (isAdmin) {
            socketService.emit(SOCKET_EMIT_ADMIN_SET_SONG, song)
        }
    } catch (error) {
        console.log('cannot set song')
        throw error
    }
}

export async function goBackPickSong() {
    try {
        socketService.emit(SOCKET_EMIT_ADMIN_SEARCH_FOR_NEW_SONG, null)
    } catch (error) {
        console.log('cannot pick a new song')
        throw error
    }
}
