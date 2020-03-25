import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import ContentCard from '../components/ui/ContentCard';

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
        <ContentCard>
          <h1>All Blog Posts</h1>
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
  query blogQuery {
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
