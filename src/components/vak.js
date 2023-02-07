import React, { useEffect, useState } from 'react';
import {useCookies, Cookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import './css/visual.css';
import './css/kinestesico.css';


import Juego1 from './juego1';
import Juego2 from './juego2';
import Juego3 from './juego3';
import Juego4 from './juego4';

export default function Vak(){
    const [siguiente, setSiguiente] = useState(0);
    const [Do,SetDo] = useState("");
    const [Re,SetRe] = useState("");
    const [Mi,SetMi] = useState("");
    const [Fa,SetFa] = useState("");
    const [Sol,SetSol] = useState("");
    const [La,SetLa] = useState("");
    const [Si,SetSi] = useState("");
    const [Do2,SetDo2] = useState("");

    const [C,SetC] = useState("");
    const [D,SetD] = useState("");
    const [E,SetE] = useState("");
    const [F,SetF] = useState("");
    const [G,SetG] = useState("");
    const [A,SetA] = useState("");
    const [B,SetB] = useState("");

    const [Db,SetDb] = useState("");
    const [Eb,SetEb] = useState("");
    const [Gb,SetGb] = useState("");
    const [Ab,SetAb] = useState("");
    const [Bb,SetBb] = useState("");

    const [Tono,SetTono] = useState("");
    const [Semitono, SetSemiTono] = useState("");

    const [Intervalo1, SetIntervalo1] = useState("");
    const [Intervalo2, SetIntervalo2] = useState("");

    const [Escala, SetEscala] = useState("");

    const [Triada1, SetTriada1] = useState("");
    const [Triada2, SetTriada2] = useState("");
    const [Triada3, SetTriada3] = useState("");

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
            dataSubmit(temaNuevo);
            break;

        case "Intervalos":
            temaNuevo = "Escalas";
            dataSubmit(temaNuevo);
            break;

        case "Escalas":
            temaNuevo = "Acordes";
            dataSubmit(temaNuevo);
            break;

        default:
            temaNuevo = "Acordes [Finalizado]";
            dataSubmit(temaNuevo);
            break;
    }
}
function handleSubmit2()
{
    switch (siguiente) {
        case 0:
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
                    setSiguiente(1);
                }
              })
            break;
        
        case 1:
            setSiguiente(2);
            break;

        case 2:
            setSiguiente(3);
            break;
        
        case 3:
            setSiguiente(4);
            break;

        case 4:
            setSiguiente(5);
            break;

        case 5:
            setSiguiente(6);
            break;

        case 6:
            setSiguiente(7);
            break;
        
        case 7:
            setSiguiente(8);
            break;
            
        case 8:
            setSiguiente(9);
            break;


        default:
            break;
    }
}
function Verificar(e)
{
    e.preventDefault();

    if(Do.toLowerCase().trim() === "do" && Re.toLowerCase().trim() === "re" && Mi.toLowerCase().trim() === "mi" && Fa.toLowerCase().trim() === "fa" && Sol.toLowerCase().trim() === "sol" && La.toLowerCase().trim() === "la" && Si.toLowerCase().trim() === "si" && Do2.toLowerCase().trim() === "do")
    {
        Swal.fire({
            title: '¡Muy bien! <br></br>puedes seguir avanzando sin problemas en el camino del aprendizaje',
            width: 500,
            icon: 'success',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
    else{
        Swal.fire({
            title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
            width: 500,
            icon: 'error',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
}
function Verificar2(e)
{
    e.preventDefault();

    if(C.toLowerCase().trim() === "c" && D.toLowerCase().trim() === "d" && E.toLowerCase().trim() === "e" && F.toLowerCase().trim() === "f" && G.toLowerCase().trim() === "g" && A.toLowerCase().trim() === "a" && B.toLowerCase().trim() === "b")
    {
        Swal.fire({
            title: '¡Muy bien! <br></br>puedes seguir avanzando sin problemas en el camino del aprendizaje',
            width: 500,
            icon: 'success',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
    else{
        Swal.fire({
            title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
            width: 500,
            icon: 'error',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
}
function Verificar3(e)
{
    e.preventDefault();

    if((Db.toLowerCase().trim() === "db" || Db.toLowerCase().trim() === "reb") && (Eb.toLowerCase().trim() === "eb" || Eb.toLowerCase().trim() === "mib") && (Gb.toLowerCase().trim() === "gb" || Gb.toLowerCase().trim() === "solb") && (Ab.toLowerCase().trim() === "ab" || Ab.toLowerCase().trim() === "lab") && (Bb.toLowerCase().trim() === "bb" || Bb.toLowerCase().trim() === "sib"))
    {
        Swal.fire({
            title: '¡Muy bien! <br></br>puedes seguir avanzando sin problemas en el camino del aprendizaje',
            width: 500,
            icon: 'success',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
    else{
        Swal.fire({
            title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
            width: 500,
            icon: 'error',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
}
function Verificar4(e)
{
    e.preventDefault();

    if(Tono.toLowerCase().trim()  === "tono" && Semitono.toLowerCase().trim()  === "semitono")
    {
        Swal.fire({
            title: '¡Muy bien! <br></br>puedes seguir avanzando sin problemas en el camino del aprendizaje',
            width: 500,
            icon: 'success',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
    else{
        Swal.fire({
            title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
            width: 500,
            icon: 'error',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
}
function Verificar5(e)
{
    e.preventDefault();

    if((Intervalo1.toLowerCase().trim() === "tercera mayor" || Intervalo1.toLowerCase().trim() === "cuarta disminuida")  && (Intervalo2.toLowerCase().trim() === "tercera menor" || Intervalo1.toLowerCase().trim() === "segunda aumentada"))
    {
        Swal.fire({
            title: '¡Muy bien! <br></br>puedes seguir avanzando sin problemas en el camino del aprendizaje',
            width: 500,
            icon: 'success',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
    else{
        Swal.fire({
            title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
            width: 500,
            icon: 'error',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
}
function Verificar6(e)
{
    e.preventDefault();

    if((Escala.toLowerCase().trim() === "escala menor de la"))
    {
        Swal.fire({
            title: '¡Muy bien! <br></br>puedes seguir avanzando sin problemas en el camino del aprendizaje',
            width: 500,
            icon: 'success',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         });
    }
    else{
        Swal.fire({
            title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
            width: 500,
            icon: 'error',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
}
function Verificar7(e)
{
    e.preventDefault();

    if((Triada1.toLowerCase().trim() === "la" && Triada2.toLowerCase().trim() === "do" && Triada3.toLowerCase().trim() === "mi") || (Triada1.toLowerCase().trim() === "a" && Triada2.toLowerCase().trim() === "c" && Triada3.toLowerCase().trim() === "e"))
    {
        Swal.fire({
            title: '¡Muy bien! <br></br>puedes seguir avanzando sin problemas en el camino del aprendizaje',
            width: 500,
            icon: 'success',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
    else{
        Swal.fire({
            title: 'Oops! Hay algo que no cuadra.. <br></br>¡Intenta de nuevo! <br></br>¡Tu puedes!',
            width: 500,
            icon: 'error',
            padding: '20px',
            color: '#fff',
            background: '#8C6D46',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonColor: "#413629"
         })
    }
}
if(IsTema1)
{
    switch (siguiente) {
        case 0:
            return(
                <div className="Visual">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                    <iframe title="Introducción" src="https://correounivalleeduco-my.sharepoint.com/:p:/g/personal/daniel_holguin_correounivalle_edu_co/EeDaayhkOwJItU1qQv7h0uoBocMbpUy4nXZyzonNuGxwjA?e=iO1LO1&amp;action=embedview&amp;wdAr=1.7763888888888888" width="1200px" height="768px" frameborder="0"></iframe>
                                    </div>
                                    </div>
                                    <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                                </div>      
                </div>
            );
    
        case 1:
            Swal.fire({
                title: 'Esta y las demás <b>actividades</b> kinestésicas de aqui en adelante NO suman puntos de ningún tipo.<br></br> Esto permite que puedas intentarlo las veces que quieras sin miedo a equivocarte con el fin de reforzar el conocimiento. <br></br> Te <b>recomendamos</b> darle al botón "Verificar" para validar que el ejercicio fue realizado correctamente y solo avanzar cuando este haya sido completado sin <b>ningún error.</b>',
                width: 500,
                icon: 'warning',
                padding: '20px',
                color: '#fff',
                background: '#8C6D46',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                confirmButtonColor: "#413629"
             }) 
            return(
                <div className="Kinestesico">
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <Juego1/>
                            </div>   
                        </div>
                        <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                    </div>
                </div>
        
            );

        case 2:
            return(
                <div className="Kinestesico">
                    <div className='container'>
                        <div className='row'>
                            <div className='col justify-content-center align-items-center d-flex'>
                                <div className='containerimg'>
                                <p><b>Escriba las notas correspondientes a las notas de colores en el pentagrama</b></p>
    
                                    <form onSubmit={Verificar}>
                                <div className='inputss'>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "red"}} value={Do} onChange={e => SetDo(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "orange"}} value={Re} onChange={e => SetRe(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "yellow"}} value={Mi} onChange={e => SetMi(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "green"}} value={Fa} onChange={e => SetFa(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "LightBlue"}} value={Sol} onChange={e => SetSol(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "blue"}} value={La} onChange={e => SetLa(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "purple"}} value={Si} onChange={e => SetSi(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "fuchsia"}} value={Do2} onChange={e => SetDo2(e.target.value)}></input></div>
                                </div>
                                <button type="submit" className="btn text-light mt-2 fondobotonhome inputss" style={{bottom: 2, width: "100px", left: 290, right: 0}}>Verificar</button>
                                </form>
    
                                </div>
                            </div>   
                        </div>
                        <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                    </div>
                </div>
            );
        case 3:
            return(
                <div className="Kinestesico">
                    <div className='container'>
                        <div className='row'>
                            <div className='col justify-content-center align-items-center d-flex'>
                                <div className='containerimg2'>
                                <p><b>Escriba la equivalencia en sistema cifrado americano de las notas según el color</b></p>
    
                                    <form onSubmit={Verificar2}>
                                <div className='inputss'>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#546422"}} value={C} onChange={e => SetC(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#92D050"}} value={D} onChange={e => SetD(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#0C9B74"}} value={E} onChange={e => SetE(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "Blue"}} value={F} onChange={e => SetF(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#FFC000"}} value={G} onChange={e => SetG(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#4FCEFF"}} value={A} onChange={e => SetA(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#C00000"}} value={B} onChange={e => SetB(e.target.value)}></input></div>
                                </div>
                                <button type="submit" className="btn text-light mt-2 fondobotonhome inputss" style={{bottom: 2, width: "100px", left: 290, right: 0}}>Verificar</button>
                                </form>
    
                                </div>
                            </div>   
                        </div>
                        <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                    </div>
                </div>
            );
        case 4:
            return(
                <div className="Kinestesico">
                    <div className='container'>
                        <div className='row'>
                            <div className='col justify-content-center align-items-center d-flex'>
                                <div className='containerimg3'>
                                <p><b>Escriba las notas alteradas en bemol equivalentes a las notas alteradas en sostenido (se aceptan en cifrado americano o normal [Reb o Db])</b></p>
    
                                    <form onSubmit={Verificar3}>
                                <div className='inputss'>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#92D050"}} value={Db} onChange={e => SetDb(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#0C9B74"}} value={Eb} onChange={e => SetEb(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#FFC000"}} value={Gb} onChange={e => SetGb(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#4FCEFF"}} value={Ab} onChange={e => SetAb(e.target.value)}></input></div>
                                   <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#C00000"}} value={Bb} onChange={e => SetBb(e.target.value)}></input></div>
                                   
                                </div>
                                <button type="submit" className="btn text-light mt-2 fondobotonhome inputss" style={{bottom: 2, width: "100px", left: 290, right: 0}}>Verificar</button>
                                </form>
    
                                </div>
                            </div>   
                        </div>
                        <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
                    </div>
                </div>
        
            );
        default:
            break;
    }

}
else if(IsTema2)
{
    switch (siguiente) {
    case 0:
        return(
            <div className="Visual">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                <iframe title="Intervalos" src="https://correounivalleeduco-my.sharepoint.com/:p:/g/personal/daniel_holguin_correounivalle_edu_co/Ef0lskSWmoRKhWMY70JdXUcB8fZqtQT-uT-_ri8SiedsKA?e=ePZh5R&amp;action=embedview&amp;wdAr=1.7763888888888888" width="1200px" height="768px" frameborder="0"></iframe>
                                </div>
                                </div>
                                <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                            </div>
            </div>
    
        );
        
    case 1:
        return(
            <div className="Kinestesico">
            <div className='container'>
                <div className='row'>
                    <div className='col justify-content-center align-items-center d-flex'>
                        <div className='containerimg4'>
                        <p><b>Escriba los intervalos correspondientes (tono o semitono) según las notas señalas</b></p> 

                            <form onSubmit={Verificar4}>
                        <div className='inputss d-flex justify-content-around'>
                        <div className='d-inline'><input type="text" className='winput2 m-1' style={{borderColor: "#546422"}} value={Tono} onChange={e => SetTono(e.target.value)}></input></div>
                        <div className='d-inline'><input type="text" className='winput2 m-1' style={{borderColor: "#0076A3"}} value={Semitono} onChange={e => SetSemiTono(e.target.value)}></input></div>
                        
                        </div>
                        <button type="submit" className="btn text-light mt-2 fondobotonhome inputss" style={{bottom: 2, width: "100px", left: 290, right: 0}}>Verificar</button>
                        </form>

                        </div>
                    </div>   
                </div>
                <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
            </div>
        </div>
        );

    case 2:
        return(
            <div className="Kinestesico">
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Juego2/>
                    </div>   
                </div>
                <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
            </div>
        </div>
        );

    case 3:
        return(
            <div className="Kinestesico">
            <div className='container'>
                <div className='row'>
                    <div className='col justify-content-center align-items-center d-flex'>
                        <div className='containerimg5'>
                        <p><b>Escriba los intervalos correspondientes (en terminos de segunda menor, tercera, cuarta, mayor, etc.) según las distancias señalas</b></p> 

                            <form onSubmit={Verificar5}>
                        <div className='inputss d-flex justify-content-around'>
                           <div className='d-inline'><input type="text" className='winput2 m-1' style={{borderColor: "#546422"}} value={Intervalo1} onChange={e => SetIntervalo1(e.target.value)}></input></div>
                           <div className='d-inline'><input type="text" className='winput2 m-1' style={{borderColor: "#0076A3"}} value={Intervalo2} onChange={e => SetIntervalo2(e.target.value)}></input></div>
                          
                        </div>
                        <button type="submit" className="btn text-light mt-2 fondobotonhome inputss" style={{bottom: 2, width: "100px", left: 290, right: 0}}>Verificar</button>
                        </form>

                        </div>
                    </div>   
                </div>
                <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
            </div>
        </div>
        );

        default:
            break;
    }

}
else if(IsTema3)
{
    switch (siguiente) {
        case 0:
            return(
                <div className="Visual">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                    <iframe title="Escalas" src="https://correounivalleeduco-my.sharepoint.com/:p:/g/personal/daniel_holguin_correounivalle_edu_co/EdznBy67YABDmcpHNft5wscBp_L6KtvL1XhfC9bhiymsyA?e=PadK1H&amp;action=embedview&amp;wdAr=1.7763888888888888" width="1200px" height="768px" frameborder="0"></iframe>
                                    </div>
                                    </div>
                                    <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                                </div>
                </div>
            );

        case 1:
            return(
                <div className="Kinestesico">
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <Juego3/>
                        </div>   
                    </div>
                    <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                </div>
            </div>
            );

        case 2:
            return(
                <div className="Kinestesico">
                <div className='container'>
                    <div className='row'>
                        <div className='col justify-content-center align-items-center d-flex'>
                            <div className='containerimg6'>
                            <p><b>Dada la siguiente escala, indique si esta es una escala (mayor, menor, pentantonica mayor, pentatonica menor) de la. USE la disposición de intervalos para determinarlo. (ejemplo de respuesta: escala mayor de do)</b></p>
    
                                <form onSubmit={Verificar6}>
                            <div className='inputss d-flex justify-content-around'>
                                <div className='d-inline'><input type="text" className='winput2 m-1' style={{borderColor: "#000000"}} value={Escala} onChange={e => SetEscala(e.target.value)}></input></div>
                                
                                
                            </div>
                            <button type="submit" className="btn text-light mt-2 fondobotonhome inputss" style={{bottom: 2, width: "100px", left: 290, right: 0}}>Verificar</button>
                            </form>
    
                            </div>
                        </div>   
                    </div>
                    <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
                </div>
            </div>
            );
           
        default:
            break;
    }
    
}
else if(IsTema4)
{
    switch (siguiente) {
        case 0:
            return(
                <div className="Visual">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                    <iframe title="Acordes" src="https://correounivalleeduco-my.sharepoint.com/:p:/g/personal/daniel_holguin_correounivalle_edu_co/EdzEDMcnoC9Ku2vr_gc9qj8Bq9Stvh3vBzkZ2_i0j0FM8g?e=PUjSi6&amp;action=embedview&amp;wdAr=1.7763888888888888" width="1200px" height="768px" frameborder="0"></iframe>
                                    </div>
                                    </div>
                                    <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                                </div>
                </div>
            ); 
            
        case 1:
            return(
                <div className="Kinestesico">
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <Juego4/>
                        </div>   
                    </div>
                    <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit2()}>Siguiente</button>
                </div>
            </div>
            );
    
        case 2:
            return(
                <div className="Kinestesico">
                <div className='container'>
                    <div className='row'>
                        <div className='col justify-content-center align-items-center d-flex'>
                            <div className='containerimg6'>
                            <p><b>A partir de la siguiente escala de la menor, construya el acorde de la menor superponiendo terceras, indique las notas que se necesitan para formar la triada.
                                (ejemplo de respuesta: DO MI SOL / C D G)</b></p>
    
                                <form onSubmit={Verificar7}>
                            <div className='inputss d-flex justify-content-around'>
                                <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#000000"}} value={Triada1} onChange={e => SetTriada1(e.target.value)}></input></div>
                                <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#000000"}} value={Triada2} onChange={e => SetTriada2(e.target.value)}></input></div>
                                <div className='d-inline'><input type="text" className='winput m-1' style={{borderColor: "#000000"}} value={Triada3} onChange={e => SetTriada3(e.target.value)}></input></div>  
                            </div>
                            <button type="submit" className="btn text-light mt-2 fondobotonhome inputss" style={{bottom: 2, width: "100px", left: 290, right: 0}}>Verificar</button>
                            </form>
    
                            </div>
                        </div>   
                    </div>
                    <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
                </div>
            </div>
            );
        default:
            break;
    }

}
}