import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

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
        {/* <ContentCard>
          <BlogText>Coaching</BlogText>
        </ContentCard> */}
        <ContentCard>
          <BlogText>Blog</BlogText>
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
        </ContentCard>
      </Layout>
    </div>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { glob: "**/blog/**" } }
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
