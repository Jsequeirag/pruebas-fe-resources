import "@/styles/globals.css";

import "../styles/auth.css";
import "../styles/pdfDocument.css";
import "../assets/css/bootstrap.css";
import "../assets/css/bootstrap-extended.css";
import "../assets/css/colors.css";
import "../assets/css/components.css";
import "../assets/css/pages/app-todo.css";
import "../assets/vendors/css/vendors.min.css";
//import "../assets/css/core/menu/menu-types/vertical-menu-modern.css"

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { useEffect } from "react";

export default function App(
  { Component, pageProps }: AppProps,
  { session }: any
) {
  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.classList.add(
        "vertical-layout",
        "vertical-menu-modern",
        "2-columns",
        "fixed-navbar"
      );
      body.setAttribute("data-open", "click");
      body.setAttribute("data-menu", "vertical-menu-modern");
      body.setAttribute("data-col", "2-columns");
    }
  }, []);

  return <Component {...pageProps} />;
}
