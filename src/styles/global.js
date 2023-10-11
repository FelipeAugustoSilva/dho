import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    font-family: system-ui, -apple-system, Helvetica, Arial, sans-serif;
  }
  
  body {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    background-color: #FFF;
    overflow-x: hidden;
  }

`;

export default Global;