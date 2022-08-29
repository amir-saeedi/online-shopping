import React from 'react'

import userContext from '../contexts/user';

export default function Login() {
    const { user, setUser } = React.useContext(userContext)
    const input = React.useRef()
    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(input.current.value)
        setUser(input.current.value)
    }
    return (
        <div>
            <form onSubmit={handelSubmit}>
                <input type="text" ref={input} />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}
