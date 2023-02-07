import React, { useEffect, useState } from 'react';
import {Cookies, useCookies} from 'react-cookie';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import './css/testA.css';

export default function TestAprendizaje(){

    const {id} = useParams();
    const cookies = new Cookies();
    let navigate = useNavigate();

    const [puntuaciónVisual, setPuntuaciónVisual] = useState(0);
    const [puntuaciónAural, setPuntuaciónAural] = useState(0);
    const [puntuaciónReading, setPuntuaciónReading] = useState(0);
    const [puntuaciónKinestesica, setPuntuaciónKinestesica] = useState(0);
    const [preguntaActual, setPreguntaActual] = useState(0);// eslint-disable-next-line
    const [isFinished, setIsFinished] = useState(false);// eslint-disable-next-line
    const [preferencias, setPreferencias] = useState([]);// eslint-disable-next-line
    const [preferenciasAux, setPreferenciasAux] = useState([]);// eslint-disable-next-line
    const [preferenciasFinal, setPreferenciasFinal] = useState([]);// eslint-disable-next-line
    const [segundaPreferenciaFinal, setSegundaPreferenciaFinal] = useState([]);

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");// eslint-disable-next-line
    const [estiloAprendizaje, setEstiloAprendizaje] = useState("");// eslint-disable-next-line
    const [estiloAprendizaje2, setEstiloAprendizaje2] = useState("");
    const [resultado, setResultado] = useState("");
    const [temaProgreso, setTemaProgreso] = useState("");
    const [user,setUser] = useState("");
    const[token] = useCookies(['mytoken']);

    

    useEffect(() => {
        if(token['mytoken']){
            loadInfo();

            Swal.fire({
                title: 'Hola, bienvenido(a) al test de Apolo para definir tu estilo de aprendizaje.<br></br>Lee atentamente cada pregunta y elija la respuesta que mejor explique su preferencia. <br></br> <b>Por favor</b>, haga clic en más de una respuesta si una sola no se ajusta a su percepción.<br></br> Es decir, si está de acuerdo con más de una respuesta o con todas, puede marcarlas sin problema.',
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
        else{
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const preguntas = [
        {
          titulo: "Necesito encontrar el camino a una tienda que me recomendó un amigo. Yo:",
          opciones: [
            { textoRespuesta: "Usaría un mapa.", id: "V"},
            { textoRespuesta: "Le diría a mi amigo que me diera las indicaciones.", id: "A"},
            { textoRespuesta: "Escribiría el nombre de la calle que debo recordar.", id: "R"},
            { textoRespuesta: "Buscaría dónde está la tienda en relación con algún lugar que conozco.", id: "K"},
            ],
        },
        {
            titulo: "Una página web tiene un vídeo que muestra cómo hacer un gráfico o una tabla especial. Hay una persona hablando, algunas listas y palabras que describen lo que hay que hacer y algunos diagramas. Aprendería más:",
            opciones: [
              { textoRespuesta: "Viendo los diagramas.", id: "V"},
              { textoRespuesta: "Escuchando.", id: "A"},
              { textoRespuesta: "Leyendo las palabras.", id: "R"},
              { textoRespuesta: "Viendo las acciones.", id: "K"},
              ],
          },
        {
        titulo: "Quiero saber más sobre una excursión a la que voy a ir. Yo:",
        opciones: [
            { textoRespuesta: "Usaría un mapa y vería dónde están los lugares.", id: "V"},
            { textoRespuesta: "Hablaría con la persona que planificó la excursión o con otras personas que vayan a hacerla.", id: "A"},
            { textoRespuesta: "Leería sobre la excursión en el itinerario", id: "R"},
            { textoRespuesta: "Miraría los detalles sobre los aspectos más destacados y las actividades de la excursión.", id: "K"},
            ],
        },
        {
        titulo: "A la hora de elegir una carrera o un área de estudio, esto es importante para mí:",
        opciones: [
            { textoRespuesta: "Trabajar con diseños, mapas o gráficos.", id: "V"},
            { textoRespuesta: "Comunicarme con otros a través del diálogo.", id: "A"},
            { textoRespuesta: "Utilizar bien las palabras en las comunicaciones escritas.", id: "R"},
            { textoRespuesta: "Aplicar mis conocimientos en situaciones reales.", id: "K"},
            ],
        },
        {
        titulo: "Cuando aprendo:",
        opciones: [
            { textoRespuesta: "Veo patrones en las cosas.", id: "V"},
            { textoRespuesta: "Me gusta hablar de las cosas.", id: "A"},
            { textoRespuesta: "Leo libros, artículos y folletos.", id: "R"},
            { textoRespuesta: "Uso ejemplos y aplicaciones.", id: "K"},
            ],
        },
        {
        titulo: "Quiero ahorrar más dinero y decidir entre una serie de opciones. Yo:",
        opciones: [
            { textoRespuesta: "Utilizaría gráficos que muestren diferentes opciones para diferentes periodos de tiempo.", id: "V"},
            { textoRespuesta: "Hablaría con un experto sobre las opciones.", id: "A"},
            { textoRespuesta: "Leería un folleto impreso que describa las opciones en detalle.", id: "R"},
            { textoRespuesta: "Consideraría ejemplos de cada opción utilizando mi información financiera.", id: "K"},
            ],
        },
        {
        titulo: "Quiero aprender a jugar un nuevo juego de mesa o de cartas. Yo:",
        opciones: [
            { textoRespuesta: "Utilizaría los diagramas que explican las distintas fases, movimientos y estrategias del juego.", id: "V"},
            { textoRespuesta: "escuchar a alguien que lo explique y haga preguntas.", id: "A"},
            { textoRespuesta: "Leería las instrucciones.", id: "R"},
            { textoRespuesta: "Observaría a otros jugar antes de unirme al juego.", id: "K"},
            ],
        },
        {
        titulo: "Tengo un problema en el corazón. Preferiría que el médico:",
        opciones: [
            { textoRespuesta: "Le mostrara un diagrama de lo que está mal.", id: "V"},
            { textoRespuesta: "Describiera lo que está mal.", id: "A"},
            { textoRespuesta: "Le diera algo que leer para explicar lo que está mal.", id: "R"},
            { textoRespuesta: "Utilizara un modelo de plástico para mostrar lo que está mal.", id: "K"},
            ],
        },
        {
        titulo: "Quiero aprender a hacer algo nuevo en una computadora. Yo:",
        opciones: [
            { textoRespuesta: "Seguiría los diagramas de un libro.", id: "V"},
            { textoRespuesta: "Hablaría con personas que conozcan el programa.", id: "A"},
            { textoRespuesta: "Leería las instrucciones escritas que vienen con el programa.", id: "R"},
            { textoRespuesta: "Empezaría a utilizarlo y aprender por ensayo y error.", id: "K"},
            ],
        },
        {
        titulo: "Cuando aprendo de Internet, me gusta:",
        opciones: [
            { textoRespuesta: "El diseño y las características visuales interesantes.", id: "V"},
            { textoRespuesta: "Los canales de audio donde puedo escuchar podcasts o entrevistas.", id: "A"},
            { textoRespuesta: "Descripciones, listas y explicaciones escritas interesantes.", id: "R"},
            { textoRespuesta: "Los vídeos que muestran cómo hacer o fabricar algo.", id: "K"},
            ],
        },
        {
        titulo: "Quiero aprender sobre un nuevo proyecto. Me gustaría pedir:",
        opciones: [
            { textoRespuesta: "Diagramas que muestren las etapas del proyecto con gráficos de beneficios y costes.", id: "V"},
            { textoRespuesta: "Una oportunidad para hablar sobre el proyecto.", id: "A"},
            { textoRespuesta: "Un informe escrito que describa las principales características del proyecto.", id: "R"},
            { textoRespuesta: "Ejemplos en los que el proyecto se haya utilizado con éxito.", id: "K"},
            ],
        },
        {
        titulo: "Quiero aprender a tomar mejores fotos. Yo:",
        opciones: [
            { textoRespuesta: "Utilizaría diagramas que muestren la cámara y lo que hace cada parte.", id: "V"},
            { textoRespuesta: "Haría preguntas y hablaría sobre la cámara y sus características.", id: "A"},
            { textoRespuesta: "Utilizaría las instrucciones escritas sobre lo que hay que hacer.", id: "R"},
            { textoRespuesta: "Utilizaría ejemplos de fotos buenas y malas mostrando cómo mejorarlas.", id: "K"},
            ],
        },
        {
        titulo: "Prefiero un presentador o un profesor que utilice:",
        opciones: [
            { textoRespuesta: "Diagramas, cuadros, mapas o gráficos.", id: "V"},
            { textoRespuesta: "Preguntas y respuestas, charlas, discusiones en grupo u oradores invitados.", id: "A"},
            { textoRespuesta: "Folletos, libros o lecturas.", id: "R"},
            { textoRespuesta: "Demostraciones, modelos o sesiones prácticas.", id: "K"},
            ],
        },
        {
        titulo: "Acabo de terminar una competencia o una prueba y me gustaría recibir una opinión. Me gustaría recibirla:",
        opciones: [
            { textoRespuesta: "Mediante gráficos que muestren lo que alcancé.", id: "V"},
            { textoRespuesta: "De alguien que lo hable conmigo.", id: "A"},
            { textoRespuesta: "Mediante una descripción escrita de mis resultados.", id: "R"},
            { textoRespuesta: "Utilizando ejemplos de lo que he hecho.", id: "K"},
            ],
        },
        {
        titulo: "Quiero informarme sobre una casa o un apartamento. Antes de visitarla quisiera:",
        opciones: [
            { textoRespuesta: "Un plano que muestre las habitaciones y un mapa de la zona.", id: "V"},
            { textoRespuesta: "Una conversación con el propietario.", id: "A"},
            { textoRespuesta: "Una descripción impresa de las habitaciones y las características.", id: "R"},
            { textoRespuesta: "Ver un vídeo de la propiedad.", id: "K"},
            ],
        },
        {
        titulo: "Quiero montar una mesa de madera que viene por partes. Aprendería mejor con:",
        opciones: [
            { textoRespuesta: "Diagramas que muestren cada etapa del montaje.", id: "V"},
            { textoRespuesta: "Los consejos de alguien que lo haya hecho antes.", id: "A"},
            { textoRespuesta: "Las instrucciones escritas que vienen con las piezas de la mesa.", id: "R"},
            { textoRespuesta: "Un vídeo de una persona montando una mesa similar.", id: "K"},
            ],
        },
      ];
async function loadInfo(){
        try {
            const request = await fetch("https://danielhd20.pythonanywhere.com/usuarios/"+id+"/",{
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
            console.log(json);
        } catch (error) {
            console.log(error);
        }
    }

function DataSubmit(estiloAp,estiloAp2)
      {
          //console.log("Formulario enviado");
          //console.log(this.state.nombre);
          //console.log(this.state.correo);
          var dataToSend = {nombre: nombre,
                           apellidos: apellidos, 
                           correo: correo,
                           estiloAprendizaje: estiloAp,
                           estiloAprendizaje2: estiloAp2,  
                           resultado: resultado, 
                           temaProgreso: temaProgreso,
                           user: user}
          fetch("https://danielhd20.pythonanywhere.com/usuarios/"+id+"/",{
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
              cookies.remove('IsNew');
              navigate('/home');
              //this.props.history.push('/');           
          }) // Especifica qué se hará con la información traida de la API (data)
          .catch(console.log)
          
          //setIsFinished(true);
      }

function dataFormat(estiloAprendizaje,estiloApren2){
    let estiloA;
    let estiloA2;
        switch (estiloAprendizaje) {
            case 'V':
                estiloA = "Visual";
                if(estiloApren2 === 'A' || estiloApren2 === '') {
                    estiloA2 = "Auditivo";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                else if(estiloApren2 === 'R'){
                    estiloA2 = "Lectura/escritura";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                else if(estiloApren2 === 'K'){
                    estiloA2 = "Kinestésico";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                break;
    
            case 'A':
                estiloA = "Auditivo";
                if(estiloApren2 === 'V') {
                    estiloA2 = "Visual";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                else if(estiloApren2 === 'R'|| estiloApren2 === ''){
                    estiloA2 = "Lectura/escritura";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                else if(estiloApren2 === 'K'){
                    estiloA2 = "Kinestésico";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                break;
    
            case 'R':
                estiloA = "Lectura/escritura";
                if(estiloApren2 === 'V') {
                    estiloA2 = "Visual";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                else if(estiloApren2 === 'A'){
                    estiloA2 = "Auditivo";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                else if(estiloApren2 === 'K' || estiloApren2 === ''){
                    estiloA2 = "Kinestésico";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                break;
    
            case 'K':
                estiloA = "Kinestésico";
                if(estiloApren2 === 'V' || estiloApren2 === '') {
                    estiloA2 = "Visual";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                else if(estiloApren2 === 'A'){
                    estiloA2 = "Auditivo";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                else if(estiloApren2 === 'R'){
                    estiloA2 = "Lectura/escritura";
                    DataSubmit(estiloA,estiloA2);
                    break;
                }
                break;
    //  ----------- Bi-modales ----------
            case 'VA':
            case 'AV':    
                estiloA = "Bi-modal [Visual-Auditivo]";
                estiloA2 = "Auditivo";
                DataSubmit(estiloA,estiloA2);
                break;
    
            case 'VR':
            case 'RV':    
                estiloA = "Bi-modal [Visual-Lectura/escritura]";
                estiloA2 = "Lectura/escritura";
                DataSubmit(estiloA,estiloA2);
                break;
    
            case 'VK':
            case 'KV':    
                estiloA = "Bi-modal [Visual-Kinestésico]";
                estiloA2 = "Visual";
                DataSubmit(estiloA,estiloA2);
                break;
    
            case 'AK':
            case 'KA':    
                estiloA = "Bi-modal [Auditivo-Kinestésico]";
                estiloA2 = "Kinestésico";
                DataSubmit(estiloA,estiloA2);
                break;
            
            case 'RK':
            case 'KR':    
                estiloA = "Bi-modal [Lectura/escritura-Kinestésico]";
                estiloA2 = "Kinestésico";
                DataSubmit(estiloA,estiloA2);
                break;
                
            case 'AR':
            case 'RA':    
                estiloA = "Bi-modal [Auditivo-Lectura/escritura]";
                estiloA2 = "Lectura/escritura";
                DataSubmit(estiloA,estiloA2);
                break; 
    
    //  ----------- multi-modales ----------
            case 'VRK':
            case 'RVK':
            case 'RKV':
            case 'KRV':
            case 'KVR':
            case 'VKR':        
                estiloA = "Multimodal [VRK]";
                estiloA2 = "Bi-modal [Visual-Lectura/escritura]";
                DataSubmit(estiloA,estiloA2);
                break;
    
            case 'VAK':
            case 'AVK':
            case 'AKV':
            case 'KAV':
            case 'KVA':
            case 'VKA':        
                estiloA = "Multimodal [VAK]";
                estiloA2 = "Bi-modal [Visual-Auditivo]";
                DataSubmit(estiloA,estiloA2);
                break; 
    
            case 'VAR':
            case 'AVR':
            case 'ARV':
            case 'RAV':
            case 'RVA':
            case 'VRA':        
                estiloA = "Multimodal [VAR]";
                estiloA2 = "Bi-modal [Visual-Auditivo]";
                DataSubmit(estiloA,estiloA2);
                break;
    
            case 'ARK':
            case 'RAK':
            case 'RKA':
            case 'KRA':
            case 'KAR':
            case 'AKR':        
                estiloA = "Multimodal [ARK]";
                estiloA2 = "Bi-modal [Auditivo-Lectura/escritura]";
                DataSubmit(estiloA,estiloA2);
                break;
    
            default:
                estiloA = "Multimodal [VARK]";
                estiloA2 = "Multimodal [VAR]";
                DataSubmit(estiloA,estiloA2);
                break;
        }
    }
    


function handleAnswerSubmit(e){
    e.preventDefault();
    var steppingDistance;
    var firstPreference=0;
    var secondPreference=0;
    var ThirdPreference=0;
    var FourthPreference=0;
    var posicionTipoA1 = 0;
    var posicionTipoA2 = 0;
    var posicionTipoA3 = 0;
    var posicionTipoA4 = 0;
    var cont1=0;
    var cont2=0;
    var cont3=0;
    var cont4=0;
    var existesegunda=0;
    var existetercera=0;

    if(preguntaActual === preguntas.length-1){

        var puntuación = puntuaciónVisual+puntuaciónAural+puntuaciónReading+puntuaciónKinestesica;

        //guardo las puntuaciones de manera ordenada de tal modo que la posicion en el arreglo me dice el tipo de aprendizaje
        preferencias.push(puntuaciónVisual,puntuaciónAural,puntuaciónReading,puntuaciónKinestesica);

        //guardo las puntuaciones en un array auxiliar para buscar los mayores y comparar 
        preferenciasAux.push(puntuaciónVisual,puntuaciónAural,puntuaciónReading,puntuaciónKinestesica);

        if(puntuación >= 10 && puntuación <=16){

            steppingDistance=1;

        }        
        else if(puntuación >= 17 && puntuación <=22){

            steppingDistance=2;

        }
        else if(puntuación >= 23 && puntuación <=26){

            steppingDistance=3;

        }
        else if(puntuación > 26){

            steppingDistance=4;

        }
        
        preferenciasAux.sort((a, b) => a - b)
        preferenciasAux.reverse();

        firstPreference = preferenciasAux[0]; 
        secondPreference = preferenciasAux[1]; 
        ThirdPreference = preferenciasAux[2]; 
        FourthPreference = preferenciasAux[3]; 

        for (let index = 0; index < preferencias.length; index++) {

            if(preferencias[index]===firstPreference && cont1===0)
            {
                posicionTipoA1 = index; 
                cont1=1; 
            }
            else if(preferencias[index]===secondPreference && cont2===0)
            {
                posicionTipoA2 = index;
                cont2=1; 
            }
            else if(preferencias[index]===ThirdPreference && cont3===0)
            {
                posicionTipoA3 = index; 
                cont3=1; 
            }
            else if(preferencias[index]===FourthPreference && cont4===0)
            {
                posicionTipoA4 = index; 
                cont4=1; 
            }

        }

         if(posicionTipoA1 === 0){
            preferenciasFinal.push("V");
         }
         else if(posicionTipoA1 === 1)
         {
            preferenciasFinal.push("A");
         }
         else if(posicionTipoA1 === 2)
         {
            preferenciasFinal.push("R");
         }
         else if(posicionTipoA1 === 3)
         {
            preferenciasFinal.push("K");
         }

         // ---------- SOLO PARA GUARDAR LA SEGUNDA PREFERENCIA --------------
         if(posicionTipoA2 === 0){
            segundaPreferenciaFinal.push("V");
         }
         else if(posicionTipoA2 === 1)
         {
            segundaPreferenciaFinal.push("A");
         }
         else if(posicionTipoA2 === 2)
         {
            segundaPreferenciaFinal.push("R");
         }
         else if(posicionTipoA2 === 3)
         {
            segundaPreferenciaFinal.push("K");
         }
        //--------------------------------------------------------------------


         if((firstPreference - secondPreference) === steppingDistance && posicionTipoA2 === 0){
            preferenciasFinal.push("V");
            existesegunda=1;
         }
         else if((firstPreference - secondPreference) === steppingDistance && posicionTipoA2 === 1){
            preferenciasFinal.push("A");
            existesegunda=1;
         }
         else if((firstPreference - secondPreference) === steppingDistance && posicionTipoA2 === 2){
            preferenciasFinal.push("R");
            existesegunda=1;
         }
         else if((firstPreference - secondPreference) === steppingDistance && posicionTipoA2 === 3){
            preferenciasFinal.push("K");
            existesegunda=1;
         }


         if((secondPreference - ThirdPreference) === steppingDistance && posicionTipoA3 === 0 && existesegunda===1)
         {
            preferenciasFinal.push("V");
            existetercera=1;
         }
         else if((secondPreference - ThirdPreference) === steppingDistance && posicionTipoA3 === 1 && existesegunda===1)
         {
            preferenciasFinal.push("A");
            existetercera=1;
         }
         else if((secondPreference - ThirdPreference) === steppingDistance && posicionTipoA3 === 2 && existesegunda===1)
         {
            preferenciasFinal.push("R");
            existetercera=1;
         }
         else if((secondPreference - ThirdPreference) === steppingDistance && posicionTipoA3 === 3 && existesegunda===1)
         {
            preferenciasFinal.push("K");
            existetercera=1;
         }


         if((ThirdPreference - FourthPreference) === steppingDistance && posicionTipoA4 === 0 && existetercera===1)
         {
            preferenciasFinal.push("V");
         }
         else if((ThirdPreference - FourthPreference) === steppingDistance && posicionTipoA4 === 1 && existetercera===1)
         {
            preferenciasFinal.push("A");
         }
         else if((ThirdPreference - FourthPreference) === steppingDistance && posicionTipoA4 === 2 && existetercera===1)
         {
            preferenciasFinal.push("R");
         }
         else if((ThirdPreference - FourthPreference) === steppingDistance && posicionTipoA4 === 3 && existetercera===1)
         {
            preferenciasFinal.push("K");
         }

        console.log("first",firstPreference);
        console.log("sec",secondPreference);
        console.log("third",ThirdPreference);
        console.log("fourth",FourthPreference);
        console.log("posición",posicionTipoA1,posicionTipoA2,posicionTipoA3,posicionTipoA4);
        console.log("punt",puntuación);
        console.log("step",steppingDistance);
        console.log(preferencias);
        console.log(preferenciasAux);
        console.log(preferenciasFinal);
        console.log(segundaPreferenciaFinal);

        dataFormat(preferenciasFinal.join(""), segundaPreferenciaFinal.join(""));


    }
    else
    {
        setPreguntaActual(preguntaActual+1)
        

        var x = document.getElementsByClassName("form-check-input");
        for (let index = 0; index < x.length; index++) {
            x[index].checked=false;
            
        }

        
    }
}

function handleChange(event, id) {
    var isChecked = event.target.checked;  
    // var respuesta = event.target.value; 
    if(isChecked && id === "V")
    {
        setPuntuaciónVisual(puntuaciónVisual+1);
    }
    else if(isChecked && id === "A")
    {
        setPuntuaciónAural(puntuaciónAural+1);
    }
    else if(isChecked && id === "R")
    {
        setPuntuaciónReading(puntuaciónReading+1);
    }
    else if(isChecked && id === "K")
    {
        setPuntuaciónKinestesica(puntuaciónKinestesica+1);
    }
    
  }
  
    return(
        <div className='Test'>
        <div className='container'>
        <div className="row justify-content-center align-items-center">
        <div className='col-12 col-md-6 col-lg-4'>
        
        <div className='card text-white border-dark'>
        <div className='card-body CardBodyT'>
            <h4 className="fw-bold text-center fondoTituloTest">Apollo Test 📜</h4>
            
            
            <form className="px-4" onSubmit={handleAnswerSubmit}>
                <p className="fw-bold">Pregunta {preguntaActual + 1} de {preguntas.length}</p>
                
                <p className="fw-bold prueba">{preguntas[preguntaActual].titulo}</p>

                    <div className="form-check">
                        {preguntas[preguntaActual].opciones.map((respuesta) =>(
                            <div key={respuesta.id}>
                                <input className="form-check-input" type="checkbox" value={respuesta.textoRespuesta} id="flexCheckDefault" onChange={(e) => handleChange(e, respuesta.id)} />
                                    <label className="form-check-label text-center" htmlFor="flexCheckDefault">
                                    {respuesta.textoRespuesta}
                                    </label>
                            </div>
                                  ))}
                    </div>
                    <div className="text-center mt-3">
                <button type="submit" className="btn btn-dark botontest">Siguiente pregunta</button>
                </div>
            
            </form>
        </div>    
        </div>
        </div>   
        </div>           
        </div>  
        </div>
    );
}