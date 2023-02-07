import React, { useEffect, useState } from 'react';
import {useCookies, Cookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './css/login.css';
import Swal from 'sweetalert2';

export default function Login(){

    let navigate = useNavigate();
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[token, setToken] = useCookies(['mytoken']);
//    const[isLogin, setLogin] = useState(false);
    const[users, setUsers] = useState([]);
    const[usuarios, setUsuarios] = useState([]);
    const[IdUser,setIdUser]=useCookies(['idUser']);// eslint-disable-next-line
    const[EsNuevo,setEsNuevo]=useCookies(['IsNew']);
    const[isNew, setIsNew] = useState(false);
    const cookies = new Cookies();

    useEffect(() => {
        // console.log(token.mytoken)
        loadUsers();
        loadUsuarios();
        cookies.remove('csrftoken'); 
        //console.log("use", users.username)
        if(token.mytoken !== undefined && isNew){
            //console.log("use", usuarios)
            navigate('/testAprendizaje/'+cookies.get('idUser')+'/');
        }
        if(token.mytoken !== undefined && cookies.get('IsNew')){
            //console.log("use", usuarios)
            navigate('/testAprendizaje/'+cookies.get('idUser')+'/');
        }
        if(token.mytoken !== undefined && !isNew && !cookies.get('IsNew')){
            //console.log("use",usuarios)
            navigate('/home');
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token,IdUser,isNew]);

    const loadUsers = async function() {
        fetch("https://danielhd20.pythonanywhere.com/users/",{
            method: "GET"
        })
      .then(response => response.json()) 
      .then((data)=>{
        setUsers(data);
        //console.log("Data loaded succesfully:",data);
      }) 
      .catch(error => console.log(error));
    }
    const loadUsuarios = async function() {
        fetch("https://danielhd20.pythonanywhere.com/usuarios/",{
            method: "GET"
        })
      .then(response => response.json()) 
      .then((data)=>{
        setUsuarios(data);
        
        //console.log("Data loaded succesfully:",data);
      }) 
      .catch(error => console.log(error));
    }

    async function handleSubmit(e){
        e.preventDefault();

        const user = users.find(user => user.username === username);
        if(user){
        const usuario = usuarios.find(usuario => usuario.user === user.id);
        if(usuario){
            setIdUser('idUser',usuario.id);
            if(usuario.estiloAprendizaje === "Nuevo")
            {
                setIsNew(true);
                setEsNuevo('IsNew',true);
            }
            console.log(IdUser);
        }
        }
        
        try {
            const request = await fetch('https://danielhd20.pythonanywhere.com/auth/', {
            'method':'POST',
            headers: {
                'Content-Type':'application/json',           
            }, 
            body:JSON.stringify({username: username, password: password})
            })
            const json = await request.json();
            // console.log("json:", json.token, undefined);
            if(json.token !== undefined){
                //setLogin(true);
                setToken('mytoken',json.token);
                //console.log("hola");
                //console.log('handle:',IdUser);
            }
            if(request.status === 400 || !request.ok) //no son necesarias las dos opciones solo deje las 2 para recordar que de las 2 maneras se puede
            {
                Swal.fire({
                    title: 'Oops!, parece que los datos que ingresaste son incorrectos.',
                    width: 400,
                    icon: 'error',
                    padding: '20px',
                    color: '#fff',
                    background: '#8C6D46',
                    showConfirmButton: true,
                    confirmButtonColor: "#413629"
                 })
                 setUsername("");
                 setPassword(""); 
            }
        } catch (error) {
            console.log(error);
        }
    }




return(
<>
<div className="Login">
 <section className="h-300 gradient-form justify-content-center align-items-center d-flex"> {/*centrado total con jcc aic y d-flex */}
    <div className="container py-3 h-200">
        <div className="row justify-content-center">
            <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <div className="card-body mx-md-4">
                                <div className="text-center">
                                    <img className='img-fluid' width="150px" height="150px" src="https://media.discordapp.net/attachments/884494223909462166/1058447246368186388/image.png"
                                    alt="logo"/>
                                    <h4 className="mt-1 mb-5 pb-1">Iniciar Sesión</h4>
                                </div>

                                <form onSubmit={handleSubmit}>

                                <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example11">Usuario</label>
                                <input type="text" id="form2Example11" className="form-control" value={username} onChange={e => setUsername(e.target.value)}/>
                                </div>

                                <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example22" >Contraseña</label>
                                <input type="password" id="form2Example22" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                                </div>

                                <div className="text-center pt-1 mb-5 pb-1">
                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2" type="submit">Iniciar sesión</button>
                                </div>

                                <div className="d-flex align-items-center justify-content-center pb-4">
                                <p className="mb-0 me-2">¿No tienes cuenta?</p>
                                <a href="/register"><button className="btn btn-primary btn-block fa-lg gradient-custom-2" type="button">Crear cuenta</button></a>
                                </div>

                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 d-flex  d-none d-lg-block fondo2">
                            <div className="text-white px-3 py-4 p-md-5 mx-md-4 mb-5 ">
                                <h4 className="mb-0"> 
                                <span className='type clip step'>Apolo, dios de las artes y lider de las musas</span>
                                </h4>
                                <p className="small mt-0 mono"> Te da la bienvenida a uno de sus templos 🏛,<br></br> ¡la teoría musical 🎼 te está esperando!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</div>
</>
    );
}