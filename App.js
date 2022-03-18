import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const pokemonsIniciais = [
  { id: 1, nome: "Bulbasauro"},
  { id: 4, nome: "Charmander"},
  { id: 8, nome: "Wartortle"},
  { id: 9, nome: "Blastoise"},
  { id: 12, nome: "Butterfree"},
  { id: 18, nome: "Pidgeot"},
  { id: 20, nome: "Raticate"},
  { id: 15, nome: "Beedrill"},
  { id: 3, nome: "Venusaur"},
];

export default function App() {
  const [ pokemonEscolhido, setPokemonEscolhido ] = useState(null);

  const getPokemonData = (idPokemon) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

    fetch(endpoint)
      .then(resposta => resposta.json())
        .then( json => {
          const pokemon = {
            nome: json.name,
            img: json.sprites.other["official-artwork"].front_default,
            peso: json.weight,
          };

          setPokemonEscolhido(pokemon);
        })
        .catch(() => {
          Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon');
        });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topo}>
          <Text style={styles.topoTitulo}>ESCOLHA SEU POKÉMON</Text>
        </View>

        {pokemonEscolhido != null && (
          <View style={styles.pokemonBox}>
            <Text style={styles.pokemonNome}>{pokemonEscolhido.nome}</Text>
            <Text style={styles.pokemonPeso}>Peso: {pokemonEscolhido.peso}</Text>

            <Image resizeMode="stretch" source={{uri:pokemonEscolhido.img}} style={styles.pokemonImg} />
          </View>
        )}

        {pokemonsIniciais.map( pokemon => (
          <View style={styles.cardContainer}>
            {/* <Text style={styles.cardTitle}>{pokemon.nome}</Text> */}
            <TouchableOpacity style={styles.cardTitle} title={pokemon.nome} onPress={()=>getPokemonData(pokemon.id)}><View style={styles.cardTitle}><Text>{pokemon.nome}</Text></View></TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topo: { height: 90, padding: 20, marginBottom: 18, backgroundColor: '#a769d1' },
  topoTitulo: { fontSize: 22, marginBottom: 10, color: '#fff', textAlign: 'center'},
  
  button: { borderRadius: 30,},

  cardContainer: { borderWidth: 1, borderColor: '#a769d1', borderRadius: 18, marginBottom: 10, marginHorizontal: 20, padding: 10 },
  cardTitle: { fontSize: 22, flex: 1, alignItems: 'center', color: '#a769d1' },

  pokemonBox: { alignItems: 'center', marginBottom: 45},
  pokemonNome: { fontSize: 22 },
  pokemonPeso: { fontSize: 18,  marginBottom: 45 },
  pokemonImg:{ width: 150, height: 150,  marginBottom: 18}
});