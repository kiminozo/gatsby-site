import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { type } from "os"
import { Button, Grid, Header } from 'semantic-ui-react'

// this prop will be injected by the GraphQL query below.
type TemplateProps = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        slug: string;
        date: string;
      }
      html: string
    }
  }
}

export default function Template({ data }: TemplateProps) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Grid container>
        <Grid.Column width={10} >
          <Header as="h1">{frontmatter.title}</Header>
          {/* <p>{frontmatter.date}</p> */}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <div>SideBar</div>
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`