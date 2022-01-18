import React, { useContext, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useHistory } from "react-router"

const Register = () => {
    let history = useHistory()
    const [input, setInput] = useState({ name: "", email: "", password: "" })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(input)
        axios.post("https://backendexample.sanbersy.com/api/register", {
            name : input.name,
            email : input.email,
            password : input.password
        }).then(
            () => {
                 //history.push('/login')
            }
        ).catch((err) => {
            alert(err)
        })
    }

    const handleChange = (event) => {
        let value = event.target.value
        let name = event.target.name

        setInput({ ...input, [name]: value })
    }

    return (
        <>
            <div style={{ margin: "0 auto", width: "25%", padding: "50px" }}>
                <form onSubmit={handleSubmit}>
                    <label>name: </label>
                    <input type="text" name="name" onChange={handleChange} value={input.name} />
                    <br />
                    <label>email: </label>
                    <input type="email" name="email" onChange={handleChange} value={input.email} />
                    <br />
                    <label>Password: </label>
                    <input type="password" name="password" onChange={handleChange} value={input.password} />
                    <br />
                    <button>Register</button>
                </form>
            </div>
        </>
    )
}

export default Register