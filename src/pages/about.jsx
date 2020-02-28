import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import Image from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import ContentCard from '../components/ui/ContentCard';

const HeadshotImg = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: ${rhythm(1 / 2)};
  border-radius: 100%;
`;

const Title = styled.h2`
  margin-top: 0px;
`;

const Header = styled(Flex)``;

const AboutMe = ({ data, location }) => {
  const {
    site: {
      siteMetadata: { siteTitle },
    },
    markdownRemark: { html },
  } = data;

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <SEO
          keywords={[
            `software`,
            `engineering`,
            `web`,
            `development`,
            `coaching`,
            `programming`,
            `mentor`,
          ]}
        />
        <ContentCard>
          <Header alignCenter column>
            <HeadshotImg
              fixed={data.avatar.childImageSharp.fixed}
              imgStyle={{
                borderRadius: `50%`,
              }}
              objectPosition="10% 10%"
            />
            <Title>About Me</Title>
          </Header>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </ContentCard>
      </Layout>
    </div>
  );
};

export default AboutMe;

export const AboutMeQuery = graphql`
  query AboutMeQuery {
    avatar: file(absolutePath: { regex: "/headshot.JPG/" }) {
      childImageSharp {
        fixed(width: 164, height: 164, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        siteTitle
      }
    }
    markdownRemark(fields: { slug: { eq: "/aboutMe/" } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
        keywords
      }
    }
  }
`;
