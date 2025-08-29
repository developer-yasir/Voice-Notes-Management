import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechTest = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">Speech Recognition Test</h2>
          <div className="alert alert-error">
            Browser doesn't support speech recognition. Please try Chrome, Edge, or Safari.
          </div>
        </div>
      </div>
    );
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Speech Recognition Test</h2>
        
        {isMicrophoneAvailable === false && (
          <div className="alert alert-error">
            Microphone access is required. Please allow microphone access in your browser settings.
          </div>
        )}
        
        <div className="voice-recorder-container">
          <textarea
            value={transcript}
            placeholder="Speech will appear here..."
            className="voice-recorder-textarea"
            readOnly
          />
          
          <div className="voice-recorder-controls">
            <button
              type="button"
              onClick={startListening}
              disabled={listening}
              className="voice-recorder-button voice-recorder-button-primary"
            >
              {listening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <button
              type="button"
              onClick={SpeechRecognition.stopListening}
              className="voice-recorder-button voice-recorder-button-secondary"
            >
              Stop Listening
            </button>
            <button
              type="button"
              onClick={resetTranscript}
              className="voice-recorder-button voice-recorder-button-danger"
            >
              Clear
            </button>
          </div>
          
          <div className="mt-4">
            <p><strong>Status:</strong> {listening ? 'Listening...' : 'Not listening'}</p>
            <p><strong>Microphone Available:</strong> {isMicrophoneAvailable ? 'Yes' : 'No'}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <h3>Troubleshooting Tips:</h3>
          <ul className="mt-2 text-sm text-gray-600">
            <li>• Use Chrome, Edge, or Safari for best results</li>
            <li>• Ensure your microphone is working</li>
            <li>• Allow microphone access when prompted</li>
            <li>• Speak clearly in a quiet environment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpeechTest;