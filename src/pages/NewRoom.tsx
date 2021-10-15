import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import {Button} from '../components/Button';
import '../styles/auth.scss';
import { Link} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { idText } from 'typescript';
import { useHistory} from 'react-router-dom';

export function NewRoom(){

    const {user} = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState(''); //Pegar o código de baixo
    
    async function handleCreateRoom(event : FormEvent){
        event.preventDefault();

        //console.log(newRoom); //Agora se eu digitar 123 lá no input, no console vai aparecer o que vc digitou

        if(newRoom.trim() == ''){ //Caso o valor seja vazio  
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`rooms/${firebaseRoom.key}`);
    }

    return(
        <div id="page-auth">
        <aside>
            <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo real</p>
        </aside>
        <main>
            <div className="main-content">
                <img src={logoImg} alt="LetmeAsk" />

                <h2>Criar nova sala</h2>
                <form onSubmit={handleCreateRoom}>
                    <input type="text"
                    placeholder="Nome da sala"
                    onChange={event => setNewRoom(event.target.value)}
                    value={newRoom}
                    />
                    <Button type="submit">Criar nova sala</Button>
                </form>
                <p>
                    Quer entrar em uma sala existente? <Link to="/">clique Aqui</Link> 
                </p> 
            </div>
        </main>
    </div> 
    );
}

