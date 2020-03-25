import React, { useState, useCallback } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FaHome, FaBolt, FaRegUser } from 'react-icons/fa';
import { FiMenu, FiX, FiBookOpen } from 'react-icons/fi';
import useMediaQuery from '../lib/useMediaQuery';

import { rhythm } from '../utils/typography';

import { COLORS } from '../constants';
import Flex from 'styled-flex-component';

const Root = styled.div`
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

const HamburgerLink = styled(HeaderLink)`
  margin: 0px ${rhythm(5)};
`;

const HamburgerLinkText = styled.h2`
  color: ${COLORS.BLUE};
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
  margin-right: 2px;
`;

const CoachingIcon = styled(FaBolt)``;
const BlogIcon = styled(FiBookOpen)`
  margin-right: 4px;
`;

const AboutIcon = styled(FaRegUser)`
  position: relative;
  top: -2px;
  margin-right: 2px;
`;

const HamburgerMenuRoot = styled(Flex)`
  background-color: ${COLORS.WHITE};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 1;
`;

const CloseIcon = styled(FiX)`
  justify-self: flex-end;
  margin-left: auto;
  margin-right: ${rhythm(1.5)};
  margin-top: ${rhythm(0.5)};
`;

const Header = ({ title }) => {
  const isTabletOrMobile = useMediaQuery('(max-width: 528px)');
  const [isHamburgerMenuExpanded, setHamburgerMenuExpanded] = useState(false);

  const toggleHamburgerMenuExpanded = useCallback(
    () => setHamburgerMenuExpanded(!isHamburgerMenuExpanded),
    [isHamburgerMenuExpanded],
  );

  const rightContent = isTabletOrMobile ? (
    <>
      <FiMenu color={COLORS.WHITE} size={'22px'} onClick={toggleHamburgerMenuExpanded} />
      {isHamburgerMenuExpanded && (
        <HamburgerMenuRoot column alignCenter>
          <CloseIcon
            color={COLORS.BLUE}
            size="24px"
            onClick={toggleHamburgerMenuExpanded}
          ></CloseIcon>
          <HamburgerLink to={'/'}>
            <HamburgerLinkText>Home</HamburgerLinkText>
          </HamburgerLink>
          <HamburgerLink to={'/coaching'}>
            <HamburgerLinkText>Coaching</HamburgerLinkText>
          </HamburgerLink>
          <HamburgerLink to={'/blog'}>
            <HamburgerLinkText>Blog</HamburgerLinkText>
          </HamburgerLink>
          <HamburgerLink to={'/about'}>
            <HamburgerLinkText>About</HamburgerLinkText>
          </HamburgerLink>
        </HamburgerMenuRoot>
      )}
    </>
  ) : (
    <>
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
      <HeaderLink to={'/blog'}>
        <LinkContent>
          <BlogIcon size={'.85em'} />
          <LinkText>Blog</LinkText>
        </LinkContent>
      </HeaderLink>
      <HeaderLink to={'/about'}>
        <LinkContent>
          <AboutIcon size={'.85em'} />
          <LinkText>About</LinkText>
        </LinkContent>
      </HeaderLink>
    </>
  );

  return (
    <Root>
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
      <RightContainer>{rightContent}</RightContainer>
    </Root>
  );
};

export default Header;
