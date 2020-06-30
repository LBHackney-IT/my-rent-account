import React from "react";
import "normalize.css";

import App from "next/app";
import Layout from "components/Layout/Layout";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}
