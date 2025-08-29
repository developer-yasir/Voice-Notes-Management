import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceRecorder = ({ onTranscriptChange, content }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  // Handle browser support
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <strong>Browser not supported:</strong> Your browser doesn't support speech recognition. Please try Chrome, Edge, or Safari.
        </div>
      </div>
    );
  }

  // Handle microphone access
  if (isMicrophoneAvailable === false) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <strong>Microphone access required:</strong> Please allow microphone access in your browser settings to use voice recording.
        </div>
      </div>
    );
  }

  React.useEffect(() => {
    if (transcript) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    }
  };

  const handleClear = () => {
    resetTranscript();
    onTranscriptChange('');
  };

  return (
    <div className="voice-recorder-container">
      <div className="voice-recorder-controls">
        <button
          type="button"
          onClick={toggleListening}
          className={`voice-recorder-button ${
            listening 
              ? 'voice-recorder-button-danger' 
              : 'voice-recorder-button-primary'
          }`}
        >
          {listening ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              Stop Recording
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Start Recording
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="voice-recorder-button voice-recorder-button-secondary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear
        </button>
      </div>
      
      {listening && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center">
            <div className="listening-indicator-large"></div>
            <div className="ml-3">
              <h4 className="text-red-800 font-medium">Recording in progress</h4>
              <p className="text-red-600 text-sm">Speak now, your words will appear below</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4">
        <label className="modal-form-label">
          Note Content
        </label>
        <textarea
          value={content}
          onChange={(e) => onTranscriptChange(e.target.value)}
          placeholder="Your voice note will appear here as you speak. You can also type directly here."
          className="voice-recorder-textarea"
        />
      </div>
    </div>
  );
};

export default VoiceRecorder;