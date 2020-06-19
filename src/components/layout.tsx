/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from "react"
import PropTypes from "prop-types"
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
import Header from "./header"
import Footer from "./Footer"
import "./layout.sass"

interface LayoutProps {
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

const Layout = ({ children }: LayoutProps) => {
  const data = useStaticQuery(LayoutQuery)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container as="main">{children}</Container>
      <Footer />
    </>
  )
}

export default Layout
