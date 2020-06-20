import React, { Component, createRef } from "react"
import { graphql, PageProps, Link } from "gatsby"

import { SEO, Layout, TagsLine } from "../components";
import CC, { License } from "../components/CC"

import {
  Button, Grid, Header, Ref, Segment, Rail, Accordion,
  Label, Divider, Message,
} from 'semantic-ui-react'
import _ from "lodash";

type TemplateProps = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        slug: string;
        date?: string;
        toc?: boolean;
        categories?: string[];
        tags?: string[];
        license?: License
      }
      html: string;
    }
  }
}


const sidebarStyle = {
  background: '#fff',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
  paddingLeft: '1em',
  paddingBottom: '0.1em',
  paddingTop: '0.1em',
}

class PostTemplate extends Component<TemplateProps> {

  constructor(props: Readonly<TemplateProps>) {
    super(props);
  }



  renderTags() {
    const { markdownRemark } = this.props.data;
    const { frontmatter } = markdownRemark
    const { categories, tags, license } = frontmatter

    return (
      <>
        <Divider />
        <TagsLine categories={categories} tags={tags} />
        <CC license={license} />
      </>
    )
  }

  render() {
    const { markdownRemark } = this.props.data; // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark


    return (
      <Layout>
        <SEO title={frontmatter.title} />
        <Grid>
          <Grid.Column width={16} mobile={16} computer={11} tablet={11}>
            <Header as="h1">{frontmatter.title}</Header>
            <Divider />
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {this.renderTags()}
          </Grid.Column>
          <Grid.Column width={16} mobile={16} computer={5} tablet={5} style={{ background: '#Faa' }}>
          </Grid.Column>

        </Grid>
      </Layout>
    )
  }
}

export default function Template({ data }: TemplateProps) {
  return (<PostTemplate data={data} />)
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        categories
        tags
        toc
        license {
          type
          author
          translator
          reproduced_url
          reproduced_website
        }
        
      }
    }
  }
`