import React from "react";
import App from "next/app";
import Router from "next/router";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import * as gtag from "../lib/gtag";

import "./stylesheets/all.scss";

import Layout from "components/Layout/Layout";

export default class MyApp extends App {
  componentDidMount() {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange, () => {
      window.scrollTo(0, 0);
    });
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}
