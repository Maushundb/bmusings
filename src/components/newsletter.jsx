import * as React from 'react';
import styled from 'styled-components';
import { faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { rhythm, scale } from '../utils/typography';

import { NEWSLETTER_URL } from '../constants';

const Form = styled.form`
  width: 300px;
  margin: 0;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: ${rhythm(1 / 4)};
`;

const EmailInput = styled.input`
  display: block;
  width: 100%;
  padding: ${rhythm(1 / 3)};
  margin: ${rhythm(1 / 4)} 0;
  border-radius: ${rhythm(1 / 4)};
  border: 2px solid #373737;
  transition: border-color 200ms ease;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    border: 2px solid #468b9d;
    outline: none;
  }
`;

const Subscribe = styled.input`
  display: block;
  width: 100%;
  padding: ${rhythm(1 / 3)};
  margin: 0 0 ${rhythm(1 / 2)};
  border-radius: ${rhythm(1 / 4)};
  border: none;
  color: white;
  background-color: #468b9d;
  transition: background-color 200ms ease;

  &:hover {
    cursor: pointer;
  }
`;

const Subtext = styled.p`
  margin: 0px auto;
  ${scale(-1 / 2)}
`;

const Newsletter = () => (
  <Form
    action={NEWSLETTER_URL}
    method="post"
    target="popupwindow"
    onSubmit={() => {
      window.open(NEWSLETTER_URL, 'popupwindow', 'scrollbars=yes,width=800,height=600');
      return true;
    }}
  >
    <h3>
      <Icon icon={faEnvelopeOpen}> Join the Newsletter. </Icon>
      Join the Newsletter
    </h3>
    <EmailInput
      type="text"
      name="email"
      placeholder="Your email address"
      aria-label="Your email address"
    />
    <input type="hidden" value="1" name="embed" />
    <Subscribe type="submit" value="Subscribe" />
    <Subtext>
      Subscribe to get the latest content by email.
      <br />
      <em>(No spam ever, unsubscribe at any time)</em>
    </Subtext>
  </Form>
);

export default Newsletter;
