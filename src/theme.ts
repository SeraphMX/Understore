import { createTheme } from '@heroui/react';

export const theme = createTheme({
  colors: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
  },
  components: {
    Button: {
      defaultProps: {
        color: 'primary',
        radius: 'md',
      },
      variants: {
        solid: {
          base: 'bg-primary-600 text-white hover:bg-primary-700',
        },
        outline: {
          base: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
        },
      },
    },
    Input: {
      defaultProps: {
        radius: 'md',
      },
      variants: {
        bordered: {
          base: 'border-2 focus:border-primary-600 focus:ring-primary-600',
        },
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
      variants: {
        bordered: {
          base: 'border-2 focus:border-primary-600 focus:ring-primary-600',
        },
      },
    },
  },
});