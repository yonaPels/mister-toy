// import logo from '../assets/img/logo.png'

import { useDispatch, useSelector } from "react-redux"


export function HomePage() {

    const dispatch = useDispatch()
    const count = useSelector((storeState) => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff)
        // setCount(500)
        // setCount((prevCount) => prevCount + diff)
        // dispatch({ type: 'INCREMENT' })
        dispatch({ type: 'CHANGE_BY', diff })
    }


    const imgUrl = "logo.png"
    return (
        <section>
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 >
            {/* <img src="../assets/img/logo.png" alt="Logo" /> */}
            {/* <img src={logo} alt="Logo" /> */}
            {/* <img src={require('../assets/img/logo.png')} alt="Logo" /> */}
            {/* <img src={require(`../assets/img/${imgUrl}`)} alt="Logo" /> */}

        </section >
    )
}