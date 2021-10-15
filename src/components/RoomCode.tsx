import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

export function RoomCode(){
    //Quando o usuário clicar, copiou o código
    
    return(
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copy Room" />
            </div>
            <span>Sala 12001201ssad</span>
        </button>
    ); 
}