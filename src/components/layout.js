import React from 'react';
import { Link } from 'gatsby';
import Newsletter from '../components/newsletter';

import { rhythm, scale } from '../utils/typography';

const ROOT_PATH = `${__PATH_PREFIX__}/`;

const Layout = ({ location, title, children }) => (
  <div
    style={{
      marginLeft: `auto`,
      marginRight: `auto`,
      maxWidth: rhythm(24),
      padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
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
);

export default Layout;
