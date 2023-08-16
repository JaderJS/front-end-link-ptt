import React, { useState } from "react"
import { Button } from "reactstrap"
import api from "../services/axios"
import { useNavigate } from 'react-router-dom';


import "./styles.css"

export const Login = () => {
    const [data, setData] = useState()
    const navigate = useNavigate();

    const handle = (event) => {
        setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
    }

    const login = async () => {
        await api.post('api/profile/login', data).then((response) => {
            localStorage.setItem('authT', response.data?.token);
            if (response.status === 200) {
                return navigate('/home');
            }
            throw new Error("Login error")
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <div className='gradient-background' >
                <div className="card" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <img style={{ maxHeight: "8rem" }} src="https://img.freepik.com/free-vector/technological-logo-design_1424-39.jpg?w=826&t=st=1691510620~exp=1691511220~hmac=dae0206cf51c459472b4cbd0fbf2e9a37e58985a591fd2cc76becd85d4381703" className="img-thumbnail" alt="..."></img>
                        <form>
                            <div className="form-floating my-3">
                                <input name="email" className="form-control" placeholder="Email" onChange={handle} />
                                <label for="floatingInput">Email</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type='password' name="password" className="form-control" placeholder="Senha" onChange={handle} />
                                <label for="floatingInput">Senha</label>
                            </div>
                            <Button className="my-3" onClick={() => login()}>Login</Button>
                            <a href="#" style={{ all: "unset" }}><p>Esqueceu sua senha?</p></a>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}