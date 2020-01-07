import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FaHome, FaBolt, FaRegUser } from 'react-icons/fa';
import Newsletter from '../components/newsletter';

import { rhythm } from '../utils/typography';
import { COLORS } from '../constants';

const Background = styled.div`
  background-color: #011627;
  position: fixed;
  width: 100%;
  height: 60%;
`;

const Header = styled.div`
  margin: 0px auto ${rhythm(1)} auto;
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

// SVG + Link positioning is weird
const HomeIcon = styled(FaHome)`
  margin-right: 4px;
  position: relative;
  top: -1px;
`;

const CoachingIcon = styled(FaBolt)`
  margin-right: 4px;
`;

const AboutIcon = styled(FaRegUser)`
  margin-right: 4px;
  position: relative;
  top: -2px;
`;

/**
 * Root component for the site, lays out either the home page or blog post
 */
const Layout = ({ location, title, children }) => (
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
        <HeaderLink to={`/`}>
          <LinkContent>
            <HomeIcon />
            <span>Home</span>
          </LinkContent>
        </HeaderLink>
        <HeaderLink>
          <LinkContent>
            <CoachingIcon size={'.85em'} />
            <span>Coaching</span>
          </LinkContent>
        </HeaderLink>
        <HeaderLink>
          <LinkContent>
            <AboutIcon size={'.85em'} />
            <span>About</span>
          </LinkContent>
        </HeaderLink>
      </RightContainer>
    </Header>
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        position: 'relative',
        backgroundColor: COLORS.WHITE,
        borderRadius: '6px',
      }}
    >
      <main>{children}</main>
      <footer>
        <Newsletter />
      </footer>
    </div>
  </div>
);

export default Layout;
