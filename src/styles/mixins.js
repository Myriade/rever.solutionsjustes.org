import { css } from 'styled-components';

// Responsive breakpoints
const breakpoints = {
  small: '768px',   // Phones and small tablets
  medium: '992px',  // Tablets and small laptops
  large: '1200px',  // Desktops and larger screens
  smallMinusOne: '767px'
}

// Default styling is for small-up, then, apply exceptions : 
export const media = {
  'mediumUp' : (...args) => css`
    @media (min-width: ${breakpoints.small}) {
      ${css(...args)}
    }
  `,
  'desktopUp' : (...args) => css`
    @media (min-width: ${breakpoints.medium}) {
      ${css(...args)}
    }
  `,
  'largeUp' : (...args) => css`
    @media (min-width: ${breakpoints.large}) {
      ${css(...args)}
    }
  `,
  'onlySmall' : (...args) => css`
    @media (max-width: ${breakpoints.smallMinusOne}) {
      ${css(...args)}
    }
  `
}