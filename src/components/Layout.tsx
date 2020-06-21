/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from "react"
import { WindowLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"
import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import Header from "./Header"
import Footer from "./Footer"
import "./layout.sass"

interface LayoutProps {
  path?: string
  children: ReactNode
}

const LayoutQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({ children, path }: LayoutProps) => {
  const data = useStaticQuery(LayoutQuery)

  return (
    <div>
      <Header siteTitle={data.site.siteMetadata.title} pathName={path ?? ""} />
      <Container as="main">{children}</Container>
      <Footer />
      {/* <Divider /> */}

      {/* <Container textAlign="center" style={{ height: 48 }}>
        © 2006-{new Date().getFullYear()},
        <a href="https://forritz.org">For RITZ</a>
        {` `}All rights reserved.
      </Container> */}
    </div>
  )
}

export default Layout
