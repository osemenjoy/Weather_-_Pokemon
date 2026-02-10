import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);
    setWeather(null);
    setPokemon(null);

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aa1744ef3d612bdfdd3ffe8727ed49f4`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      const weatherData = await weatherResponse.json();

      setWeather({
        city: weatherData.name,
        temp: weatherData.main.temp,
        description: weatherData.weather[0].description,
      });

      const randomId = Math.floor(Math.random() * 151) + 1;
      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );

      const pokemonData = await pokemonResponse.json();

      setPokemon({
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🌦️ Pokémon Weather Explorer</h1>
        <p style={styles.subtitle}>
          Check the weather and discover a Pokémon that matches the vibe.
        </p>

        {/* Input Section */}
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter city (e.g. Lagos)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
          />
          <button onClick={fetchData} style={styles.button}>
            Check Weather
          </button>
        </div>

        {loading && <p style={styles.info}>Loading data...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {/* Results */}
        {weather && pokemon && (
          <div style={styles.cards}>
            {/* Weather Card */}
            <div style={styles.card}>
              <h2>🌍 {weather.city}</h2>
              <p style={styles.temp}>{weather.temp}°C</p>
              <p style={styles.text}>{weather.description}</p>
            </div>

            {/* Pokémon Card */}
            <div style={styles.card}>
              <h2>🎮 Pokémon</h2>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={styles.image}
              />
              <p style={styles.text}>{pokemon.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  container: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "30px",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
  },
  subtitle: {
    color: "#555",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
  info: {
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "10px",
  },
  temp: {
    fontSize: "32px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  text: {
    textTransform: "capitalize",
  },
  image: {
    width: "120px",
    height: "120px",
  },
};

export default App;
