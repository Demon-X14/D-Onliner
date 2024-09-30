   // src/@types/asciiart-logo.d.ts
   declare module 'asciiart-logo' {
    interface LogoOptions {
      name?: string;
      font?: string;
      lineChars?: number;
      padding?: number;
      margin?: number;
      borderColor?: string;
      logoColor?: string;
      textColor?: string;
    }

    function logo(options?: LogoOptions): {
      render: () => string;
    };

    export default logo;
  }