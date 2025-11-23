import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Aditi'); // Changed default from 'Arjun' to 'Aditi' since Arjun is not a valid voice
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [speechRate, setSpeechRate] = useState(1); // New state for speech rate control

  // Available voices for AWS Polly with language support
  const voices = [
    // English Voices
    { id: 'Joanna', name: 'Joanna (Female, US English)', language: 'en-US', engine: 'standard' },
    { id: 'Matthew', name: 'Matthew (Male, US English)', language: 'en-US', engine: 'standard' },
    { id: 'Amy', name: 'Amy (Female, British English)', language: 'en-GB', engine: 'standard' },
    { id: 'Brian', name: 'Brian (Male, British English)', language: 'en-GB', engine: 'standard' },
    { id: 'Emma', name: 'Emma (Female, British English)', language: 'en-GB', engine: 'standard' },
    
    // Indian Language Voices
    { id: 'Aditi', name: 'Aditi (Female, Hindi)', language: 'hi-IN', engine: 'standard' },
    { id: 'Raveena', name: 'Raveena (Female, Hindi)', language: 'hi-IN', engine: 'standard' },
    { id: 'Kajal', name: 'Kajal (Female, Hindi)', language: 'hi-IN', engine: 'neural' },
    
    // Other International Voices
    { id: 'Hans', name: 'Hans (Male, Mandarin Chinese)', language: 'cmn-CN', engine: 'standard' },
    { id: 'Mizuki', name: 'Mizuki (Female, Japanese)', language: 'ja-JP', engine: 'standard' },
    { id: 'Seoyeon', name: 'Seoyeon (Female, Korean)', language: 'ko-KR', engine: 'standard' }
  ];

  const handleSpeak = async () => {
    if (!text.trim()) {
      setError('Please enter some text to convert to speech');
      return;
    }

    // Check text length limits based on engine
    const selectedVoice = voices.find(v => v.id === voice);
    const engine = selectedVoice?.engine || 'standard';
    const maxLength = engine === 'neural' ? 1500 : 3000;
    
    // When using SSML, we need to account for the wrapper tags
    const ssmlWrapperLength = 60; // Approximate length of SSML tags
    if (text.length > (maxLength - ssmlWrapperLength)) {
      setError(`Text exceeds maximum length of ${maxLength} characters for ${engine} engine. Current length: ${text.length} characters. Please reduce the text length.`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if AWS credentials are available
      if (!process.env.REACT_APP_AWS_ACCESS_KEY_ID || !process.env.REACT_APP_AWS_SECRET_ACCESS_KEY) {
        throw new Error('AWS credentials not found. Please configure your environment variables.');
      }

      // Log credentials availability for debugging (without exposing actual values)
      console.log('AWS Credentials Status:', {
        hasAccessKeyId: !!process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        hasSecretAccessKey: !!process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_AWS_REGION || 'us-east-1'
      });

      // Dynamically import AWS SDK to avoid issues with server-side rendering
      const AWS = (await import('aws-sdk')).default;
      
      // Configure AWS
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_AWS_REGION || 'us-east-1'
      });

      const polly = new AWS.Polly({ apiVersion: '2016-06-10' });

      // Validate that the selected voice exists
      if (!selectedVoice) {
        throw new Error(`Selected voice "${voice}" is not available. Please select a different voice.`);
      }

      // Create SSML with speech rate control
      const ssmlText = `<speak><prosody rate="${speechRate}">${text}</prosody></speak>`;

      const params = {
        OutputFormat: 'mp3',
        Text: ssmlText,
        TextType: 'ssml',
        VoiceId: voice,
        Engine: selectedVoice.engine || 'standard'
      };

      console.log('Polly Synthesize Request:', params);

      const data = await polly.synthesizeSpeech(params).promise();
      
      console.log('Polly Response:', !!data, data ? Object.keys(data) : 'No data');
      
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
      } else {
        setError('No audio stream received from AWS Polly. Please check your configuration.');
        console.error('No AudioStream in response:', data);
      }
    } catch (err) {
      console.error('Error synthesizing speech:', err);
      setError(`Failed to synthesize speech: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-to-speech-container">
      <h2>Titanium Translator</h2>
      <p className="note">Note: This tool converts text to speech. Select a voice from the dropdown.</p>
      
      <div className="input-section">
        <textarea
          placeholder="Enter text to convert to speech..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          cols={50}
        />
        <div className="character-count">
          Characters: {text.length} / {
            (() => {
              const selectedVoice = voices.find(v => v.id === voice);
              const engine = selectedVoice?.engine || 'standard';
              return engine === 'neural' ? '1500' : '3000';
            })()
          }
        </div>
      </div>
      
      <div className="controls">
        <div className="voice-selector">
          <label htmlFor="voice-select">Select Voice:</label>
          <select 
            id="voice-select"
            value={voice} 
            onChange={(e) => setVoice(e.target.value)}
          >
            {voices.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="rate-control">
          <label htmlFor="rate-control">Speech Rate:</label>
          <input
            id="rate-control"
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
          />
          <span className="rate-value">{speechRate}x</span>
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
          <li>Select a voice from the dropdown</li>
          <li>Adjust speech rate using the slider (0.5x = slower, 1x = normal, 1.5x = faster)</li>
          <li>Click "Convert to Speech" to hear the audio</li>
          <li>Note: AWS credentials must be configured for this to work</li>
        </ul>
      </div>
    </div>
  );
};

export default TextToSpeech;