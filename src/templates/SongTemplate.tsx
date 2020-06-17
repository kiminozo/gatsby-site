import React, { Component } from "react"
import { graphql, PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CC, { License } from "../components/CC"

import {
  Icon, Grid, Header, Container, Segment, Divider, Responsive
} from 'semantic-ui-react'
import _ from "lodash";

// this prop will be injected by the GraphQL query below.
type MarkdownRemark = {
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    lang: string;
    discography: string[];
    discographyId: string[];
    songwriter: string[];
    lyricwriter: string[];
    singer: string[];
    arranger: string[];
    license?: License
  }
  html: string;
}

type TemplateProps = {
  data: {
    markdownRemark: MarkdownRemark
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

  renderMobile(title: string, jpHtml: string, zhHtml: string) {
    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Grid container>
          <Grid.Column>
            <Header as="h1">{title}</Header>
            <div
              className="song-content"
              dangerouslySetInnerHTML={{ __html: jpHtml }}
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

  renderDesktop(title: string, jpHtml: string, zhHtml: string) {
    return (<Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Grid container>
        <Grid.Column width={12}>
          <Header as="h1">{title}</Header>
          <Segment basic>
            <Grid columns={2} relaxed='very'>
              <Grid.Column>
                <div
                  className="song-content"
                  dangerouslySetInnerHTML={{ __html: jpHtml }}
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
    const remark = this.props.data.markdownRemark; // data.markdownRemark holds your post data
    if (!remark) {
      return;
    }
    const { frontmatter, html } = remark;
    const { title } = frontmatter;

    const jpHtml = html;
    const zhHtml = "zhhtml";//TODO

    return (
      <Layout>
        <SEO title={title} />
        {this.renderDesktop(title, jpHtml, zhHtml)}
        {this.renderMobile(title, jpHtml, zhHtml)}
      </Layout>
    )
  }
}

export default function SongTemplate({ data }: TemplateProps) {
  return (<SongTemplatePage data={data} />)
}

export const pageQuery = graphql`
  query($slug: String!) {
  markdownRemark(frontmatter: { slug: { eq: $slug } }) {
    html
    frontmatter {
    date(formatString: "MMMM DD, YYYY")
    slug
    title
    license {
        type
        author
        translator
        reproduced_url
        reproduced_website
      }
      singer
      songwriter
      lyricwriter
      arranger
      discography
      discographyId
      }
    }
  }
`
