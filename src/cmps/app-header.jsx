// const { NavLink, Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_CART_IS_SHOWN } from '../store/toy.reducer.js'
import { logout } from '../store/user.action.js'

import { LoginSignup } from './login-signup.jsx'
import { Link, NavLink } from 'react-router-dom'

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)


    // TODO: get from storeState

    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('Cannot logout')
            })
    }

    return (
        <header className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                {/* eslint-disable-next-line */}
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: SET_CART_IS_SHOWN, isCartShown: true })
                }}>
                    🛒 Cart
                </a>
            </nav>
            <h1>My App</h1>

            {user && <section className="user-info">
                <p>
                    <Link to={`/user/${user._id}`}>{user.fullname}</Link>
                    {/* <span>${user.score.toLocaleString()}</span> */}
                </p>

                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup dispatch={dispatch} />
            </section>}
        </header>
    )
}

