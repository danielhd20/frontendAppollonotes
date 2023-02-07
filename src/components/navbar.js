import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {useCookies, Cookies} from 'react-cookie';
import { useNavigate,  } from "react-router-dom";
import './css/navbar.css';

export default function Navb() {
  let navigate = useNavigate();// eslint-disable-next-line
    const[token, setToken, removeToken] = useCookies(['mytoken'])
    const cookies = new Cookies();

    const logout = () => {
        removeToken(['mytoken']);
        cookies.remove('mytoken');
        cookies.remove('csrftoken'); 
        cookies.remove('idUser');
        navigate('/')
      }
      
    return (
      
      <Navbar className='ColorFondoNavbar' expand="lg">
        <Container>
          {/* NavBar de mobile < 900px */}
              <Navbar.Brand href="/home" className='d-lg-none '> {/* d-lg-none signfica que en desktop no aparece (ver mas en display property*/}
                <img
                    src="https://cdn.discordapp.com/attachments/884494223909462166/1058447246368186388/image.png"   
                    width="80"
                    height="50"
                    alt="logo-apollonotes"
                  />
              </Navbar.Brand>

              {/* NavBar de escritorio > 900px */}
            <Navbar.Brand href="/home" className='d-none d-sm-none d-lg-block mx-auto'> {/* mx auto es para centrar*/}
              <img
                src="https://cdn.discordapp.com/attachments/884494223909462166/1058447246368186388/image.png"  
                width="80"
                height="50"
                alt="logo-apollonotes"
                className='Centradoo'
              />
            </Navbar.Brand>

            <Button className="btn btn-dark d-lg-none" onClick={logout}>Salir</Button>
            
        </Container>
        <Button className="btn btn-dark mx-1 d-none d-sm-none d-md-none d-lg-block" onClick={logout}>Salir</Button>
        
    
      </Navbar>
    );
  }
  
