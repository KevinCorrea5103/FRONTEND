import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import axios from 'axios';

const ChatContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 90vh;
  margin: 20px auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  font-weight: 600;
`;

function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMessage = useCallback(async (message) => {
    setIsLoading(true);
    setError(null);
    setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat`, 
        { message },
        { timeout: 60000 }  // Aumentado a 60 segundos
      );
      
      console.log("Respuesta recibida:", response.data.response);
      
      setMessages(prevMessages => [
        ...prevMessages,
        { text: response.data.response, sender: 'ai' }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.');
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "Lo siento, hubo un error al procesar tu mensaje.", sender: 'ai' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ChatContainer>
      <Header>
        <Title>Promptior AI Assistant</Title>
      </Header>
      <MessageList messages={messages} />
      {isLoading && <DetailedLoadingIndicator />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <MessageInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </ChatContainer>
  );
}

function DetailedLoadingIndicator() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <div>Procesando tu mensaje{dots}</div>;
}
export default Chat;