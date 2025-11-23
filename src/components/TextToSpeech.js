import React, { useState, useRef } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Aditi'); // Changed default from 'Arjun' to 'Aditi' since Arjun is not a valid voice
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [speechRate, setSpeechRate] = useState(1); // New state for speech rate control
  const [audioBlob, setAudioBlob] = useState(null); // New state to store audio blob for download
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is currently playing
  const [isPaused, setIsPaused] = useState(false); // Track if audio is paused
  const [playbackPosition, setPlaybackPosition] = useState(0); // Track playback position
  
  // Refs for audio control
  const audioRef = useRef(null);
  const abortControllerRef = useRef(null);

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

  // Function to split text into chunks that comply with AWS Polly limits
  const splitTextIntoChunks = (text, maxLength = 2500) => {
    // Simple sentence-based splitting to avoid cutting words
    const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];
    const chunks = [];
    let currentChunk = '';
    
    for (const sentence of sentences) {
      // If adding this sentence would exceed the limit, save current chunk and start new one
      if ((currentChunk + sentence).length > maxLength && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += sentence;
      }
    }
    
    // Add the last chunk if it has content
    if (currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
    }
    
    // If no sentences were found (e.g., no punctuation), split by word
    if (chunks.length === 0) {
      const words = text.split(' ');
      currentChunk = '';
      
      for (const word of words) {
        if ((currentChunk + word + ' ').length > maxLength && currentChunk.length > 0) {
          chunks.push(currentChunk.trim());
          currentChunk = word + ' ';
        } else {
          currentChunk += word + ' ';
        }
      }
      
      if (currentChunk.trim().length > 0) {
        chunks.push(currentChunk.trim());
      }
    }
    
    return chunks;
  };

  const handleSpeak = async () => {
    if (!text.trim()) {
      setError('Please enter some text to convert to speech');
      return;
    }

    // If we're resuming playback, just resume the existing audio
    if (isPaused && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error('Error resuming audio:', e);
        setError('Failed to resume audio. Please check browser permissions.');
      });
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Check text length limits based on engine
    const selectedVoice = voices.find(v => v.id === voice);
    const engine = selectedVoice?.engine || 'standard';
    
    // AWS Polly limits for SynthesizeSpeech API
    const maxTotalLength = 6000; // Total characters including SSML
    const maxBilledLength = 3000; // Billed characters (excluding SSML)
    
    // For long texts, we'll split into chunks
    let textChunks = [];
    if (text.length > maxBilledLength) {
      // Split text into manageable chunks
      textChunks = splitTextIntoChunks(text, maxBilledLength - 100); // Leave some buffer for SSML
      console.log(`Splitting text into ${textChunks.length} chunks`);
    } else {
      // Single chunk for shorter texts
      textChunks = [text];
    }

    setIsLoading(true);
    setError('');
    
    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();
    
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

      // Validate that the selected voice exists
      if (!selectedVoice) {
        throw new Error(`Selected voice "${voice}" is not available. Please select a different voice.`);
      }

      // Array to hold all audio blobs
      const audioBlobs = [];

      // Process each chunk
      for (let i = 0; i < textChunks.length; i++) {
        // Check if operation was cancelled
        if (abortControllerRef.current.signal.aborted) {
          throw new Error('Operation cancelled by user');
        }
        
        const chunk = textChunks[i];
        console.log(`Processing chunk ${i + 1}/${textChunks.length}: ${chunk.substring(0, 50)}...`);

        // Create SSML with speech rate control
        const ssmlText = `<speak><prosody rate="${speechRate}">${chunk}</prosody></speak>`;

        const params = {
          OutputFormat: 'mp3',
          Text: ssmlText,
          TextType: 'ssml',
          VoiceId: voice,
          Engine: selectedVoice.engine || 'standard'
        };

        const data = await polly.synthesizeSpeech(params).promise();
        
        // Check if operation was cancelled after the async operation
        if (abortControllerRef.current.signal.aborted) {
          throw new Error('Operation cancelled by user');
        }
        
        // Handle the audio stream correctly for browser environment
        if (data.AudioStream) {
          // Create a Blob from the audio stream
          const blob = new Blob([data.AudioStream], { type: 'audio/mp3' });
          audioBlobs.push(blob);
        } else {
          throw new Error(`No audio stream received for chunk ${i + 1}. Please check your configuration.`);
        }
      }

      // Combine all audio blobs into one
      if (audioBlobs.length > 0) {
        const combinedBlob = new Blob(audioBlobs, { type: 'audio/mp3' });
        setAudioBlob(combinedBlob);
        
        // Create and play audio
        const url = URL.createObjectURL(combinedBlob);
        const audio = new Audio(url);
        audioRef.current = audio;
        
        // Set playback position if we're resuming
        if (playbackPosition > 0) {
          audio.currentTime = playbackPosition;
        }
        
        // Handle playback events
        audio.onplay = () => {
          setIsPlaying(true);
          setIsPaused(false);
        };
        
        audio.onpause = () => {
          setPlaybackPosition(audio.currentTime);
          setIsPlaying(false);
          setIsPaused(true);
        };
        
        audio.onended = () => {
          setPlaybackPosition(0);
          setIsPlaying(false);
          setIsPaused(false);
        };
        
        // Handle playback
        audio.play().catch(e => {
          console.error('Error playing audio:', e);
          setError('Failed to play audio. Please check browser permissions.');
        });
      } else {
        setError('No audio was generated. Please try again.');
      }
    } catch (err) {
      if (err.name === 'AbortError' || err.message === 'Operation cancelled by user') {
        console.log('Text-to-speech operation was cancelled by user');
        setError('Operation cancelled by user');
      } else {
        console.error('Error synthesizing speech:', err);
        setError(`Failed to synthesize speech: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // Function to stop/pause audio playback
  const handleStop = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setPlaybackPosition(currentTime);
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
    
    // Cancel ongoing synthesis if in progress
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    setIsLoading(false);
    setError('Playback paused by user');
  };

  // Function to reset the form
  const handleReset = () => {
    // Stop any ongoing playback
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Cancel any ongoing synthesis
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    // Reset all state
    setText('');
    setVoice('Aditi');
    setSpeechRate(1);
    setAudioBlob(null);
    setIsLoading(false);
    setError('');
    setIsPlaying(false);
    setIsPaused(false);
    setPlaybackPosition(0);
  };

  // Function to download the MP3 file
  const handleDownload = () => {
    if (!audioBlob) {
      setError('No audio available for download. Please convert text to speech first.');
      return;
    }

    // Create download link
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'titanium-translator-audio.mp3'; // Default filename
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
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
          Characters: {text.length} / 10000
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
        
        <div className="button-group">
          {!isPaused ? (
            <button 
              onClick={handleSpeak} 
              disabled={isLoading}
              className="speak-button"
            >
              {isLoading ? 'Converting...' : 'Convert to Speech'}
            </button>
          ) : (
            <button 
              onClick={handleSpeak} 
              className="speak-button"
            >
              Start
            </button>
          )}
          
          <button 
            onClick={handleStop} 
            disabled={!isLoading && !audioBlob}
            className="pause-button"
          >
            Pause
          </button>
          
          <button 
            onClick={handleReset} 
            className="reset-button"
          >
            Reset
          </button>
          
          <button 
            onClick={handleDownload} 
            disabled={!audioBlob}
            className="download-button"
          >
            Download MP3
          </button>
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          <li>Enter your text in the text area above</li>
          <li>Select a voice from the dropdown</li>
          <li>Adjust speech rate using the slider (0.5x = slower, 1x = normal, 1.5x = faster)</li>
          <li>Click "Convert to Speech" to hear the audio</li>
          <li>Click "Pause" to pause playback and "Start" to resume</li>
          <li>Click "Reset" to clear all fields and start over</li>
          <li>Click "Download MP3" to save the audio file</li>
          <li>Note: AWS credentials must be configured for this to work</li>
          <li>Long texts will be automatically split into segments for processing</li>
        </ul>
      </div>
    </div>
  );
};

export default TextToSpeech;