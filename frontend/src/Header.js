import React from 'react'; //sempre obrigatório importar o react

export default function Header({ children }) {//para pegar as propriedades da tag header lá do app.js
  return(
    <header>
      <h1>{children}</h1> {/* children retorna todo o conteudo de dentro da tag header do app.js */}
    </header>
  );
}
