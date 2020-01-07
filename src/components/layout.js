import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Newsletter from '../components/newsletter';

import { rhythm, scale } from '../utils/typography';
import { COLORS } from '../constants';

const ROOT_PATH = `${__PATH_PREFIX__}/`;
const Background = styled.div`
  background-color: #011627;
  position: fixed;
  width: 100%;
  height: 60%;
`;

/**
 * Root component for the site, lays out either the home page or blog post
 */
const Layout = ({ location, title, children }) => (
  <div>
    <Background />
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
      <header>
        {location.pathname === ROOT_PATH ? (
          <h1
            style={{
              ...scale(1.2),
              marginBottom: rhythm(1.5),
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
        ) : (
          <h3
            style={{
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h3>
        )}
      </header>
      <main>{children}</main>
      <footer>
        <Newsletter />
      </footer>
    </div>
  </div>
);

export default Layout;
