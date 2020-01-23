import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import ContentContainer from '../components/ui/ContentContainer';

import { COLORS } from '../constants';

const Coaching = ({ data, location }) => {
  const { siteTitle } = data.site.siteMetadata;

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
        <ContentContainer>About</ContentContainer>
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
