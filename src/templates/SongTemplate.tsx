import React, { Component } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

import { SEO, Layout, CC, License } from "../components";
import RecordGroup from "../components/RecordGroup"
import StaffList, { StaffInfo } from '../components/StaffList'
import {
  Icon, Grid, Header, Container, Segment, Divider, Responsive,
  Button, Card, Image, Label, Item, List
} from 'semantic-ui-react'
import _ from "lodash";

import demo from "../images/demo.png"
// this prop will be injected by the GraphQL query below.


interface Record {
  discography: string[];
  discographyId: string[];
}

interface MarkdownRemark {
  frontmatter: StaffInfo & Record & {
    title: string;
    slug: string;
    date: string;
    lang: string;
    license?: License
  }
  html: string;
}

interface TemplateProps {
  data: {
    markdownRemark: MarkdownRemark
  }
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

class SongTemplatePage extends Component<TemplateProps> {

  constructor(props: Readonly<TemplateProps>) {
    super(props);
    this.state = { activeId: "" }
  }


  render() {
    const remark = this.props.data.markdownRemark; // data.markdownRemark holds your post data
    if (!remark) {
      return;
    }
    const { frontmatter, html } = remark;
    const { title, discographyId, license, slug } = frontmatter;
    const { jp, cn } = split(html);

    return (
      <Layout path={slug}>
        <SEO title={title} />
        <Grid>
          <Grid.Column mobile={16} computer={13} tablet={16}>
            <Header as="h1">{title}</Header>
            <StaffList staff={frontmatter} />
            <Segment style={{ fontSize: "1.1rem", lineHeight: 2 }} >
              <Grid columns={2} centered stackable>
                <Grid.Column>
                  <div
                    className="song-content"
                    dangerouslySetInnerHTML={{ __html: jp }}
                  />
                </Grid.Column>
                <Divider vertical>翻译</Divider>
                <Grid.Column>
                  <div
                    className="song-content"
                    dangerouslySetInnerHTML={{ __html: cn }}
                  />

                </Grid.Column>
              </Grid>
            </Segment>
            <Divider hidden />
            <CC license={license} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={3} tablet={16}>
            <RecordGroup discographyId={discographyId} />
          </Grid.Column>
        </Grid>
      </Layout >
    )
  }
}

export default function SongTemplate({ data }: TemplateProps) {
  return (<SongTemplatePage data={data} />)
}

export const pageQuery = graphql`
  query($slug: String!) {
            markdownRemark(frontmatter: {slug: {eq: $slug } }) {
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
