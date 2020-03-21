import styled from 'styled-components';
import THEME from 'constants/theme';

const Text = styled.div`
  font-family: 'Raleway';
  font-size: ${props => THEME.fontSizes[props.size]};
  font-weight: ${({ fontWeight }) => (fontWeight ? THEME.fontWeights[fontWeight] : 'inherit')};
`;

export default Text;
