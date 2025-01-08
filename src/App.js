import logo from './logo.svg';
import './App.css';
import YouTubeVideo from './YoutubeVideo';

function App() {
  const handleButtonClick = () => {
    const userInput = prompt("Escriu el teu nom: ");
    alert("Has escrit: " + userInput);
    console.log("Hola " + userInput);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleButtonClick}>Proba el Prompt</button>
        <YouTubeVideo />
      </header>
    </div>
  );
}

export default App;
