import React, { Component } from "react"
import { graphql, PageProps, Link } from "gatsby"

import { SEO, Layout } from "../components";
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
    songWriter: string[];
    lyricWriter: string[];
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

const splitKey = /<\!--\s+翻译\s+-->/g
type Translator = {
  jp: string
  cn: string
}

function split(html: string): Translator {
  const strings = html.split(splitKey);
  if (strings && strings.length == 2) {
    return { jp: strings[0], cn: strings[1] }
  } else {
    return { jp: html, cn: "" }
  }
}

class SongTemplatePage extends Component<TemplateProps, TemplateState> {
  headerInfos: HeaderInfo[] = [];

  constructor(props: Readonly<TemplateProps>) {
    super(props);
    this.state = { activeId: "" }
  }

  // renderMobile(title: string, jpHtml: string, zhHtml: string) {
  //   return (
  //     <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
  //       <Grid container>
  //         <Grid.Column>
  //           <Header as="h1">{title}</Header>
  //           <div
  //             className="song-content"
  //             dangerouslySetInnerHTML={{ __html: jpHtml }}
  //           />
  //           <Divider horizontal >翻译</Divider>
  //           <div
  //             className="song-content-zh"
  //             dangerouslySetInnerHTML={{ __html: zhHtml }}
  //           />
  //         </Grid.Column>
  //       </Grid>
  //     </Responsive >
  //   );
  // }

  renderDesktop(title: string, jpHtml: string, zhHtml: string) {
    return (
      <Grid  >
        <Grid.Column width={16} mobile={16} computer={16} tablet={16}>
          <Header as="h1">{title}</Header>

          <Segment style={{ fontSize: "1.2rem" }}>
            <Grid columns={2} centered stackable>
              <Grid.Column>
                <div
                  className="song-content"
                  dangerouslySetInnerHTML={{ __html: jpHtml }}
                />
              </Grid.Column>
              <Divider vertical>翻译</Divider>
              <Grid.Column>
                <div
                  className="song-content"
                  dangerouslySetInnerHTML={{ __html: zhHtml }}
                />

              </Grid.Column>

            </Grid>

            {/* <Divider vertical>翻译</Divider> */}

          </Segment>

        </Grid.Column>
      </Grid>
    )
  }

  render() {
    const remark = this.props.data.markdownRemark; // data.markdownRemark holds your post data
    if (!remark) {
      return;
    }
    const { frontmatter, html } = remark;
    const { title } = frontmatter;

    const { jp, cn } = split(html);

    return (
      <Layout>
        <SEO title={title} />
        {this.renderDesktop(title, jp, cn)}
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
      songWriter:songwriter
      lyricWriter:lyricwriter
      arranger
      discography
      discographyId
      }
    }
  }
`
