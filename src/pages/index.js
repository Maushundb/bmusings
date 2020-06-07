import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import Image from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import ContentCard from '../components/ui/ContentCard';

import { COLORS } from '../constants';

const BlogText = styled.h1`
  margin: 0px;
`;

const JumbotronContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${rhythm(3)};
  margin-bottom: ${rhythm(3)};
  flex-direction: column;

  @media screen and (max-width: 768px) {
    padding: ${rhythm(1.5)};
  }
`;

const JumboTitle = styled.h1`
  color: ${COLORS.WHITE};
  margin-bottom: 4px;
  text-align: center;
`;

const JumboSubTitle = styled.h5`
  color: ${COLORS.WHITE};
  margin: 0px;
  text-align: center;
`;

const JumboFooter = styled.h3`
  margin: ${rhythm(2)} 0 0 0;
  color: ${COLORS.WHITE};
  text-align: center;
`;

const CoachingContentContainer = styled(Flex)`
  margin-top: ${rhythm(1)};

  @media screen and (max-width: 528px) {
    flex-direction: column;
  }

  h3 {
    margin: 0;
    margin-bottom: ${rhythm(1 / 2)};
  }
`;

const CoachingImage = styled(Image)`
  margin: 0px ${rhythm(1 / 2)} 0px 0px;
  min-width: 300px;
  border-radius: 2px;

  @media screen and (max-width: 528px) {
    min-width: 0px;
    margin-bottom: ${rhythm(1 / 2)};
  }
`;

const BlogIndex = ({ data, location }) => {
  const { siteTitle } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <SEO
          isLanding
          keywords={[
            `software`,
            `engineering`,
            `javascript`,
            `react`,
            `ramda`,
            `code`,
            `silicon`,
            `valley`,
          ]}
        />
        <JumbotronContainer>
          <JumboTitle>Welcome to bMusings</JumboTitle>
          <JumboSubTitle>Personal site of Brandon Maushund</JumboSubTitle>
          <JumboFooter>
            Javascript, Web Development, and Software Engineering. Let's learn some stuff together.
          </JumboFooter>
        </JumbotronContainer>
        <ContentCard>
          <BlogText>Coaching</BlogText>
          <CoachingContentContainer>
            <CoachingImage fluid={data.coachingImg.childImageSharp.fluid} />
            <Flex column justifyBetween>
              <div>
                <h3>Want to level up your engineering career?</h3>
                <div>
                  Get coached by me personally. Rise through the ranks and live your dream career as
                  a software engineer.
                </div>
              </div>
              <div>
                <a href={'https://optimizeyoursoftwarecareer.com'}>Learn More →</a>
              </div>
            </Flex>
          </CoachingContentContainer>
        </ContentCard>
        <ContentCard>
          <BlogText>Top Blog Posts</BlogText>
          {posts.map(({ node }) => {
            const { frontmatter } = node;
            const title = frontmatter.title || node.fields.slug;
            return (
              <div key={node.fields.slug}>
                <h3 style={{ marginBottom: rhythm(1 / 4) }}>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{frontmatter.date}</small>
                <p>{frontmatter.spoiler}</p>
              </div>
            );
          })}
          <Link to={'/blog'}>See All →</Link>
        </ContentCard>
      </Layout>
    </div>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query homeQuery {
    site {
      siteMetadata {
        siteTitle
      }
    }

    coachingImg: file(absolutePath: { regex: "/pair-programming.png/" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { glob: "**/blog/**" }
        frontmatter: {
          title: {
            in: [
              "Using Ramda with React and Redux: A Functional Deep Dive - Part 1"
              "How to Ace your Technical Interview"
              "4 Ways Every Software Developer Should Improve Their Tools"
            ]
          }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`;
