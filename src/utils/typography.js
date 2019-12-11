import './global.css';
import Typography from 'typography';
import Wordpress2016 from 'typography-theme-wordpress-2016';

import { COLORS } from '../constants';

Wordpress2016.headerColor = COLORS.BLACK;
Wordpress2016.bodyColor = COLORS.BLACK;
Wordpress2016.headerFontFamily = ['Raleway'];
Wordpress2016.bodyFontFamily = ['Merriweather'];
Wordpress2016.googleFonts = [
  {
    name: 'Raleway',
    styles: ['400', '700', '700i'],
  },
  {
    name: 'Merriweather',
    styles: ['400', '700', '700i'],
  },
];
Wordpress2016.overrideThemeStyles = () => {
  return {
    h1: {
      fontFamily: 'Raleway',
      fontWeight: 1000,
    },
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      color: COLORS.BLUE,
    },
  };
};

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
