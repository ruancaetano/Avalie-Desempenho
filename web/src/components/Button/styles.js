import styled from 'styled-components';

export const StyledButton = styled.button`
  width: 140px;
  height: 40px;
  padding: 8px 20px;
  text-align: center;
  border-radius: 40px;
  color: #fff;
  background: ${({ danger, light }) => {
    if (danger) return '#d44d57';
    if (light) return '#afafad';
    return '#5ccbc7';
  }};
  cursor: pointer;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;

  :hover {
    background: ${({ danger, light }) => {
      if (danger) return '#e60014';
      if (light) return '#848484';
      return '#207775';
    }};
    transform: translateY(-7px);
  }
`;
