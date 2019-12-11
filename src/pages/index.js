import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const Background = styled.div`
  background-color: #011627;
  position: absolute;
  width: 100%;
  height: 60%;
`;

const BlogIndex = ({ data, location }) => {
  const { siteTitle } = data.site.siteMetadata;
  const posts = data.allMarkdownRemark.edges;

  return (
    <div>
      <Background />
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
        <Bio />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
