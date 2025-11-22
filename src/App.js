import './App.css';
import TextToSpeech from './components/TextToSpeech';
import './components/TextToSpeech.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AWS Polly Text-to-Speech</h1>
        <TextToSpeech />
      </header>
    </div>
  );
}

export default App;