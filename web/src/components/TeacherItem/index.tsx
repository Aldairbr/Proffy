import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
  return(
    <article className="teacher-item">
      <header>
        <img src="https://avatars0.githubusercontent.com/u/42809212?s=460&u=32702af9b4beb86d5439b0da728921c7d87026a1&v=4" alt="Aldair Rodrigues"/>
        <div>
          <strong>Aldair Rodrigues</strong>
          <span>Mátematica</span>
        </div>
      </header>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad ipsa iure mollitia nam ea, cum quae blanditiis, 
        <b /><b /> deserunt voluptas dolore neque, accusantium eligendi consequuntur et non. Qui expedita dicta consequuntur?
      </p>

      <footer>
        <p>
          preço/hora
          <strong>R$ 70,00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem