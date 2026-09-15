import { Platform } from 'react-native';

const colors = {
  primary: '#0366d6',
};

export default {
  colors,
  fontSizes: {},
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {},
};
