import React, { Component } from "react"
import { graphql, Link } from "gatsby"

import { SEO, Layout, TagsLine } from "../components";
import CC, { License } from "../components/CC"

import {
  Button, Grid, Header, Ref, Segment, Rail, Accordion,
  Label, Divider, Item
} from 'semantic-ui-react'
import _ from "lodash";
import demo from "../images/demo.png"

type TemplateProps = {
  pageContext: {
    slug: string;
  }
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        slug: string;
        coverImage: string
      }
      html: string;
    }
  }
}

class RecordTemplate extends Component<TemplateProps> {

  constructor(props: Readonly<TemplateProps>) {
    super(props);
  }



  render() {
    const { markdownRemark } = this.props.data; // data.markdownRemark holds your post data
    const { frontmatter: { title, slug, coverImage }, html } = markdownRemark


    return (
      <Layout path={slug}>
        <SEO title={title} />
        <Grid>
          <Grid.Column width={16} mobile={16} computer={11} tablet={11}>
            <Item.Group>
              <Item>
                <Item.Image src={demo} />
                <Item.Content>
                  <Item.Header>{title}</Item.Header>
                  <Item.Meta>编号:TACX-2391</Item.Meta>
                  <Item.Meta>艺术家:岡崎律子</Item.Meta>
                  <Item.Meta>唱片类型:Album</Item.Meta>
                  <Item.Meta>发售日期:1993.03.24</Item.Meta>
                  <Item.Meta>发行商:TAURUS RECORDS</Item.Meta>
                  <Item.Meta>售价:2,913円</Item.Meta>
                  <Item.Description>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
            <h1>简介</h1>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <Divider />
            <h1>曲目列表</h1>
          </Grid.Column>
          <Grid.Column width={16} mobile={16} computer={5} tablet={5} >
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default function Template({ pageContext, data }: TemplateProps) {
  return (<RecordTemplate pageContext={pageContext} data={data} />)
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
        coverImage
      }
    }
  }
`