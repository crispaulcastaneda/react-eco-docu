import React from 'react';
import './App.css';
import pokemon from './pokemon.json';
import PropTypes from 'prop-types';


// Creating a component to display a list of Pokémon
// This component receives a single Pokémon object as a prop and displays its name and type
const PokemonList = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td><button
      onClick={() => onSelect(pokemon)}>Select</button></td>
  </tr>
);

// Defining prop types for the PokemonList component
// This helps in validating the props passed to the component
PokemonList.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired
}

// Creating a component to display detailed information about a selected Pokémon
const PokemonInfo = ({ name, base }) => (
  <div>

    <h2>{name.english}</h2>

    <table>
      {
        Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>

  </div >
);

// Defining prop types for the PokemonInfo component
PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    'Sp. Attack': PropTypes.number.isRequired,
    'Sp. Defense': PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
    Total: PropTypes.number.isRequired,
  }),
}


function App() {


  // Using the react hooks to manage state.
  // const [currentState, function(which sets the filter)]
  const [filter, filterSet] = React.useState('');

  // State to manage the selected Pokémon item
  // This can be used later to display more details about the selected Pokémon
  const [selectedItem, selectedItemSet] = React.useState(null);

  return (
    <div
      style={{
        margin: 'auto',
        width: 800,
        paddingTop: '1rem',
      }}
    >

      <h1 className="title">Pokemon Search</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          gridColumnGap: '1rem',
        }}
      >

        <div>

          <input
            value={filter}
            onChange={(evt) => filterSet(evt.target.value)}
          />


          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) =>
                  pokemon.name.english
                    .toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonList
                    pokemon={pokemon}
                    key={pokemon.id}
                    onSelect={(pokemon) => selectedItemSet(pokemon)}
                  />
                ))}
            </tbody>
          </table>

        </div>

        {selectedItem && <PokemonInfo {...selectedItem} />}

      </div>

    </div >
  );
}

export default App;
