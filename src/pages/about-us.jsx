import { PopupMenu } from "../cmps/popup-menu";

// import { Link, useNavigate } from "react-router-dom"

export function AboutUs() {
    // const navigate = useNavigate()

    function onClick() {
        console.log('Clicked!');
        // <Link to="/">Home</Link>

    }
    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <PopupMenu title={<h1>Some Title</h1>} >
                <Text />
                <button onClick={onClick} >Back</button>
            </PopupMenu>
        </section>
    )
}


function Text() {
    return <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ad necessitatibus minima, officiis minus alias cupiditate nobis cumque facilis sunt. Repellat voluptates, nobis expedita asperiores saepe quibusdam repudiandae! Nulla, cum.</p>
}