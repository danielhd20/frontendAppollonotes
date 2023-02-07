import React, { useEffect, useState } from 'react';
import {useCookies, Cookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './css/visual.css';
import Carousel from 'react-bootstrap/Carousel';

import D1 from './diapositivas/visual/1.Tema introductorio/Diapositiva1.PNG'
import D2 from './diapositivas/visual/1.Tema introductorio/Diapositiva2.PNG'
import D3 from './diapositivas/visual/1.Tema introductorio/Diapositiva3.PNG'
import D4 from './diapositivas/visual/1.Tema introductorio/Diapositiva4.PNG'
import D5 from './diapositivas/visual/1.Tema introductorio/Diapositiva5.PNG'
import D6 from './diapositivas/visual/1.Tema introductorio/Diapositiva6.PNG'
import D7 from './diapositivas/visual/1.Tema introductorio/Diapositiva7.PNG'
import D8 from './diapositivas/visual/1.Tema introductorio/Diapositiva8.PNG'
import D9 from './diapositivas/visual/1.Tema introductorio/Diapositiva9.PNG'
import D10 from './diapositivas/visual/1.Tema introductorio/Diapositiva10.PNG'
import D11 from './diapositivas/visual/1.Tema introductorio/Diapositiva11.PNG'

import D12 from './diapositivas/visual/2.Intervalos/Diapositiva1.PNG'
import D13 from './diapositivas/visual/2.Intervalos/Diapositiva2.PNG'
import D14 from './diapositivas/visual/2.Intervalos/Diapositiva3.PNG'
import D15 from './diapositivas/visual/2.Intervalos/Diapositiva4.PNG'
import D16 from './diapositivas/visual/2.Intervalos/Diapositiva5.PNG'
import D17 from './diapositivas/visual/2.Intervalos/Diapositiva6.PNG'
import D18 from './diapositivas/visual/2.Intervalos/Diapositiva7.PNG'


import D19 from './diapositivas/visual/3.Escalas/Diapositiva1.PNG'
import D20 from './diapositivas/visual/3.Escalas/Diapositiva2.PNG'
import D21 from './diapositivas/visual/3.Escalas/Diapositiva3.PNG'
import D22 from './diapositivas/visual/3.Escalas/Diapositiva4.PNG'
import D23 from './diapositivas/visual/3.Escalas/Diapositiva5.PNG'
import D24 from './diapositivas/visual/3.Escalas/Diapositiva6.PNG'

import D25 from './diapositivas/visual/4.Acordes/Diapositiva1.PNG'
import D26 from './diapositivas/visual/4.Acordes/Diapositiva2.PNG'
import D27 from './diapositivas/visual/4.Acordes/Diapositiva3.PNG'
import D28 from './diapositivas/visual/4.Acordes/Diapositiva4.PNG'
import D29 from './diapositivas/visual/4.Acordes/Diapositiva5.PNG'

export default function Visual()
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
    <div className='Visual'>
        <div className='container'>
            <div className='row'>
                <div className='col-xl-12'>
                <Carousel interval={null}>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D1}
                alt="First slide"
            />

            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D2}
                alt="Second slide"
            />

            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D3}
                alt="Third slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D4}
                alt="Fourth slide"
            />

            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D5}
                alt="Fifth slide"
            />

            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D6}
                alt="Sixth slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D7}
                alt="Seventh slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D8}
                alt="eighth slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D9}
                alt="Nineth slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D10}
                alt="Tenth slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D11}
                alt="eleventh slide"
            />
            </Carousel.Item>
        </Carousel>
                </div>
            </div>
          <div>
            
          </div>
          <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
        </div>

    </div>
);

}
else if(IsTema2)
{
    return(
    <div className='Visual'>
    <div className='container'>
        <div className='row'>
            <div className='col-xl-12'>
            <Carousel interval={null}>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={D12}
            alt="First slide"
        />

        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={D13}
            alt="Second slide"
        />

        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={D14}
            alt="Third slide"
        />
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={D15}
            alt="Fourth slide"
        />

        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={D16}
            alt="Fifth slide"
        />

        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={D17}
            alt="Sixth slide"
        />
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={D18}
            alt="Seventh slide"
        />
        </Carousel.Item>
    </Carousel>
            </div>
        </div>
      <div>
        
      </div>
      <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
    </div>

</div>
);
}
else if(IsTema3)
{
    return(
        <div className='Visual'>
        <div className='container'>
            <div className='row'>
                <div className='col-xl-12'>
                <Carousel interval={null}>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D19}
                alt="First slide"
            />
    
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D20}
                alt="Second slide"
            />
    
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D21}
                alt="Third slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D22}
                alt="Fourth slide"
            />
    
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D23}
                alt="Fifth slide"
            />
    
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D24}
                alt="Sixth slide"
            />
            </Carousel.Item>
        </Carousel>
                </div>
            </div>
          <div>
            
          </div>
          <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
        </div>
    </div>
    );
}
else if(IsTema4)
{
    return(
        <div className='Visual'>
        <div className='container'>
            <div className='row'>
                <div className='col-xl-12'>
                <Carousel interval={null}>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D25}
                alt="First slide"
            />
    
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D26}
                alt="Second slide"
            />
    
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D27}
                alt="Third slide"
            />
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D28}
                alt="Fourth slide"
            />
    
            </Carousel.Item>
            <Carousel.Item>
            <img
                className="d-block w-100"
                src={D29}
                alt="Fifth slide"
            />
            </Carousel.Item>
        </Carousel>
                </div>
            </div>
          <div>
            
          </div>
          <button type="submit" className="btn text-light mt-2 fondobotonhome" onClick={() => handleSubmit()}>Terminar tema</button>
        </div>
    
    </div>
    );
}
}