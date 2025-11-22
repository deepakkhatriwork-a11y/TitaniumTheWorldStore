import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Aditi');
  const [language, setLanguage] = useState('hi-IN');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Available voices for AWS Polly with language support
  const voices = [
    // English Voices
    { id: 'Joanna', name: 'Joanna (Female, US English)', language: 'en-US' },
    { id: 'Matthew', name: 'Matthew (Male, US English)', language: 'en-US' },
    { id: 'Amy', name: 'Amy (Female, British English)', language: 'en-GB' },
    { id: 'Brian', name: 'Brian (Male, British English)', language: 'en-GB' },
    { id: 'Emma', name: 'Emma (Female, British English)', language: 'en-GB' },
    
    // Indian Language Voices
    { id: 'Aditi', name: 'Aditi (Female, Hindi)', language: 'hi-IN' },
    { id: 'Raveena', name: 'Raveena (Female, Hindi)', language: 'hi-IN' },
    { id: 'Kajal', name: 'Kajal (Female, Hindi)', language: 'hi-IN' },
    { id: 'Aparna', name: 'Aparna (Female, Hindi)', language: 'hi-IN' },
    { id: 'Arjun', name: 'Arjun (Male, Hindi)', language: 'hi-IN' },
    
    // Other International Voices
    { id: 'Hans', name: 'Hans (Male, Mandarin Chinese)', language: 'cmn-CN' },
    { id: 'Mizuki', name: 'Mizuki (Female, Japanese)', language: 'ja-JP' },
    { id: 'Seoyeon', name: 'Seoyeon (Female, Korean)', language: 'ko-KR' }
  ];

  const handleSpeak = async () => {
    if (!text.trim()) {
      setError('Please enter some text to convert to speech');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if AWS credentials are available
      if (!process.env.REACT_APP_AWS_ACCESS_KEY_ID || !process.env.REACT_APP_AWS_SECRET_ACCESS_KEY) {
        throw new Error('AWS credentials not found. Please configure your environment variables.');
      }

      // Dynamically import AWS SDK to avoid issues with server-side rendering
      const AWS = (await import('aws-sdk')).default;
      
      // Configure AWS
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_AWS_REGION || 'us-east-1'
      });

      const polly = new AWS.Polly({ apiVersion: '2016-06-10' });

      // Determine language from selected voice
      const selectedVoice = voices.find(v => v.id === voice);
      const textLanguage = selectedVoice ? selectedVoice.language : 'hi-IN';

      const params = {
        OutputFormat: 'mp3',
        Text: text,
        VoiceId: voice,
        Engine: 'standard',
        LanguageCode: textLanguage
      };

      const data = await polly.synthesizeSpeech(params).promise();
      
      // Handle the audio stream correctly for browser environment
      if (data.AudioStream) {
        // Create a Blob from the audio stream
        const blob = new Blob([data.AudioStream], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        
        // Create and play audio
        const audio = new Audio(url);
        
        // Handle playback
        audio.play().catch(e => {
          console.error('Error playing audio:', e);
          setError('Failed to play audio. Please check browser permissions.');
        });
      }
    } catch (err) {
      console.error('Error synthesizing speech:', err);
      setError(`Failed to synthesize speech: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter voices by selected language
  const filteredVoices = voices.filter(v => v.language.startsWith(language.split('-')[0]));

  return (
    <div className="text-to-speech-container">
      <h2>Text to Speech Converter</h2>
      <p>Convert your text to speech using AWS Polly</p>
      
      <div className="input-section">
        <textarea
          placeholder="Enter text to convert to speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          cols={50}
        />
      </div>
      
      <div className="controls">
        <div className="language-selector">
          <label htmlFor="language-select">Select Language:</label>
          <select 
            id="language-select"
            value={language} 
            onChange={(e) => {
              setLanguage(e.target.value);
              // Set default voice for selected language
              const defaultVoice = voices.find(v => v.language === e.target.value);
              if (defaultVoice) {
                setVoice(defaultVoice.id);
              }
            }}
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="hi-IN">Hindi (India)</option>
            <option value="ja-JP">Japanese</option>
            <option value="ko-KR">Korean</option>
            <option value="cmn-CN">Chinese (Mandarin)</option>
          </select>
        </div>
        
        <div className="voice-selector">
          <label htmlFor="voice-select">Select Voice:</label>
          <select 
            id="voice-select"
            value={voice} 
            onChange={(e) => setVoice(e.target.value)}
          >
            {filteredVoices.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={handleSpeak} 
          disabled={isLoading}
          className="speak-button"
        >
          {isLoading ? 'Converting...' : 'Convert to Speech'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          <li>Enter your text in the text area above</li>
          <li>Select a language and voice from the dropdowns</li>
          <li>Click "Convert to Speech" to hear the audio</li>
          <li>Note: AWS credentials must be configured for this to work</li>
        </ul>
      </div>
    </div>
  );
};

export default TextToSpeech;