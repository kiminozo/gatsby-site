import React, { Component } from "react"
import { graphql, PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Icon, Grid, Header, Container, Segment, Divider, Responsive
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
  headerInfos: HeaderInfo[] = [];

  constructor(props: Readonly<TemplateProps>) {
    super(props);
    this.state = { activeId: "" }
  }

  renderMobile(title: string, html: string, zhHtml: string) {
    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Grid container>
          <Grid.Column>
            <Header as="h1">{title}</Header>
            <div
              className="song-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <Divider horizontal >翻译</Divider>
            <div
              className="song-content-zh"
              dangerouslySetInnerHTML={{ __html: zhHtml }}
            />
          </Grid.Column>
        </Grid>
      </Responsive >
    );
  }

  renderDesktop(title: string, html: string, zhHtml: string) {
    return (<Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Grid container>
        <Grid.Column width={12}>
          <Header as="h1">{title}</Header>
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
            <Divider vertical >翻译</Divider>
          </Segment>
        </Grid.Column>
      </Grid>
    </Responsive>)
  }

  render() {
    const { edges } = this.props.data.allMarkdownRemark; // data.markdownRemark holds your post data
    const edge = _.find(edges, p => !p.node.frontmatter.lang);
    if (!edge) {
      return;
    }
    const { frontmatter, html } = edge.node;
    const { title } = frontmatter;
    const zhEdge = _.find(edges, p => p.node.frontmatter.lang != null);
    if (!zhEdge) {
      return;
    }
    const zhHtml = zhEdge.node.html;

    return (
      <Layout>
        <SEO title={title} />
        {this.renderDesktop(title, html, zhHtml)}
        {this.renderMobile(title, html, zhHtml)}
      </Layout>
    )
  }
}

export default function SongTemplate({ data }: TemplateProps) {
  return (<SongTemplatePage data={data} />)
}

export const pageQuery = graphql`
  query($slug: String!) {
        allMarkdownRemark(filter: {frontmatter: {slug: {eq: $slug } }}) {
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