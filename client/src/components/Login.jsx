import {useState} from 'react'

export const Login = ({onSubmit}) => {
    const [username, setUsername] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(username)
    }

    return (
        <>
            <h1>Welcome</h1>
            <p>What should people call you?</p>
            <form onSubmit={handleSubmit}>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
                <input type="submit"/>
            </form>
        </>
    )
}

