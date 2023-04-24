import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import './css/login.css';
import Swal from 'sweetalert2';

export default function Register(){



    let navigate = useNavigate();
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[nombre, setNombre] = useState("");
    const[apellido, setApellido] = useState("");
    const[mail, setEmail] = useState(""); // eslint-disable-next-line
    const[token, setToken] = useCookies(['mytoken']); 

    const initialData = {
        nombre: '',
        apellido: '',
        mail: '',
        username: '',
        password: '',
      }

    const [errors, setErros] = useState([]); // eslint-disable-next-line
    const [form, setForm] = useState(initialData);
    const [focused, setFocused] = useState(false);
    var IsValidUser = false;



    useEffect(() => {
        if(token['mytoken']){
            navigate('/');
        }
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onValidate = (form) => {
        let errors = [];
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        //let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/; //solo acepta correos .com
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}([/.]\w{2,})?$/; //acepta correos doble extension, ejemplo .edu.co
        //let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; //La contraseña debe tener mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.
        //let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //Minimum eight characters, at least one letter and one number cannot contain special caracters
        //let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-.,]{8,}$/ //Minimum eight characters, at least one letter and one number can contain special caracters (optional)
        let regexPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()",.-_;:]).{8,}$/; //Minimum eight characters, at least one letter and one number can contain special caracters (optional)

        if (!nombre.trim()) 
        {
          errors.nombre = 'El campo "Nombre(s)" no debe ser vacio.';
          setFocused(true);
        } else if (!regexName.test(nombre)){
          errors.nombre = 'El campo "Nombre(s)" solo acepta letras y espacios.';
          setFocused(true);
        }
        if (!apellido.trim()) 
        {
            errors.apellido = 'El campo "Apellidos" no debe ser vacio.';
            setFocused(true);
        } else if (!regexName.test(apellido)){
        errors.apellido = 'El campo "Apellidos" solo acepta letras y espacios.';
        setFocused(true);
        }
        if (!mail.trim()) 
        {
            errors.mail = 'El campo "Correo" no debe ser vacio.';
            setFocused(true);
        } else if (!regexEmail.test(mail)){
        errors.mail = 'El campo "Correo" contiene un formato no valido.';
        setFocused(true);
        setEmail("");
        }
        if (!username.trim()) {
        errors.username = 'El campo "Usuario" no debe ser vacio.';
        setFocused(true);
        }
        if(!password.trim())
        {
        errors.password = 'El campo "Contraseña" no debe ser vacio.';
        setFocused(true);
        setPassword("");
        }else if (!regexPassword.test(password)){
            errors.password = 'La contraseña debe tener mínimo ocho caracteres, al menos una letra y un número.';
            setFocused(true);
            setPassword("");
            }

        return errors
      }




    async function handleRegister(e){
        e.preventDefault();
        const err = onValidate(form);
        setErros(err);
        if(!err.nombre && !err.apellido && !err.mail && !err.username && !err.password)
        {
            var idAux = 0;
            try {// eslint-disable-next-line
                const request = await fetch('https://danielhd20.pythonanywhere.com/users/', {
                'method':'POST',
                headers: {
                    'Content-Type':'application/json',           
                }, 
                body:JSON.stringify({username: username, password: password})
                })
                    //setMode(true);
                    //navigate('/')
                if(!request.ok)
                {
                    Swal.fire({
                        title: 'Oops!, parece que el usuario que intentas registrar ya existe. Intenta de nuevo con otro.',
                        width: 400,
                        icon: 'error',
                        padding: '20px',
                        color: '#fff',
                        background: '#8C6D46',
                        showConfirmButton: true,
                        confirmButtonColor: "#413629"
                        })
                        setUsername("");
                        IsValidUser=false;
                }
                else{
                    IsValidUser=true;
                }
                if(IsValidUser)
                {
                    try {
                        fetch("https://danielhd20.pythonanywhere.com/users/",{
                        method: "GET"
                            })
                        .then(response => response.json()) 
                        .then((data)=>{
                            //console.log(data[data.length - 1]);
                            idAux = data[data.length - 1].id;              
                            //console.log("Data loaded succesfully:",idAux);
                            try {// eslint-disable-next-line
                                const request = fetch('https://danielhd20.pythonanywhere.com/usuarios/', {
                                'method':'POST',
                                headers: {
                                    'Content-Type':'application/json',           
                                }, 
                                body:JSON.stringify({nombre: nombre,
                                                    apellidos: apellido,
                                                    correo: mail,
                                                    estiloAprendizaje: "Nuevo",
                                                    estiloAprendizaje2: "Nuevo",
                                                    resultado: 0,
                                                    temaProgreso: "Introducción",
                                                    user: idAux})
                                }).then(() => {
                                    //setMode(true);
                                    navigate('/');
                                    //window.location.href = "/";
                                })
                            } catch (error) {
                                console.log(error);
                            } 
                        }) 
                    } catch (error) {
                        console.log(error);
                    }      
                    
                    setUsername("");
                    setPassword("");
                    setNombre("");
                    setApellido("");
                    setEmail("");
                    Swal.fire({
                            title: '¡Te has registrado exitosamente!<br></br>¡El templo🏛️ musical de Apolo de espera!',
                            width: 400,
                            icon: 'success',
                            padding: '20px',
                            color: '#fff',
                            background: '#8C6D46',
                            showConfirmButton: true,
                            confirmButtonColor: "#413629"
                            })
                    //navigate('/');
                    
                }
            } catch (error) {
                console.log(error);
            }
           

        }

    }

return(
<>
    <div className="Login">
    <section className="h-300 gradient-form justify-content-center align-items-center d-flex">
        <div className="container py-3 h-200">
            <div className="row d-flex justify-content-center h-100">
                <div className="col-xl-10">
                    <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-6">
                                <div className="card-body mx-md-4">
                                    <div className="text-center">
                                        <img className='img-fluid' width="150px" height="150px" src="https://media.discordapp.net/attachments/884494223909462166/1058447246368186388/image.png"
                                        alt="logo"/>
                                        <h4 className="mt-1 mb-5 pb-1">Registrarse</h4>
                                    </div>

                                    <form onSubmit={handleRegister} noValidate>
                                    <div className='row'>
                                        <div className="form-outline mb-4 col">
                                        <label className="form-label" htmlFor="form2Example11">Nombre(s)</label>
                                        <input type="text" id="form2Example11" focused={focused.toString()} className="form-control inputcito" value={nombre} onChange={e => setNombre(e.target.value)} required/>
                                        </div>
                                        {errors.nombre && <span className='spancito mb-1'>{errors.nombre}</span>}

                                        <div className="form-outline mb-4 col">
                                        <label className="form-label" htmlFor="form2Example12" >Apellidos</label>
                                        <input type="text" id="form2Example12" focused={focused.toString()} className="form-control inputcito" value={apellido} onChange={e => setApellido(e.target.value)} required/>
                                        </div>
                                    </div>
                                        {errors.apellido && <span className='spancito mb-1'>{errors.apellido}</span>}

                                    <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form2Example22" >Correo</label>
                                    <input type="text" id="form2Example13" focused={focused.toString()} className="form-control inputcito" value={mail} onChange={e => setEmail(e.target.value)} required/>
                                    </div>
                                        {errors.mail && <span className='spancito mb-1'>{errors.mail}</span>}

                                    <div className='row'>
                                        <div className="form-outline mb-4 col">
                                        <label className="form-label" htmlFor="form2Example22" >Usuario</label>
                                        <input type="text" id="form2Example14" focused={focused.toString()} className="form-control inputcito" value={username} onChange={e => setUsername(e.target.value)} required/>
                                        </div>
                                        {errors.username && <span className='spancito mb-1'>{errors.username}</span>}
                                        
                                        <div className="form-outline mb-4 col">
                                        <label className="form-label" htmlFor="form2Example22" >Contraseña</label>
                                        <input type="password" id="form2Example15" focused={focused.toString()} className="form-control inputcito" value={password} onChange={e => setPassword(e.target.value)} required/>
                                        </div>
                                    </div>
                                        {errors.password && <span className='spancito mb-1'>{errors.password}</span>}

                                    <div className="text-center pt-1 mb-5 pb-1">
                                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2" type="submit" noValidate >Registrarse</button>
                                    </div>

                                    {/* <div className="d-flex align-items-center justify-content-center pb-4">
                                    <p className="mb-0 me-2">¿No tienes cuenta?</p>
                                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2" type="button">Crear cuenta</button>
                                    </div> */}

                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-6 d-flex  d-none d-lg-block fondo2">
                                <div className="text-white px-3 py-4 p-md-5 mx-md-4 mb-5 ">
                                    <h4 className="mb-0"> 
                                    <span className='type clip step'>Apolo, dios de las artes y lider de las musas</span>
                                    </h4>
                                    <p className="medium mt-0 mono"> Te da la bienvenida a uno de sus templos 🏛,<br></br> ¡la teoría musical 🎼 te está esperando!</p>
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
