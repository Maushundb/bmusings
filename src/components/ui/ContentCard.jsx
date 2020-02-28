import styled from 'styled-components';

import { rhythm } from '../../utils/typography';

import { COLORS } from '../../constants';

const ContentCard = styled.div`
  background-color: ${COLORS.WHITE};
  border-radius: 6px;
  padding: ${rhythm(3 / 4)};
  margin-bottom: ${rhythm(1)};
`;

export default ContentCard;
