// src/components/ContextInput.js
import React from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

function ContextInput({ context, setContext }) {
  return (
    <StyledTextArea
      value={context}
      onChange={(e) => setContext(e.target.value)}
      placeholder="Enter context here..."
      rows={3}
    />
  );
}

export default ContextInput;