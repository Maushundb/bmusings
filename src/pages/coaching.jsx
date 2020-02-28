import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ContentCard from '../components/ui/ContentCard';

import { COLORS } from '../constants';

const BookNowContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 48px;
  padding-bottom: 120px;
`;
const CoachingButton = styled.a`
  background-color: ${COLORS.BLUE};
  color: white;
  height: 56px;
  text-transform: uppercase;
  font-family: 'Square Market', 'helvetica neue', helvetica, arial, sans-serif;
  letter-spacing: 1px;
  padding: 0 28px;
  border-radius: 3px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  text-align: center;
`;

const Coaching = ({ data, location }) => {
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
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <BookNowContainer>
            <CoachingButton
              target="_top"
              href="https://square.site/book/WMDYDQ5HC1V59/web-development-mentoring-with-brandon-maushund"
              rel="nofollow"
            >
              Book Your Free Appointment Now
            </CoachingButton>
          </BookNowContainer>
        </ContentCard>
      </Layout>
    </div>
  );
};

export default Coaching;

export const pageQuery = graphql`
  query Coaching {
    site {
      siteMetadata {
        siteTitle
        author
      }
    }
    markdownRemark(fields: { slug: { eq: "/coaching/" } }) {
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
