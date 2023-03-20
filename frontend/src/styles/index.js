import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }

   :root {
      /* branding colors */
      --primary: #7818C2;
      --primary-light: #A043E8;
      --primary-dark: #51078A;
      --secondary: #25261F;
      --secondary-dark: #151614;

      /* other colors */
      --white: #FFF;
      --gray: #EBEBEB;
      --gray-light: #CCCCCC;
      /* --gray-light: #B9B9B9; */
      --gray-medium: #999;
      --gray-text: #787878;
      --gray-dark: #3A3A3A;
      --blue: #387BFD;
      --blue-light: #6E9FFF;
      --blue-dark: #2061e1;
      --green: #0EB934;
      --green-dark: #06731d;
      --red: #DD1D3F;
      --red-dark: #a30d28;
      --yellow: #FFC839;
      --warning: #ffa928;
      --warning-dark: #f19000;
      --black: #000;
   }

   .container {
      width: 100%;
      max-width: 968px;
      margin: auto;
      /* background: #555 */
   }

   body {
      font-family: 'Inter', sans-serif;
   }

   a {
      text-decoration: none;
   }

   ul {
      list-style: none;
   }
`;
