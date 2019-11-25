import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  button:focus, input:focus, textarea:focus, select:focus{
    outline: none;
  }
`;

export default GlobalStyle;
