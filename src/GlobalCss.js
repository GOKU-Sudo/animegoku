import { createGlobalStyle } from "styled-components";

const GlobalCss= createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100..900;1,100..900&display=swap');
*{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
      text-decoration: none;
      font-family: Overpass, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
body{
      background: rgb(237,241,245);
}
`;

export default GlobalCss;