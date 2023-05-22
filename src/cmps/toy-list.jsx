import PropTypes from 'prop-types'

import { ToyPreview } from "./toy-preview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCurt, txt = 'Mashu' }) {
    return <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview toy={toy} />

                <div>
                    <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                    <button onClick={() => { onEditToy(toy) }}>Edit</button>
                </div>

                <button className="buy" onClick={() => { addToCurt(toy) }}>
                    Add to Curt
                </button>
            </li>)}
    </ul>
}



ToyList.propTypes = {
    txt(props, propName, cmpName) {
        if (typeof props.txt !== 'string') {
            return new Error('Not a string!')
        }
    },
    nums: PropTypes.arrayOf(PropTypes.number)
}