import React from "react";
import "normalize.css";

import App from "next/app";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
