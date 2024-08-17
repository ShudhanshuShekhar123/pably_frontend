import React from 'react'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
    return (
        <div>
            <h1 className='text-3xl'>Page Not Found</h1>
            <Link to="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Back to Homepage
                </button>
                </Link>
        </div>

    )
}

export default Pagenotfound