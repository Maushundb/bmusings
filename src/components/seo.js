import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ description, lang, meta, keywords, title, isLanding = false }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const { siteMetadata } = data.site;
        const metaDescription = description || siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={isLanding ? siteMetadata.title : title}
            titleTemplate={isLanding ? siteMetadata.title : `%s | ${siteMetadata.title}`}
            meta={[
              { name: `description`, content: metaDescription },
              {
                property: `og:title`,
                content: title || siteMetadata.title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title || siteMetadata.title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : [],
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    favicon: file(absolutePath: { regex: "/gatsby-icon.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
