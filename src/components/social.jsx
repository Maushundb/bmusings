import * as React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  RedditShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share';

import styled from 'styled-components';

const SHARE_BUTTONS = [
  [TwitterShareButton, TwitterIcon],
  [FacebookShareButton, FacebookIcon],
  [RedditShareButton, RedditIcon],
  [LinkedinShareButton, LinkedinIcon],
  [EmailShareButton, EmailIcon],
];

const BUTTON_SIZE_PX = 42;

const Root = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 24px;
  justify-content: space-between;

  @media only screen and (min-width: 768px) {
    flex-direction: column;
    position: fixed;
    left: 0px;
  }
`;

const ShareButton = styled.div`
  cursor: pointer;
  :hover:not(:active) {
    opacity: 0.75;
  }
`;

const Social = ({ shareUrl }) => (
  <Root>
    {SHARE_BUTTONS.map(([Button, Icon], i) => (
      <ShareButton key={i}>
        <Button url={shareUrl}>
          <Icon size={BUTTON_SIZE_PX} />
        </Button>
      </ShareButton>
    ))}
  </Root>
);

export default Social;
