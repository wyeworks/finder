import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gridTemplateRows: {
        'register-form': '70px 70px 70px 70px 100px',
        'login-form': '70px 70px 70px 80px',
        'personal-info-form': '70px 70px auto',
        'change-password-form': '70px 70px 70px 80px',
      },
      backgroundColor: {
        primaryBlue: {
          DEFAULT: '#242760',
          100: '#7479db',
          200: '#3D405B',
          300: '#373C6C',
        },
        darkBlue: '#2B2D54',
        hoverPrimaryBlue: '#075985',
        whiteCustom: '#FAFAFA',
        backgroundInput: '#fcfcfc',
        error: '#DC3545',
      },
      textColor: {
        blackTextColor: '#212B36',
        whiteTextHeader: '#FAFAFA',
        iconTextHeader: '#A0A0A0',
        inputTextColor: '#a0a0a0',
        grayText: '#71717A',
        primaryBlue: { DEFAULT: '#242760', 100: '#7479db' },
        darkBlue: '#2B2D54',
        lightBlue: { DEFAULT: '#3EC1F3', 100: '#6FD7FF' },
        leaveRed: '#DC3545',
      },
      accentColor: {
        primaryBlue: { DEFAULT: '#242760', 100: '#7479db' },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
export default config;
