import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px 0;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ error }) => (error ? '#d44d57' : '#5ccbc7')};
  margin-bottom: 5px;
`;

export const Error = styled.small`
  display: block;
  color: #d44d57;
  margin-top: 5px;
`;

export const StyledInput = styled.input`
  border: 1px solid ${({ error }) => (error ? '#f8d7da' : '#5ccbc7')};
  padding-left: 10px;
  font-size: 14px;
  border-radius: 10px;
  height: 35px;
  color: #757575;
  width: 100%;
`;
