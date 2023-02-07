import React, { useEffect, useState } from 'react';
import {useCookies, Cookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


import Visual from './visual';
import Auditivo from './auditivo';
import Lectura from './lectura';
import Kinestesico from './kinestesico';
import Va from './va';
import Vr from './vr';
import Ar from './ar';
import Vk from './vk';
import Ak from './ak';
import Var from './var';
import Vrk from './vrk';
import Vak from './vak';
import Ark from './ark';
import Vark from './vark';

export default function Tema()
{

    const[token] = useCookies(['mytoken']);
    const cookies = new Cookies();
    let navigate = useNavigate();
                                                                            // eslint-disable-next-line
    const [nombre, setNombre] = useState("");                               // eslint-disable-next-line
    const [apellidos, setApellidos] = useState("");                         // eslint-disable-next-line
    const [correo, setCorreo] = useState("");                               // eslint-disable-next-line
    const [estiloAprendizaje, setEstiloAprendizaje] = useState("");         // eslint-disable-next-line
    const [estiloAprendizaje2, setEstiloAprendizaje2] = useState("");       // eslint-disable-next-line
    const [resultado, setResultado] = useState("");                         // eslint-disable-next-line
    const [temaProgreso, setTemaProgreso] = useState("");                   // eslint-disable-next-line
    const [user,setUser] = useState("");

    const [IsVisual, setIsVisual] = useState(false);
    const [isAuditivo, setisAuditivo] = useState(false);
    const [IsLectura, setIsLectura] = useState(false);
    const [IsKinestesico, setIsKinestesico] = useState(false);
    const [IsVA, setIsVA] = useState(false);
    const [IsVR, setIsVR] = useState(false);
    const [IsVK, setIsVK] = useState(false);
    const [IsAK, setIsAK] = useState(false);
    const [IsRK, setIsRK] = useState(false);
    const [IsAR, setIsAR] = useState(false);
    const [IsVRK, setIsVRK] = useState(false);
    const [IsVAK, setIsVAK] = useState(false);
    const [IsVAR, setIsVAR] = useState(false);
    const [IsARK, setIsARK] = useState(false);
    const [IsVARK, setIsVARK] = useState(false);

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
            //console.log(json);

            switch (json.estiloAprendizaje) {
                case "Visual":
                    setIsVisual(true);
                    break;
        
                case "Auditivo":
                    setisAuditivo(true);
                    break;
        
                case "Lectura/escritura":
                    setIsLectura(true);
                    break;
                
                case "Kinestésico":
                    setIsKinestesico(true);
                    break;

                case "Bi-modal [Visual-Auditivo]":
                    setIsVA(true);
                    break;

                case "Bi-modal [Visual-Lectura/escritura]":
                    setIsVR(true);
                    break;

                case "Bi-modal [Visual-Kinestésico]":
                    setIsVK(true);
                    break;

                case "Bi-modal [Auditivo-Kinestésico]":
                    setIsAK(true);
                    break;

                case "Bi-modal [Lectura/escritura-Kinestésico]":
                    setIsRK(true);
                    break;

                case "Bi-modal [Auditivo-Lectura/escritura]":
                    setIsAR(true);
                    break;

                case "Multimodal [VRK]":
                    setIsVRK(true);
                    break;

                case "Multimodal [VAK]":
                    setIsVAK(true);
                    break;
                
                case "Multimodal [VAR]":
                    setIsVAR(true);
                    break;

                case "Multimodal [ARK]":
                    setIsARK(true);
                    break;

                case "Multimodal [VARK]":
                    setIsVARK(true);
                    break;    
                    
                default:                   
                    break;
            }
            
        } catch (error) {
            console.log(error);
        }

        
    }
    

    if(IsVisual)
    {        Swal.fire({
        title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Para avanzar o retroceder por el contenido usa las fechas (<>) de las diapositivas.<br></br>Apolo te recomienda <b>leer atentamente</b> y <b>tomar notas</b> porque con el botón <b>TERMINAR TEMA</b> avanzarás al siguiente tema y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas.<br></br>¡Éxitos en tu aprendizaje!',
        width: 500,
        icon: 'info',
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
            <Visual/>        
         );
    }
    else if(isAuditivo)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Apolo te recomienda <b>escuchar atentamente</b> y <b>tomar notas</b> porque con el botón <b>TERMINAR TEMA</b> avanzarás al siguiente tema y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de escuchar la explicación en su totalidad.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
            <Auditivo/>
        );
    }
    else if(IsLectura)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Para avanzar o retroceder por el contenido usa las fechas (<>) de las diapositivas.<br></br>Apolo te recomienda <b>leer atentamente</b> y <b>tomar notas</b> porque con el botón <b>TERMINAR TEMA</b> avanzarás al siguiente tema y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
            <Lectura/>
        );
    }
    else if(IsKinestesico)
    {   
        Swal.fire({
        title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Apolo te recomienda <b>leer atentamente</b> y <b>tomar notas</b> porque con el botón <b>siguiente</b> avanzarás por el contenido y no te podrás <b>devolver</b>; asi que tómate tu tiempo.<br></br>  ¡Éxitos en tu aprendizaje!',
        width: 500,
        icon: 'info',
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
            <Kinestesico/>
        );
    }
    else if(IsVA)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Para avanzar o retroceder por el contenido usa las fechas (<>) de las diapositivas.<br></br>Apolo te recomienda <b>leer</b> y <b>escuchar atentamente</b> y <b>tomar notas</b> porque con el botón <b>TERMINAR TEMA</b> avanzarás al siguiente tema y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
        <Va/>
        );
    }
    else if(IsVR)
    {Swal.fire({
        title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Para avanzar o retroceder por el contenido usa las fechas (<>) de las diapositivas.<br></br>Apolo te recomienda <b>leer atentamente</b> y <b>tomar notas</b> porque con el botón <b>TERMINAR TEMA</b> avanzarás al siguiente tema y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas.<br></br>¡Éxitos en tu aprendizaje!',
        width: 500,
        icon: 'info',
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
        <Vr/>
        );
    }
    else if(IsVK)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Apolo te recomienda <b>leer atentamente</b> y <b>tomar notas</b> porque con el botón <b>siguiente</b> avanzarás por el contenido y no te podrás <b>devolver</b>; asi que tómate tu tiempo.<br></br>  ¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
        <Vk/>
        );
    }
    else if(IsAK)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Apolo te recomienda <b>escuchar atentamente</b> y <b>tomar notas</b> porque con el botón <b>TERMINAR TEMA</b> avanzarás al siguiente tema y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de escuchar la explicación en su totalidad.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
        <Ak/>
        );
    }
    else if(IsRK)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Apolo te recomienda <b>leer atentamente</b> y <b>tomar notas</b> porque con el botón <b>siguiente</b> avanzarás por el contenido y no te podrás <b>devolver</b>; asi que tómate tu tiempo.<br></br>  ¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
            <Kinestesico/>
        );
    }
    else if(IsAR)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Para avanzar o retroceder por el contenido usa las fechas (<>) de las diapositivas.<br></br>Apolo te recomienda <b>leer</b> y <b>escuchar atentamente</b> y <b>tomar notas</b> porque con el botón <b>TERMINAR TEMA</b> avanzarás al siguiente tema y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
        <Ar/>
        );
        
    }
    else if(IsVRK)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Para avanzar o retroceder por el contenido usa las fechas (<>) de las diapositivas.<br></br>Apolo te recomienda <b>leer atentamente</b> y <b>tomar notas</b> porque con el botón <b>siguiente</b> avanzarás a las actividades y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas antes de pasar a los ejercicios.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
        <Vrk/>
        );
    }
    else if(IsVAK)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Para avanzar o retroceder por el contenido usa las fechas (<>) de las diapositivas.<br></br>Apolo te recomienda <b>leer</b> y <b>escuchar atentamente</b> y <b>tomar notas</b> porque con el botón <b>siguiente</b> avanzarás a las actividades y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas antes de pasar a los ejercicios.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
        <Vak/>
        );
    }
    else if(IsVAR)
    {        
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Apolo te recomienda <b>escuchar atentamente</b> y <b>tomar notas</b> porque con el botón <b>TERMINAR TEMA</b> avanzarás al siguiente tema y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de escuchar la explicación en su totalidad.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
            <Var/>
        );
    }
    else if(IsARK)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Para avanzar o retroceder por el contenido usa las fechas (<>) de las diapositivas.<br></br>Apolo te recomienda <b>leer</b> y <b>escuchar atentamente</b> y <b>tomar notas</b> porque con el botón <b>siguiente</b> avanzarás a las actividades y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas antes de pasar a los ejercicios.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
        <Ark/>
        );
    }
    else if(IsVARK)
    {
        Swal.fire({
            title: 'Hola, bienvenido(a) a la zona teórica del templo.<br></br>Apolo te recomienda <b>leer</b> y <b>escuchar atentamente</b> y <b>tomar notas</b> porque con el botón <b>siguiente</b> avanzarás a las actividades y no te podrás <b>devolver</b>; asi que tómate tu tiempo y asegúrate de ver todas las diapositivas antes de pasar a los ejercicios.<br></br>¡Éxitos en tu aprendizaje!',
            width: 500,
            icon: 'info',
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
        <Vark/>
        );
    }
    
  
}