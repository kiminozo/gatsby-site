import React, { Component, createRef } from "react"
import { graphql, PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Button, Grid, Header, Ref, Segment, Divider
} from 'semantic-ui-react'
import _ from "lodash";

// this prop will be injected by the GraphQL query below.
type MarkdownRemarkEdges = {
  node: {
    frontmatter: {
      title: string;
      slug: string;
      date: string;
      lang: string;
      songWriter: string;
      lyricWriter: string;
      singer: string;
      arranger: string;
    }
    html: string;
  }
}

type TemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: MarkdownRemarkEdges[]
    }
  }
}

type TemplateState = {
  activeId: string
}

type HeaderInfo = {
  id: string;
  offset: number;
}


class SongTemplatePage extends Component<TemplateProps, TemplateState> {
  contextRef = createRef<HTMLDivElement>()
  headerInfos: HeaderInfo[] = [];

  constructor(props: Readonly<TemplateProps>) {
    super(props);
    this.state = { activeId: "" }
  }



  render() {
    const { edges } = this.props.data.allMarkdownRemark; // data.markdownRemark holds your post data
    const edge = _.find(edges, p => !p.node.frontmatter.lang);
    if (!edge) {
      return;
    }
    const { frontmatter, html } = edge.node;

    const zhEdge = _.find(edges, p => p.node.frontmatter.lang != null);
    if (!zhEdge) {
      return;
    }
    const zhHtml = zhEdge.node.html;

    const body = (<Grid container>
      <Ref innerRef={this.contextRef}>
        <Grid.Column width={12}>
          <Header as="h1">{frontmatter.title}</Header>
          <Segment basic>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <div
                  className="song-content"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </Grid.Column>
              <Grid.Column>
                <div
                  className="song-content-zh"
                  dangerouslySetInnerHTML={{ __html: zhHtml }}
                />
              </Grid.Column>
            </Grid>
            <Divider vertical>翻译</Divider>
          </Segment>
        </Grid.Column>
      </Ref>
    </Grid>)

    return (
      <Layout>
        <SEO title="Page two" />
        {body}
      </Layout>
    )
  }
}

export default function SongTemplate({ data }: TemplateProps) {
  return (<SongTemplatePage data={data} />)
}

export const pageQuery = graphql`
  query($slug: String!) {
    allMarkdownRemark( filter: {frontmatter: { slug: { eq: $slug } }}) {
      edges {
      node {
        html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            songWriter
            lyricWriter
            singer
            arranger
            lang
       }
        }
      }
    }
  }
`