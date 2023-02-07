import React, { useEffect, useState } from 'react';
import {useCookies, Cookies} from 'react-cookie';
import { useNavigate, Link } from "react-router-dom";
import './css/home.css';
import Swal from 'sweetalert2';

import NavB from './navbar';
export default function Home()
{
    const[token] = useCookies(['mytoken']);
    const cookies = new Cookies();
    let navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");// eslint-disable-next-line
    const [estiloAprendizaje, setEstiloAprendizaje] = useState("");// eslint-disable-next-line
    const [estiloAprendizaje2, setEstiloAprendizaje2] = useState("");// eslint-disable-next-line
    const [resultado, setResultado] = useState("");
    const [temaProgreso, setTemaProgreso] = useState("");// eslint-disable-next-line
    const [user,setUser] = useState("");

    const [isTemaFinalizado, setIsTemaFinalizado] = useState(false);
    const [isPruebaFinalizado, setIsPruebaFinalizado] = useState(false);

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        color: '#fff',
        background: '#8C6D46',
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
 

    useEffect(() => {
        if(token['mytoken'] && !cookies.get('IsNew')){
            cookies.remove('csrftoken'); 
            loadInfo();
            Toast.fire({
                icon: 'success',
                title: 'Bienvenido al inicio del templo'
              })
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


            if(json.temaProgreso === "Acordes [Finalizado]")
            {
                setIsTemaFinalizado(true);
                Swal.fire({
                    title: '¡Has finalizado con éxito los temas! <br></br> Ya puedes realizar la prueba final para comprobar tus conocimientos adquiridos, asi que repasa tus apuntes y cuando te sientas listo ingresa a la prueba.',
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
            if(json.resultado >= 12)
            {
            Swal.fire({
                title: 'Muchas gracias por participar en este prototipo de aplicación web para aprender teoría musical. <br></br> Apolo espera darte más contenido pronto. <br></br> <h5>hecho con ♥ por Daniel H. 2023</h5>',
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
                setIsPruebaFinalizado(true);
            }
            if(json.resultado > 0 && json.resultado < 12 && json.temaProgreso === "Acordes [Finalizado]")
            {
                Swal.fire({
                    title: '¡Hola! <br></br> Sabemos que no aprobaste la prueba final pero probablemente no fue culpa tuya, seguro nos equivocamos con tu estilo de aprendizaje. <br></br> PERO recuerda que aún puedes repasar los temas con tu estilo de aprendizaje secundario, solo ingresa al apartado de prueba final y selecciona la opción "Iniciar con estilo secundario".<br></br>¡Apolo se alegra de tenerte de vuelta!',
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
            }


        } catch (error) {
            console.log(error);
        }

        
    }

if(isTemaFinalizado && !isPruebaFinalizado)
{
    return(
    <div className='scroll'>
            <NavB/>
            <div className='home'>
        <div className='container'>
            <div className='row g-3'>
                <div className='col-12 col-md-6 col-lg-4'>
                    <div className="card cardBodyHome">
                        <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063159524334252042/libro-de-historia_2.png" alt="Title"></img>
                        <div className="card-body ">
                            <h4 className="card-title"><b>Tema actual: {temaProgreso}</b></h4>
                            <p className="card-text">Prepárate para aprender lo básico y necesario para incursionar en el mundo de la teoría musical, empieza ingresando aquí. </p>

                            <Link to="/tema" className="btn btn text-light disabled-link" disabled>
                                Ingresar
                            </Link>
                        </div>
                    </div>

                </div>
                
                <div className='col-12 col-md-6 col-lg-4'>

                    <div className="card cardBodyHome">
                            <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063148516978987098/perfil_final.png" alt="Title"></img>
                            <div className="card-body cardBodyHome">
                                <h4 className="card-title"><b>Perfil</b></h4>
                                <ul className="list-group list-group-flush cardBodyHome">
                                <li className="list-group-item cardBodyHome"><b>Nombre completo:</b><br></br>{nombre} {apellidos}</li>
                                <li className="list-group-item cardBodyHome"><b>Estilo de aprendizaje:</b><br></br>{estiloAprendizaje}</li>
                                <li className="list-group-item cardBodyHome"><b>Correo:</b><br></br>{correo}</li>
                                </ul>
                            </div>
                    </div>

                </div>


                <div className='col-12 col-md-6 col-lg-4'>
                    <div className="card cardBodyHome">
                                <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063169786915332106/prueba_final.png" alt="Title"></img>
                                <div className="card-body cardBodyHome">
                                    <h4 className="card-title"><b>Prueba final</b></h4>
                                    <p className="card-text">Después de adquirir los conocimientos necesarios se comprueban mediante una prueba de selección múltiple.</p>
                                    <Link to="/prueba" className="btn btn text-light fondobotonhome">
                                    Ingresar
                                    </Link>
                                </div>
                    </div>

                </div>
                
            </div>
        </div>
    </div>
</div>
    );
}
if(isPruebaFinalizado){
    return(
    <div className='scroll'>
            <NavB/>
        <div className='home'>
        <div className='container'>
            <div className='row g-3'>
                <div className='col-12 col-md-6 col-lg-4'>

                    <div className="card cardBodyHome">
                        <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063159524334252042/libro-de-historia_2.png" alt="Title"></img>
                        <div className="card-body ">
                            <h4 className="card-title"><b>Tema actual: {temaProgreso}</b></h4>
                            <p className="card-text">Prepárate para aprender lo básico y necesario para incursionar en el mundo de la teoría musical, empieza ingresando aquí. </p>

                            <Link to="/tema" className="btn btn text-light disabled-link" disabled>
                                Ingresar
                            </Link>
                        </div>
                    </div>

                </div>
                
                <div className='col-12 col-md-6 col-lg-4'>

                    <div className="card cardBodyHome">
                            <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063148516978987098/perfil_final.png" alt="Title"></img>
                            <div className="card-body cardBodyHome">
                                <h4 className="card-title"><b>Perfil</b></h4>
                                <ul className="list-group list-group-flush cardBodyHome">
                                <li className="list-group-item cardBodyHome"><b>Nombre completo:</b><br></br>{nombre} {apellidos}</li>
                                <li className="list-group-item cardBodyHome"><b>Estilo de aprendizaje:</b><br></br>{estiloAprendizaje}</li>
                                <li className="list-group-item cardBodyHome"><b>Correo:</b><br></br>{correo}</li>
                                </ul>
                            </div>
                    </div>

                </div>


                <div className='col-12 col-md-6 col-lg-4'>
                    <div className="card cardBodyHome">
                                <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063169786915332106/prueba_final.png" alt="Title"></img>
                                <div className="card-body cardBodyHome">
                                    <h4 className="card-title"><b>Prueba final</b></h4>
                                    <p className="card-text">Después de adquirir los conocimientos necesarios se comprueban mediante una prueba de selección múltiple.</p>
                                    <Link to="/prueba" className="btn btn text-light disabled-link" disabled>
                                    Ingresar
                                    </Link>
                                </div>
                    </div>

                </div>
                
            </div>
        </div>
    </div>

</div>
        
    );



}
else{
    return(
    <div className='scroll'>
            <NavB/>
            <div className='home'>
        <div className='container'>
            <div className='row g-3'>
                <div className='col-12 col-md-4 col-lg-4'>
                
                    <div className="card cardBodyHome">
                        <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063159524334252042/libro-de-historia_2.png" alt="Title"></img>
                        <div className="card-body ">
                            <h4 className="card-title"><b>Tema actual: {temaProgreso}</b></h4>
                            <p className="card-text">Prepárate para aprender lo básico y necesario para incursionar en el mundo de la teoría musical, empieza ingresando aquí. </p>

                            <Link to="/tema" className="btn btn text-light fondobotonhome">
                                Ingresar
                            </Link>
                        </div>
                    </div>

                </div>
                
                <div className='col-12 col-md-4 col-lg-4'>

                    <div className="card cardBodyHome">
                            <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063148516978987098/perfil_final.png" alt="Title"></img>
                            <div className="card-body cardBodyHome">
                                <h4 className="card-title"><b>Perfil</b></h4>
                                <ul className="list-group list-group-flush cardBodyHome">
                                <li className="list-group-item cardBodyHome"><b>Nombre completo:</b><br></br>{nombre} {apellidos}</li>
                                <li className="list-group-item cardBodyHome"><b>Estilo de aprendizaje:</b><br></br>{estiloAprendizaje}</li>
                                <li className="list-group-item cardBodyHome"><b>Correo:</b><br></br>{correo}</li>
                                </ul>
                            </div>
                    </div>

                </div>


                <div className='col-12 col-md-4 col-lg-4'>
                    <div className="card cardBodyHome">
                                <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1063169786915332106/prueba_final.png" alt="Title"></img>
                                <div className="card-body cardBodyHome">
                                    <h4 className="card-title"><b>Prueba final</b></h4>
                                    <p className="card-text">Después de adquirir los conocimientos necesarios se comprueban mediante una prueba de selección múltiple.</p>
                                    <Link to="/prueba" className="btn btn text-light disabled-link" disabled>
                                    Ingresar
                                    </Link>
                                </div>
                    </div>

                </div>
                
            </div>
        </div>
    </div>
</div>
       
    );
}


}