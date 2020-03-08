import React from 'react';
import styled from 'styled-components';

import Header from './header';

import { rhythm } from '../utils/typography';

const Background = styled.div`
  background-color: #011627;
  position: fixed;
  width: 100%;
  height: 60vh;
  min-height: 512px;
`;

const ContentContainer = styled.div`
  margin: 0px auto;
  max-width: ${rhythm(24)};
  position: relative;
`;

/**
 * Root component for the site, lays out either the home page or blog post
 */
const Layout = ({ title, children }) => (
  <div>
    <Background />
    <Header title={title} />
    <ContentContainer>
      <main>{children}</main>
      <footer></footer>
    </ContentContainer>
  </div>
);

export default Layout;
