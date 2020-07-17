import React from "react";
import App from "next/app";
import Router from "next/router";

import "./stylesheets/all.scss";

import Layout from "components/Layout/Layout";

export default class MyApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
  }

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
