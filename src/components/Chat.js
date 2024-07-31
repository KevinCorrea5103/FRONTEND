import React, { useState } from 'react';
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

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  font-weight: 600;
`;

function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, { message });
      setMessages([...messages, { text: message, sender: 'user' }, { text: response.data.response, sender: 'ai' }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ChatContainer>
      <Header>
        <Title>Promptior AI Assistant</Title>
      </Header>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
}

export default Chat;
