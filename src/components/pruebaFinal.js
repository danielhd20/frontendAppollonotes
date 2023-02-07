import React, { useEffect, useState } from 'react';
import {useCookies, Cookies} from 'react-cookie';
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';

import './css/pruebaFinal.css';


export default function PruebaFinal()
{

    const[token] = useCookies(['mytoken']);
    const cookies = new Cookies();
    let navigate = useNavigate();
                                                                            
    const [nombre, setNombre] = useState("");                               
    const [apellidos, setApellidos] = useState("");                         
    const [correo, setCorreo] = useState("");                               
    const [estiloAprendizaje, setEstiloAprendizaje] = useState("");
    const [estiloAprendizaje2, setEstiloAprendizaje2] = useState("");         
    const [resultado, setResultado] = useState("");                        
    const [temaProgreso, setTemaProgreso] = useState("");                   
    const [user,setUser] = useState("");


    const [preguntaActual, setPreguntaActual] = useState(0);
    const [puntuación, setPuntuación] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
// eslint-disable-next-line
    const[Vidas,setVidas]=useCookies(['Vidas']);

    const [isReentrada, setIsReentrada] = useState(false);
    const [isSecondtry, setIsSecondtry] = useState(false);
// eslint-disable-next-line
    const[EsNuevo,setEsNuevo]=useCookies(['IsNew']);

    const preguntas = 
        [
        {
            titulo: "¿Cuáles son las 7 notas naturales musicales?",
            opciones: [
              { textoRespuesta: "Do, Re, MiM, A, H, Fam, Sol", isCorrect: false },
              { textoRespuesta: "Do, Re, Mi, A, H, F♮, Si", isCorrect: false },
              { textoRespuesta: "Do, Re, Mi, Fa, Sol, La, Si", isCorrect: true },
            ],
          },
          {
            titulo: "El pentagrama está compuesto por:",
            opciones: [
              { textoRespuesta: "Cinco lineas paralelas y equidistantes.", isCorrect: true },
              { textoRespuesta: "Siete lineas paralelas y equidistantes.", isCorrect: false },
              { textoRespuesta: "Tres lineas paralelas y equidistantes.", isCorrect: false },
            ],
          },
          {
            titulo: "¿Cuáles son las 7 notas naturales musicales en sistema cifrado?",
            opciones: [
              { textoRespuesta: "C,D,E,F,G,A,B", isCorrect: true },
              { textoRespuesta: "Cm,D,E,F♮,G,A,Bb", isCorrect: false },
              { textoRespuesta: "C,Ab,E,F,G,A♮,B", isCorrect: false },
            ],
          },
          {
            titulo: "¿Cuáles son los simbolos que representan las alteraciones/accidentes en las notas?",
            opciones: [
              { textoRespuesta: "# y ♭", isCorrect: true },
              { textoRespuesta: "# y $", isCorrect: false },
              { textoRespuesta: "♭ y &", isCorrect: false },
            ],
          },
          {
            titulo: "Las notas alteradas correctas son:",
            opciones: [
              { textoRespuesta: "C#, D#, F#, G#, A#", isCorrect: true },
              { textoRespuesta: "C#, Re#, Mi#, G#, Ab", isCorrect: false },
              { textoRespuesta: "C#, D#, Fb, G#, A#", isCorrect: false },
            ],
          },

          //------------- Preguntas tema: INTERVALOS -----------------
          {
            titulo: "Cuál de las siguientes opciones tiene una distancia de semitono y tono respectivamente",
            opciones: [
              { textoRespuesta: "DO -> FA y RE -> RE#", isCorrect: false },
              { textoRespuesta: "LA -> LA# y DO -> RE", isCorrect: true },
              { textoRespuesta: "SOL -> SI, y DO -> MI", isCorrect: false },
            ],
          },
          {
            titulo: "Los intervalos mayores y menores solo pueden ser de:",
            opciones: [
              { textoRespuesta: "Segunda, cuarta, quinta, octava", isCorrect: false },
              { textoRespuesta: "Tercera, quinta, septima, octava", isCorrect: false },
              { textoRespuesta: "Segunda, tercera, sexta, septima", isCorrect: true },
            ],
          },
          {
            titulo: "Que intervalo equivale a 2 tonos y medio",
            opciones: [
              { textoRespuesta: "Segunda menor", isCorrect: false },
              { textoRespuesta: "Cuarta justa", isCorrect: true },
              { textoRespuesta: "septima mayor", isCorrect: false },
            ],
          },
          {
            titulo: "Que intervalo equivale a 4 tonos",
            opciones: [
              { textoRespuesta: "Sexta menor", isCorrect: true },
              { textoRespuesta: "Tercera justa", isCorrect: false },
              { textoRespuesta: "Quinta mayor", isCorrect: false },
            ],
          },
          {
            titulo: "Que intervalo equivale a 3 tonos (tritono)",
            opciones: [
              { textoRespuesta: "Quinta disminuida", isCorrect: true },
              { textoRespuesta: "Tercera mayor", isCorrect: false },
              { textoRespuesta: "Cuarta aumentada", isCorrect: true },
            ],
          },

        //------------- Preguntas tema: ESCALAS -----------------
        {
          titulo: "Cuál es la disposición correcta de intervalos para formar una escala MENOR: (T = Tono, ST = Semitono)",
          opciones: [
            { textoRespuesta: "T-ST-T-T-ST-T-T", isCorrect: true },
            { textoRespuesta: "T-ST-T-ST-T-T-T", isCorrect: false },
            { textoRespuesta: "T-ST-T-T-T-ST-T", isCorrect: false },
          ],
        },
        {
          titulo: "Cuál es la disposición correcta de intervalos para formar una escala MAYOR:",
          opciones: [
            { textoRespuesta: "Tono-Tono-Tono-Tono-Semitono-Tono-Tono", isCorrect: false },
            { textoRespuesta: "Tono-Semitono-Tono-Semitono-Tono-Tono-Tono", isCorrect: false },
            { textoRespuesta: "Tono-Semitono-Tono-Tono-Tono-Semitono-Tono", isCorrect: true },
          ],
        },
        {
          titulo: "Cuál es la disposición correcta de intervalos para formar una escala PENTATÓNICA MAYOR: (T = Tono, ST = Semitono)",
          opciones: [
            { textoRespuesta: "T ST T T ST", isCorrect: false },
            { textoRespuesta: "T T Tercera menor T Tercera menor", isCorrect: true },
            { textoRespuesta: "Tercera menor T T Tercera menor T", isCorrect: false },
          ],
        },
        {
          titulo: "Que notas forman la escala mayor de RE",
          opciones: [
            { textoRespuesta: "Re, Fa, fa#, sol, la#, si, do#, re", isCorrect: false },
            { textoRespuesta: "Re, mi, fa#, sol, la, si, do#, re", isCorrect: true },
            { textoRespuesta: "Re, mi, fa#, sol#, la, si, do, re", isCorrect: false },
          ],
        },
        {
          titulo: "Que notas forman la escala pentatónica menor de Do",
          opciones: [
            { textoRespuesta: "Do, Mi, Fa♭, Sol#, Si, Do", isCorrect: false },
            { textoRespuesta: "Do, Mi♭, Fa, Sol, Si♭, Do", isCorrect: true },
            { textoRespuesta: "Do, Re, Fa, Sol, Si#, Do", isCorrect: false },
          ],
        },

        //------------- Preguntas tema: ACORDES -----------------
        {
          titulo: "Todo acorde se construye a partir de:",
          opciones: [
            { textoRespuesta: "La superposición de terceras", isCorrect: true },
            { textoRespuesta: "La combinación de 2 notas iguales", isCorrect: false },
            { textoRespuesta: "La superposición de segundas", isCorrect: false },
          ],
        },
        {
          titulo: "Un acorde MAYOR se construye superponiendo: ",
          opciones: [
            { textoRespuesta: "tercera mayor y una tercera menor", isCorrect: true },
            { textoRespuesta: "tercera mayor y una tercera mayor", isCorrect: false },
            { textoRespuesta: "tercera menor y una tercera mayor", isCorrect: false },
          ],
        },
        {
          titulo: "Cual de las siguientes triadas equivale al acorde MENOR de DO",
          opciones: [
            { textoRespuesta: "Do, Re, Sol", isCorrect: false },
            { textoRespuesta: "Do, Fa, La", isCorrect: false },
            { textoRespuesta: "Do, Mi♭, Sol", isCorrect: true },
          ],
        },
        {
          titulo: "Un acorde MAYOR de septima mayor se construye superponiendo: ",
          opciones: [
            { textoRespuesta: "tercera mayor, una tercera menor y tercera una mayor", isCorrect: true },
            { textoRespuesta: "tercera menor, una tercera menor y tercera una menor", isCorrect: false },
            { textoRespuesta: "tercera menor, una tercera mayor y tercera una menor", isCorrect: false },
          ],
        },
        {
          titulo: "Cual de las siguientes cuatriadas equivale al acorde mayor de septima mayor de DO",
          opciones: [
            { textoRespuesta: "Do, Fa, La, Si", isCorrect: false },
            { textoRespuesta: "Do, Mi, Sol, Si", isCorrect: true },
            { textoRespuesta: "Do, Re, Mi, Fa", isCorrect:  false },
          ],
        },
        ]


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


        if(json.resultado===0)
        {
          setVidas('Vidas',1);
        }
        else{
          setIsFinished(true);
          setPuntuación(json.resultado);
          setIsReentrada(true);
        }
        if(json.resultado === 0)
        {
          Swal.fire({
            title: 'Hola, bienvenido(a) <br></br> A la prueba final de Apolo para comprobar tus conocimientos adquiridos en el templo.<br></br>Esta prueba consta de 20 preguntas y el mínimo de preguntas correctas para aprobar son <b>12.</b><br></br> Lee atentamente cada pregunta y elija la respuesta que considere correcta. (después de elegir la respuesta, esta se marcara verde o rojo indicando si era la correcta o no).<br></br>En caso de NO aprobar la evaluación, tiene un <b>intento adicional</b> para hacerlo inmediatamente. <br></br> Si definitivamente no aprueba en ninguno de los 2 intentos dados, se le dará la opción de repasar el material nuevamente con el estilo de aprendizaje <b>secundario</b> asignado en el primer test. ',
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
   
function handleAnswerSubmit(isCorrect, e)
{
 if(isCorrect) setPuntuación(puntuación + 1);
    
 e.target.classList.add(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
        if(preguntaActual === preguntas.length -1)
        {
           setIsFinished(true);
        }
        else
        {
           setPreguntaActual(preguntaActual + 1);
        }
    },1000)
}
function DataSubmit(puntuación,e)
{
  e.preventDefault();
    //console.log("Formulario enviado");
    //console.log(this.state.nombre);
    //console.log(this.state.correo);
    var dataToSend = {nombre: nombre,
                      apellidos: apellidos, 
                      correo: correo,
                      estiloAprendizaje: estiloAprendizaje,
                      estiloAprendizaje2: estiloAprendizaje2, 
                      resultado: puntuación, 
                      temaProgreso: temaProgreso,
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
        setResultado(puntuación);
       
        console.log("Data updated succesfully:",data);
        //navigate('/');
        //this.props.history.push('/');           
    }) // Especifica qué se hará con la información traida de la API (data)
    .catch(console.log)
    
    //setIsFinished(true);
}
function DataSubmit2(estiloApNuevo)
{

    //console.log("Formulario enviado");
    //console.log(this.state.nombre);
    //console.log(this.state.correo);
    var dataToSend = {nombre: nombre,
                      apellidos: apellidos, 
                      correo: correo,
                      estiloAprendizaje: estiloAprendizaje2,
                      estiloAprendizaje2: estiloApNuevo, 
                      resultado: 0, 
                      temaProgreso: "Introducción",
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
        //setResultado(puntuación);
        console.log("Data updated succesfully:",data);
        navigate('/home');
        //this.props.history.push('/');           
    }) // Especifica qué se hará con la información traida de la API (data)
    .catch(console.log)
    
    //setIsFinished(true);
}
function estiloNuevo(estiloAprendizajeActual, estiloAprendizajeNuevo){
  let estiloAnuevo;
      switch (true) {
          case (estiloAprendizajeActual === 'Visual' && estiloAprendizajeNuevo === 'Auditivo'):                 //1,2 -> 3
          estiloAnuevo = "Lectura/escritura";
          DataSubmit2(estiloAnuevo);
          break;
  
          case (estiloAprendizajeActual === 'Visual' && estiloAprendizajeNuevo === 'Lectura/escritura'):        //1,3 -> 4
            estiloAnuevo = "Kinestésico";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Visual' && estiloAprendizajeNuevo === 'Kinestésico'):              //1,4 -> 2
            estiloAnuevo = "Auditivo";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Auditivo' && estiloAprendizajeNuevo === 'Visual'):                 //2,1 -> 3
            estiloAnuevo = "Lectura/escritura";
            DataSubmit2(estiloAnuevo);
            break;
          
          case (estiloAprendizajeActual === 'Auditivo' && estiloAprendizajeNuevo === 'Lectura/escritura'):      //2,3 -> 4
            estiloAnuevo = "Kinestésico";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Auditivo' && estiloAprendizajeNuevo === 'Kinestésico'):            //2,4 -> 1
            estiloAnuevo = "Visual";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Lectura/escritura' && estiloAprendizajeNuevo === 'Visual'):        //3,1 -> 2
            estiloAnuevo = "Auditivo";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Lectura/escritura' && estiloAprendizajeNuevo === 'Auditivo'):      //3,2 -> 4
            estiloAnuevo = "Kinestésico";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Lectura/escritura' && estiloAprendizajeNuevo === 'Kinestésico'):   //3,4 -> 1
            estiloAnuevo = "Visual";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Kinestésico' && estiloAprendizajeNuevo === 'Visual'):              //4,1 -> 2
            estiloAnuevo = "Auditivo";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Kinestésico' && estiloAprendizajeNuevo === 'Auditivo'):            //4,2 -> 3
            estiloAnuevo = "Lectura/escritura";
            DataSubmit2(estiloAnuevo);
            break;

          case (estiloAprendizajeActual === 'Kinestésico' && estiloAprendizajeNuevo === 'Lectura/escritura'):   //4,3 -> 1
            estiloAnuevo = "Visual";
            DataSubmit2(estiloAnuevo);
            break;


          //BI-MODALES

          case (estiloAprendizajeActual === 'Bi-modal [Visual-Auditivo]' && estiloAprendizajeNuevo === 'Auditivo'):   
          estiloAnuevo = "Visual";
          DataSubmit2(estiloAnuevo);
          break;

          case (estiloAprendizajeActual === 'Bi-modal [Visual-Lectura/escritura]' && estiloAprendizajeNuevo === 'Lectura/escritura'):   
          estiloAnuevo = "Auditivo";
          DataSubmit2(estiloAnuevo);
          break;

          case (estiloAprendizajeActual === 'Bi-modal [Visual-Kinestésico]' && estiloAprendizajeNuevo === 'Visual'):   
          estiloAnuevo = "Lectura/escritura";
          DataSubmit2(estiloAnuevo);
          break;

          case (estiloAprendizajeActual === 'Bi-modal [Auditivo-Kinestésico]' && estiloAprendizajeNuevo === 'Kinestésico'):   
          estiloAnuevo = "Visual";
          DataSubmit2(estiloAnuevo);
          break;

          case (estiloAprendizajeActual === 'Bi-modal [Lectura/escritura-Kinestésico]' && estiloAprendizajeNuevo === 'Kinestésico'):   
          estiloAnuevo = "Auditivo";
          DataSubmit2(estiloAnuevo);
          break;

          case (estiloAprendizajeActual === 'Bi-modal [Auditivo-Lectura/escritura]' && estiloAprendizajeNuevo === 'Lectura/escritura'):   
          estiloAnuevo = "Kinestésico";
          DataSubmit2(estiloAnuevo);
          break;

          //MULTI-MODALES
          case (estiloAprendizajeActual === 'Multimodal [VRK]' && estiloAprendizajeNuevo === 'Bi-modal [Visual-Lectura/escritura]'):   
          estiloAnuevo = "Multimodal [VARK]";
          DataSubmit2(estiloAnuevo);
          break;

          case (estiloAprendizajeActual === 'Multimodal [VAK]' && estiloAprendizajeNuevo === 'Bi-modal [Visual-Auditivo]'):   
          estiloAnuevo = "Multimodal [VARK]";
          DataSubmit2(estiloAnuevo);
          break;

          case (estiloAprendizajeActual === 'Multimodal [VAR]' && estiloAprendizajeNuevo === 'Bi-modal [Visual-Auditivo]'):   
          estiloAnuevo = "Multimodal [VARK]";
          DataSubmit2(estiloAnuevo);
          break;

          case (estiloAprendizajeActual === 'Multimodal [ARK]' && estiloAprendizajeNuevo === 'Bi-modal [Auditivo-Lectura/escritura]'):   
          estiloAnuevo = "Multimodal [VARK]";
          DataSubmit2(estiloAnuevo);
          break;

          
          case (estiloAprendizajeActual === 'Multimodal [VARK]' && estiloAprendizajeNuevo === 'Multimodal [VAR]'):   
          estiloAnuevo = "Multimodal [VARK]";
          DataSubmit2(estiloAnuevo);
          break;
          default:
            estiloAnuevo = "Multimodal [VARK]";
              DataSubmit2(estiloAnuevo);
              break;
      }
  }
function NuevoIntento()
{
  cookies.remove('Vidas');
  setPreguntaActual(0);
  setPuntuación(0);
  setIsFinished(false);
  setIsSecondtry(true);

}
if(isFinished && puntuación === 20 && !isReentrada)
{
    return(
      <div className='Prueba' onLoad={(e) => DataSubmit(puntuación,e)}>
          <div className='container'>
              <div className="row justify-content-center align-items-center">
                      <div className='col-12 col-md-6 col-lg-4 CardBody'>
                      <div className="card cardBodyHome">
                          <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                          <div className="card-body ">
                              <h4 className="card-title"><b>🎇🎊¡FELICITACIONES! 🥳🎉</b></h4>
                              <p className="card-text">Has superado el test con la puntuación <b>máxima</b> posible:<br></br> <b>{puntuación} de 20 puntos totales</b> <br></br>Apolo y los demás dioses están orgullosos de ti y esperan que sigas por el camino de las melodias</p>
  
                              <Link to="/home" className="btn btn text-light fondobotonhome">
                                  Regresar al inicio
                              </Link>
                          </div>
                      </div>
  
                      </div>
              </div>
          </div>
      </div>
    );
}
else if(isFinished && puntuación === 20){
  return(
    <div className='Prueba'>
        <div className='container'>
            <div className="row justify-content-center align-items-center">
                    <div className='col-12 col-md-6 col-lg-4 CardBody'>
                    <div className="card cardBodyHome">
                        <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                        <div className="card-body ">
                            <h4 className="card-title"><b>🎇🎊¡FELICITACIONES! 🥳🎉</b></h4>
                            <p className="card-text">Has superado el test con la puntuación <b>máxima</b> posible:<br></br> <b>{puntuación} de 20 puntos totales</b> <br></br>Apolo y los demás dioses están orgullosos de ti y esperan que sigas por el camino de las melodias</p>

                            <Link to="/home" className="btn btn text-light fondobotonhome">
                                Regresar al inicio
                            </Link>
                        </div>
                    </div>

                    </div>
            </div>
        </div>
    </div>
  );
}

if(isFinished && puntuación >= 12 && cookies.get('Vidas') === "1")
{
  return(
    <div className='Prueba' onLoad={(e) => DataSubmit(puntuación,e)}>
        <div className='container'>
            <div className="row justify-content-center align-items-center">
                    <div className='col-12 col-md-6 col-lg-4 CardBody'>
                    <div className="card cardBodyHome">
                        <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                        <div className="card-body ">
                            <h4 className="card-title"><b>🎇🎊¡FELICITACIONES! 🥳🎉</b></h4>
                            <p className="card-text">Has superado el test con una puntuación total de:<br></br> <b>{puntuación} de 20 puntos totales</b> <br></br>Apolo y los demás dioses están orgullosos de ti y esperan que sigas por el camino de las melodias.<br></br><br></br>Todavia tienes un segundo intento por si quieres mejorar la puntuacion, en caso de que no apruebes se te dejará la puntuación mas alta.</p>

                            <Link to="/home" className="btn btn text-light fondobotonhome">
                                Regresar al inicio
                            </Link>
                            
                            <button onClick={() => NuevoIntento()} className="btn btn text-light fondobotonhome ms-2 ">
                                Intentar de nuevo
                            </button>
                        </div>
                    </div>

                    </div>
            </div>
        </div>
    </div>
);
}
if((isFinished && (puntuación >= 12 || parseInt(resultado) >= 12) && !cookies.get('Vidas')))
{
  if(parseInt(resultado)>puntuación)
  {
    return(
      <div className='Prueba'>
          <div className='container'>
              <div className="row justify-content-center align-items-center">
                      <div className='col-12 col-md-6 col-lg-4 CardBody'>
                      <div className="card cardBodyHome">
                          <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                          <div className="card-body ">
                              <h4 className="card-title"><b>🎇🎊¡FELICITACIONES! 🥳🎉</b></h4>
                              <p className="card-text"><b>No superaste</b> el test esta vez pero te dejamos la puntuación del intento pasado el cual fue con una puntuación total de:<br></br> <b>{resultado} de 20 puntos totales</b> <br></br>Apolo y los demás dioses están orgullosos de ti y esperan que sigas por el camino de las melodias</p>
  
                              <Link to="/home" className="btn btn text-light fondobotonhome">
                                  Regresar al inicio
                              </Link>
                          </div>
                      </div>
  
                      </div>
              </div>
          </div>
      </div>
  );
  }
  else if(parseInt(resultado)===puntuación && !isSecondtry)
  {
    return(
      <div className='Prueba'>
          <div className='container'>
              <div className="row justify-content-center align-items-center">
                      <div className='col-12 col-md-6 col-lg-4 CardBody'>
                      <div className="card cardBodyHome">
                          <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                          <div className="card-body ">
                              <h4 className="card-title"><b>🎇🎊¡FELICITACIONES! 🥳🎉</b></h4>
                              <p className="card-text">Has superado el test con una puntuación total de:<br></br> <b>{puntuación} de 20 puntos totales</b> <br></br>Apolo y los demás dioses están orgullosos de ti y esperan que sigas por el camino de las melodias</p>
  
                              <Link to="/home" className="btn btn text-light fondobotonhome">
                                  Regresar al inicio
                              </Link>
                          </div>
                      </div>
  
                      </div>
              </div>
          </div>
      </div>
  );
  }
  else if(puntuación>parseInt(resultado)){
    
    return(
      <div className='Prueba' onLoad={(e) => DataSubmit(puntuación,e)}>
          <div className='container'>
              <div className="row justify-content-center align-items-center">
                      <div className='col-12 col-md-6 col-lg-4 CardBody'>
                      <div className="card cardBodyHome">
                          <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                          <div className="card-body ">
                              <h4 className="card-title"><b>🎇🎊¡FELICITACIONES! 🥳🎉</b></h4>
                              <p className="card-text">Has superado el test otra vez con una <b>nueva</b> puntuación total de:<br></br> <b>{puntuación} de 20 puntos totales</b> <br></br>Apolo y los demás dioses están orgullosos de ti y esperan que sigas por el camino de las melodias</p>
  
                              <Link to="/home" className="btn btn text-light fondobotonhome">
                                  Regresar al inicio
                              </Link>
                          </div>
                      </div>
  
                      </div>
              </div>
          </div>
      </div>
  );
  }
  else if(puntuación===parseInt(resultado) && isSecondtry){
    
    return(
      <div className='Prueba'>
          <div className='container'>
              <div className="row justify-content-center align-items-center">
                      <div className='col-12 col-md-6 col-lg-4 CardBody'>
                      <div className="card cardBodyHome">
                          <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                          <div className="card-body ">
                              <h4 className="card-title"><b>🎇🎊¡FELICITACIONES! 🥳🎉</b></h4>
                              <p className="card-text">Has superado el test otra vez con una <b>nueva</b> puntuación total de:<br></br> <b>{puntuación} de 20 puntos totales</b> <br></br>Apolo y los demás dioses están orgullosos de ti y esperan que sigas por el camino de las melodias</p>
  
                              <Link to="/home" className="btn btn text-light fondobotonhome">
                                  Regresar al inicio
                              </Link>
                          </div>
                      </div>
  
                      </div>
              </div>
          </div>
      </div>
  );
  }
  
}
if(isFinished && puntuación < 12 && cookies.get('Vidas') === "1")
{
  return(
    <div className='Prueba' onLoad={(e) => DataSubmit(puntuación,e)}>
        <div className='container'>
            <div className="row justify-content-center align-items-center">
                    <div className='col-12 col-md-6 col-lg-4 CardBody'>
                    <div className="card cardBodyHome">
                        <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                        <div className="card-body ">
                            <h4 className="card-title"><b>😰🔴¡Oh No!❌😟</b></h4>
                            <p className="card-text"><b>No</b> has superado el test con una puntuación total de:<br></br> <b>{puntuación} de 20 puntos totales</b> <br></br>PERO no te preocupes Apolo y los demás dioses te dieron otra oportunidad para volverlo a intentar ¡Ánimo, tu puedes!</p>
                            
                            <button onClick={() => NuevoIntento()} className="btn btn text-light fondobotonhome ms-2 ">
                                Intentar de nuevo
                            </button>
                        </div>
                    </div>

                    </div>
            </div>
        </div>
    </div>
);
}
if((isFinished && (puntuación < 12 ||  parseInt(resultado) < 12) && !cookies.get('Vidas')))
{
  return(
    <div className='Prueba' onLoad={(e) => DataSubmit(puntuación,e)}>
        <div className='container'>
            <div className="row justify-content-center align-items-center">
                    <div className='col-12 col-md-6 col-lg-4 CardBody'>
                    <div className="card cardBodyHome">
                        <img className="card-img-top" src="https://cdn.discordapp.com/attachments/884494223909462166/1068318803391422504/diosesgriegosdoble_1943.jpg" alt="Title"></img>
                        <div className="card-body ">
                            <h4 className="card-title"><b>😰🔴¡Oh No!❌😟</b></h4>
                            <p className="card-text"><b>No</b> has superado el test con una puntuación total de:<br></br> <b>{puntuación} de 20 puntos totales</b> <br></br>Apolo y los demás dioses te recomiendan intentar estudiar los temas de nuevo con tu estilo de aprendizaje secundario.</p>

                            <Link to="/home" className="btn btn text-light fondobotonhome">
                                Regresar al inicio
                            </Link>
                            <button  onClick={(e) => estiloNuevo(estiloAprendizaje,estiloAprendizaje2,e)} className="btn btn text-light fondobotonhome ms-2 ">
                                Iniciar con estilo secundario
                            </button>
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
    <div className='Prueba'>
        <div className='container'>
            <div className="row justify-content-center align-items-center">
                    <div className='col-12 col-md-6 col-lg-4 CardBody'>
                        
                        <div className='lado-izquierdo'>
                            <div className='numero-pregunta'>
                            <h5 className="fw-bold">📜 Pregunta {preguntaActual + 1} de {preguntas.length} 📜</h5>
                            </div>
                                Seleccione la respuesta correcta a:
                        <h5 className='titulo-pregunta fw-bold'> {preguntas[preguntaActual].titulo}</h5>

                        </div>
                        <div className='lado-derecho'>
                            {preguntas[preguntaActual].opciones.map((respuesta) => (
                                <button key={respuesta.textoRespuesta} onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)} className='buttonPrueba'>{respuesta.textoRespuesta}</button>
                            ))}
                        </div>


                    </div>
            </div>
        </div>
    </div>
);
}
}