import React from "react";
import PropTypes from "prop-types";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SkipLink from "./SkipLink/SkipLink";
import PhaseBanner from "./PhaseBanner/PhaseBanner";

const Layout = ({ children }) => (
  <>
    <SkipLink />
    <Header serviceName="My rent account" />
    <div className="govuk-width-container app-width-container">
      <PhaseBanner phase="beta" />
      <main
        className="govuk-main-wrapper app-main-class"
        id="content"
        role="main"
      >
        {children}
      </main>
    </div>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
