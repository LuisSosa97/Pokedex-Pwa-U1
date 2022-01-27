import './App.css';
import { useEffect, useState } from 'react';
import React from 'react';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};





function App() {
  const [botonActivo, setBotonActivo] = useState(true)
  const [pokemon, setPokemon] = useState({});
  const [pokemonId, setPokemonId] = useState(1);
  const [busqueda, setBusqueda]= useState("");

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }


  const onChange = async e=>{

    e.persist();

    setBusqueda(e.target.value);

  }

  const fetchPokemonbyname = () => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)

      .then((response) => response.json())

      .then((data) => setPokemon(data))

      ;

  };
  
  

  const fetchPokemon= (id) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((Response)=> Response.json())
    .then((data) => setPokemon(data));
    openBoton();
  };
  const getRandomInt = (min = 1, max = 500)=>{
   
      return Math.floor(Math.random() * (max - min) + min)
    
  }
  const openBoton = ()=>{
    setBotonActivo(false)
  }


  const currentID =() =>{
    return pokemon.id = 0
  }
 
 
  const nextID=(idMin=1, idMax=600) =>{
    if((pokemon.id === isNaN && pokemon.id === isNaN) || (pokemon.id === undefined && pokemon.id === undefined)){
      currentID();
      
    }
    if(pokemon.id >= idMax){
        return pokemon.id = idMin;
        
        
        }else{
          return pokemon.id + 1;
          
          }
  }
  const backID=(idMin=1, idMax=600) =>{
    if((pokemon.id === isNaN && pokemon.id === isNaN) || (pokemon.id === undefined && pokemon.id === undefined)){
      currentID();
      openBoton();
      
    }
      if(pokemon.id <= idMin){
        return pokemon.id = idMax;
          }else{
            return pokemon.id -1;
          }
  }

  useEffect(()=>{
    console.log({pokemon})
    pokemon?.abilities?.map((ability) => 
    console.log({name: ability.name}));
    setPokemonId(pokemon.id)
    
  },[pokemon]);


  return (
    <div className="App">
      <div>
      <a href="https://github.com/LuisSosa97/Pokedex-Pwa-U1.git">github</a>
      </div>
      

      <header className="App-header">
        <div className='felx-container'>
        <img src={pokemon?.sprites?.back_default??"https://los40es00.epimg.net/los40/imagenes/2016/11/10/videojuegos/1478785321_303043_1478785538_sumario_normal.jpg"} className="poke-image"alt="logo" />
          <img src={pokemon?.sprites?.front_default??"https://los40es00.epimg.net/los40/imagenes/2016/11/10/videojuegos/1478785321_303043_1478785560_sumario_normal.jpg"} className="poke-image" alt="logo" />
        </div>
        
        <p>
          {pokemon.name ??"No pokemon Selected"}
        </p>
        <p>
          {"Id pokemon: " + pokemonId ??"No pokemon Selected"}
          
        </p>
        <div>
        <div className="containerInput">
        <label>Busqueda de pokemon ID o Nombre</label>
        <br></br>	
        <div class="input-container">
        <input value={busqueda} placeholder="Ingres Nombre de pokemon"onChange={onChange}/>
        </div>

        

        </div>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Habilidades</h2>
        <ul className='text'>
          {
            pokemon?.abilities?.map((ability) => (
              <li key={ability.ability.id}> {ability.ability.name}  </li>
            ))
          }
          </ul>
        <button className='button' onClick={closeModal}>close</button>
       
        
      </Modal>
    </div>

        <div className='flex-container'>
          
        <button className='button' disabled={botonActivo} onClick={openModal}>Habilidades</button>
        <button className='button' onClick={()=> fetchPokemon(backID())}>back</button>
        <button className='button' onClick={() => fetchPokemon(getRandomInt())}>Random</button>
        <button className='button' onClick={()=> fetchPokemon(nextID())}>Next</button>
        <button className="button"  onClick={() => fetchPokemonbyname()}>Buscar</button>
        </div>
        
      </header>
      
    </div>
  );
}

export default App;
