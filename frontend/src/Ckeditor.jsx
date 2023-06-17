import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const Chatbot = ({ transcript, resetTranscript, startListening, stopListening }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: message,
        max_tokens: 50,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY',
        },
      });

      const reply = response.data.choices[0].text.trim();
      setMessages((prevMessages) => [...prevMessages, { text: message, fromUser: true }, { text: reply, fromUser: false }]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpeechRecognition = () => {
    if (transcript) {
      sendMessage(transcript);
      resetTranscript();
    }
  };

  const handleTextMessage = (event) => {
    if (event.key === 'Enter') {
      sendMessage(event.target.value);
      event.target.value = '';
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.fromUser ? 'from-user' : 'from-bot'}`}>
            {message.text}
          </div>
        ))}
      </div>

      <div className="chatbot-input">
        <input type="text" onKeyDown={handleTextMessage} placeholder="Type a message" />

        <button onClick={handleSpeechRecognition}>Speak</button>
      </div>
    </div>
  );
};

const options = {
  autoStart: false,
};

export default Chatbot;
