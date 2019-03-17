import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const Bio = () => (
  <StaticQuery
    query={bioQuery}
    render={data => {
      const { author, social, description } = data.site.siteMetadata;
      return (
        <div
          style={{
            display: `flex`,
            marginBottom: rhythm(2.5),
            alignItems: 'center',
          }}
        >
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              minWidth: 50,
              borderRadius: `100%`,
            }}
            imgStyle={{ borderRadius: `50%` }}
          />
          <p style={{ marginBottom: '0px' }}>
            {description}
            <br />
            Written by <strong>{author}</strong>
            <br />
            You should follow us on{' '}
            <a href={`https://instagram.com/${social.instagram}`}>Instagram</a> and{' '}
            <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>
          </p>
        </div>
      );
    }}
  />
);

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        description
        social {
          twitter
          instagram
        }
      }
    }
  }
`;

export default Bio;
