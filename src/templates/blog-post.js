import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Social from '../components/social';
import { rhythm, scale } from '../utils/typography';
import Newsletter from '../components/newsletter';

import { COLORS } from '../constants';

const ContentContainer = styled.div`
  background-color: ${COLORS.WHITE};
  border-radius: 6px;
  padding: ${rhythm(3 / 4)};
`;

const BlogPostTemplate = ({ location, data, pageContext }) => {
  const post = data.markdownRemark;
  const { frontmatter } = post;
  const { siteTitle } = data.site.siteMetadata;
  const { previous, next } = pageContext;
  const keywords = frontmatter.keywords.split(',').map(s => s.trim());

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <SEO title={frontmatter.title} description={post.spoiler} keywords={keywords} />
        <ContentContainer>
          <h1>{frontmatter.title}</h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
              marginTop: rhythm(-1),
            }}
          >
            {frontmatter.date}
          </p>
          <Social shareUrl={location.href} />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Bio />

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <Newsletter />
        </ContentContainer>
      </Layout>
    </div>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteTitle
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
