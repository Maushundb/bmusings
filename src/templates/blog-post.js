import React from 'react';
import { Link, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Social from '../components/social';
import { rhythm, scale } from '../utils/typography';

const BlogPostTemplate = props => {
  const { location } = props;
  const post = props.data.markdownRemark;
  const { frontmatter } = post;
  const { siteTitle } = props.data.site.siteMetadata;
  const { previous, next } = props.pageContext;
  const keywords = frontmatter.keywords.split(',').map(s => s.trim());

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={frontmatter.title} description={post.spoiler} keywords={keywords} />
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
    </Layout>
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
