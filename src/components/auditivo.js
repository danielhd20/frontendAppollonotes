import React, { useEffect, useState } from 'react';
import {useCookies, Cookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './css/auditivo.css';


export default function Auditivo()
{
    const[token] = useCookies(['mytoken']);
    const cookies = new Cookies();
    let navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");// eslint-disable-next-line
    const [estiloAprendizaje, setEstiloAprendizaje] = useState("");
    const [estiloAprendizaje2, setEstiloAprendizaje2] = useState("");
    const [resultado, setResultado] = useState("");
    const [temaProgreso, setTemaProgreso] = useState("");
    const [user,setUser] = useState("");

    const [IsTema1, setTema1] = useState(false);
    const [IsTema2, setTema2] = useState(false);
    const [IsTema3, setTema3] = useState(false);
    const [IsTema4, setTema4] = useState(false);

    useEffect(() => {
        if(token['mytoken']){
            loadInfo();
            
        }
        else{
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


async function loadInfo(){
        try {
            const request = await fetch("https://danielhd20.pythonanywhere.com/usuarios/"+cookies.get('idUser')+"/",{
                headers: {'Authorization': "Token " + token['mytoken']}
            });
            const json = await request.json();
            setNombre(json.nombre);
            setApellidos(json.apellidos);
            setCorreo(json.correo);
            setEstiloAprendizaje(json.estiloAprendizaje);
            setEstiloAprendizaje2(json.estiloAprendizaje2);
            setResultado(json.resultado);
            setTemaProgreso(json.temaProgreso);
            setUser(json.user);
           // console.log(json);
    
           switch (json.temaProgreso) {
            case "Introducción":
                setTema1(true);
                break;
    
            case "Intervalos":
                setTema2(true);
                break;
    
            case "Escalas":
                setTema3(true);
                break;
    
            default:
                setTema4(true);
                break;
        }
    
        } catch (error) {
            console.log(error);
        }
    
    }

function dataSubmit(temaNuevo){
        //console.log("Formulario enviado");
        //console.log(this.state.nombre);
        //console.log(this.state.correo);
        var dataToSend = {nombre: nombre,
                         apellidos: apellidos, 
                         correo: correo,
                         estiloAprendizaje: estiloAprendizaje,
                         estiloAprendizaje2: estiloAprendizaje2, 
                         resultado: resultado, 
                         temaProgreso: temaNuevo,
                         user: user}
    fetch("https://danielhd20.pythonanywhere.com/usuarios/"+cookies.get('idUser')+"/",{
    method: "PUT",
    headers: {
    //'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': "Token " + token['mytoken'],

    //'X-CSRFToken':csrftoken,
    },
    body:JSON.stringify(dataToSend)
    }) // Solicitud de datos a la API
    .then(response => response.json()) // Solicita la información en formato json
    .then((data)=>{
    console.log("Data updated succesfully:",data);
    navigate('/home');
    //this.props.history.push('/');           
    }) // Especifica qué se hará con la información traida de la API (data)
    .catch(console.log)

    //setIsFinished(true);
}

function handleSubmit(){
    let temaNuevo;
    switch (temaProgreso) {
        case "Introducción":
            temaNuevo = "Intervalos";
            Swal.fire({
                icon: 'question',
                title: '¿Terminaste el tema?',
                showDenyButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Sí',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                color: '#fff',
                background: '#8C6D46',
                confirmButtonColor: "#007723",
                denyButtonColor: "#76191e"
              }).then((result) => {
                
                if (result.isConfirmed) {
                    dataSubmit(temaNuevo);
                }
              })
            break;

        case "Intervalos":
            temaNuevo = "Escalas";
            Swal.fire({
                icon: 'question',
                title: '¿Terminaste el tema?',
                showDenyButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Sí',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                color: '#fff',
                background: '#8C6D46',
                confirmButtonColor: "#007723",
                denyButtonColor: "#76191e"
              }).then((result) => {
                
                if (result.isConfirmed) {
                    dataSubmit(temaNuevo);
                }
              })
            break;

        case "Escalas":
            temaNuevo = "Acordes";
            Swal.fire({
                icon: 'question',
                title: '¿Terminaste el tema?',
                showDenyButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Sí',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                color: '#fff',
                background: '#8C6D46',
                confirmButtonColor: "#007723",
                denyButtonColor: "#76191e"
              }).then((result) => {
                
                if (result.isConfirmed) {
                    dataSubmit(temaNuevo);
                }
              })
            break;

        default:
            temaNuevo = "Acordes [Finalizado]";
            Swal.fire({
                icon: 'question',
                title: '¿Terminaste el tema?',
                showDenyButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Sí',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                color: '#fff',
                background: '#8C6D46',
                confirmButtonColor: "#007723",
                denyButtonColor: "#76191e"
              }).then((result) => {
                
                if (result.isConfirmed) {
                    dataSubmit(temaNuevo);
                }
              })
            break;
    }
}

if(IsTema1)
{ 
    return(
        <div className='Auditivo'>
            <div className='container'>  
             <div className='row'>
                    <div className='col'>
                        <div className="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/7hsd0_rb3Wo" title="Introducción" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>  
                  <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
            </div>
        </div>
                 
    );
}
else if(IsTema2)
{
    return(
        <div className='Auditivo'>
            <div className='container'>  
             <div className='row'>
                    <div className='col'>
                        <div className="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/lq8IXYEvOUs" title="Intervalos" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>  
                  <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
            </div>
        </div>
                 
    );
}
else if(IsTema3){
    return(
        <div className='Auditivo'>
            <div className='container'>  
             <div className='row'>
                    <div className='col'>
                        <div className="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/oqc42Mvvh74" title="Escalas" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>  
                  <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
            </div>
        </div>
                 
    );
}
else if(IsTema4)
{
    return(
        <div className='Auditivo'>
            <div className='container'>  
             <div className='row'>
                    <div className='col'>
                        <div className="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/Ndhg3B-BaMA" title="Acordes" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>  
                  <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
            </div>
        </div>
                 
    );
}
}