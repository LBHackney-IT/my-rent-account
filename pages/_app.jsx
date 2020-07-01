import React from "react";
import App from "next/app";

import "./stylesheets/all.scss";

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
