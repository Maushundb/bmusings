import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FaHome, FaBolt, FaRegUser } from 'react-icons/fa';

import { rhythm } from '../utils/typography';
import { COLORS } from '../constants';

const Background = styled.div`
  background-color: #011627;
  position: fixed;
  width: 100%;
  height: 60vh;
  min-height: 512px;
`;

const Header = styled.div`
  margin: 0px auto ${rhythm(0.5)} auto;
  padding: 16px ${rhythm(1.5)};
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  display: flex;
`;

const Logo = styled.h3`
  margin: 0px;
`;

const HeaderLink = styled(Link)`
  color: ${COLORS.WHITE};
  box-shadow: none;
  font-family: Raleway;
  position: relative;
  margin-left: 38px;

  :hover {
    opacity: 0.75;
  }
`;

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const LinkText = styled.span`
  margin-left: 4px;
`;

// SVG + Link positioning is weird
const HomeIcon = styled(FaHome)`
  position: relative;
  top: -1px;
`;

const CoachingIcon = styled(FaBolt)``;

const AboutIcon = styled(FaRegUser)`
  position: relative;
  top: -2px;
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
    <Header>
      <LeftContainer>
        <Logo>
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: COLORS.WHITE,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </Logo>
      </LeftContainer>
      <RightContainer>
        <HeaderLink to={'/'}>
          <LinkContent>
            <HomeIcon />
            <LinkText>Home</LinkText>
          </LinkContent>
        </HeaderLink>
        <HeaderLink to={'/coaching'}>
          <LinkContent>
            <CoachingIcon size={'.85em'} />
            <LinkText>Coaching</LinkText>
          </LinkContent>
        </HeaderLink>
        {/* <HeaderLink to={'/about'}>
          <LinkContent>
            <AboutIcon size={'.85em'} />
            <LinkText>About</LinkText>
          </LinkContent>
        </HeaderLink> */}
      </RightContainer>
    </Header>
    <ContentContainer>
      <main>{children}</main>
      <footer></footer>
    </ContentContainer>
  </div>
);

export default Layout;
