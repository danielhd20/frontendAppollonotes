import './css/404.css';

export default function NotFound()
{
return(
<section className="page_404 justify-content-center align-items-center d-flex">
    <div className="container ">
        <div className="row justify-content-center align-items-center d-flex">	
            <div className="">
                <div className="text-center">
                    <div className="four_zero_four_bg">
                        <h1 className="text-center ">Error 404</h1>
                    </div>

                    <div className="contant_box_404">
                    <h3 className="h2">
                    Oops.<br></br>¡Parece que te has perdido en el templo!
                    </h3>
                    <p>¡La pagina que estas buscando no está disponible!</p>
                    
                    <a href="/" className="link_404"><b>Regresar al inicio</b></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
);
}