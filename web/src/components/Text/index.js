import styled from 'styled-components';

export default styled.p`
  padding: 0;
  margin-bottom: 10px;
  color: #757575;
  font-size: ${({ note }) => (note ? '14px' : '16px')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;
