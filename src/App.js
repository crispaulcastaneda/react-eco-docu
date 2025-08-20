import React from 'react';
import './App.css';
import pokemon from './pokemon.json';
import PropTypes from 'prop-types';


// Creating a component to display a list of Pokémon
// This component receives a single Pokémon object as a prop and displays its name and type
const PokemonList = ({ pokemon }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>
);

// Defining prop types for the PokemonList component
// This helps in validating the props passed to the component
PokemonList.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  })
}

function App() {
  return (
    <div
      style={{
        margin: '0 auto',
        width: 800,
        paddingTop: '1rem',
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.slice(0, 20).map(pokemon => (
            <PokemonList key={pokemon.id} pokemon={pokemon} />
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default App;
