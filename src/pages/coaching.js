import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

const Coaching = ({ data, location }) => {
  const { siteTitle } = data.site.siteMetadata;

  return (
    <div>
      <Layout location={location} title={siteTitle}>
        <SEO
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
        <div>Hey</div>
      </Layout>
    </div>
  );
};

export default Coaching;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteTitle
      }
    }
  }
`;
