
// src/components/MessageList.js
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const MessageListContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  margin-bottom: 15px;
  border-radius: 18px;
  font-size: 16px;
  line-height: 1.4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  ${props => props.sender === 'user' ? `
    align-self: flex-end;
    background-color: #007bff;
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background-color: #f1f0f0;
    color: #333;
    border-bottom-left-radius: 4px;
  `}
`;

const MessageTime = styled.span`
  font-size: 12px;
  color: ${props => props.sender === 'user' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
  display: block;
  margin-top: 5px;
`;

function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <MessageListContainer>
      {messages.map((message, index) => (
        <MessageBubble key={index} sender={message.sender}>
          {message.text}
          <MessageTime sender={message.sender}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </MessageTime>
        </MessageBubble>
      ))}
      <div ref={messagesEndRef} />
    </MessageListContainer>
  );
}

export default MessageList;
