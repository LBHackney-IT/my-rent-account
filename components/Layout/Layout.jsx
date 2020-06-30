import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import { Container, Header, Main, Paragraph, Tag } from "lbh-frontend-react";

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>My Rent Account</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header serviceName="My Rent Account"></Header>
    <Main>
      <Container>
        <div className="phase-banner">
          <Paragraph>
            <Tag>BETA</Tag> This is a new service – your feedback will help us
            to improve it.
          </Paragraph>
          <hr />
        </div>
        {children}
      </Container>
    </Main>
    <style jsx>
      {`
        :global(#main-content) {
          padding-top: 0;
        }
        .phase-banner {
          margin-top: 1.5em;
        }
      `}
    </style>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
