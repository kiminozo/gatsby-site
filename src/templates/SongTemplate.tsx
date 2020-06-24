import React, { Component } from "react"
import { graphql, PageProps, Link } from "gatsby"

import { SEO, Layout } from "../components";
import CC, { License } from "../components/CC"

import {
  Icon, Grid, Header, Container, Segment, Divider, Responsive,
  Button, Card, Image, Label, Item, List
} from 'semantic-ui-react'
import _ from "lodash";


import demo from "../images/demo.png"
// this prop will be injected by the GraphQL query below.
interface Staff {
  songWriter: string[];
  lyricWriter: string[];
  singer: string[];
  arranger: string[];
}

interface Record {
  discography: string[];
  discographyId: string[];
}

type MarkdownRemark = {
  frontmatter: Staff & Record & {
    title: string;
    slug: string;
    date: string;
    lang: string;
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

const StaffLink = ({ type, names }: { type: string, names: string[] }) => (
  <>
    {
      names.map((name, i) => (
        <Link to={`/${type}/${name}`}>{name}</Link>
      ))
    }
  </>
)

const StaffList = ({ staff }: { staff: Staff }) => (
  <List horizontal >
    <List.Item ><b>作曲</b> <StaffLink type="song-writer" names={staff.songWriter} /> </List.Item>
    <List.Item><b>作词</b> <StaffLink type="lyric-writer" names={staff.lyricWriter} /></List.Item>
    <List.Item><b>演唱</b> <StaffLink type="singer" names={staff.singer} /></List.Item>
    <List.Item><b>编曲</b> <StaffLink type="arranger" names={staff.arranger} /></List.Item>
  </List>
)

const Records = () => (
  <Card.Group doubling>
    {/* <Card image={demo} >
      <Label attached='bottom'>CSS</Label>
    </Card>

    <Card image={demo} /> */}
    <Card as={Link} to="/discography/sincerely-yours">
      <Image
        src={demo}
      />
      <Label attached='bottom left'>Rain or Shine</Label>
      {/* <Card.Content>
        <Card.Header>Rain or Shine</Card.Header>
      </Card.Content> */}
    </Card>

    <Card as={Link} to="/discography/rain-or-shine">
      <Image
        src={demo}
      />
      <Label attached='bottom left'>Rain or Shine</Label>

    </Card>
  </Card.Group >
)

class SongTemplatePage extends Component<TemplateProps, TemplateState> {
  headerInfos: HeaderInfo[] = [];

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
    const { title } = frontmatter;

    const { jp, cn } = split(html);

    return (
      <Layout path={frontmatter.slug}>
        <SEO title={title} />
        <Grid>
          <Grid.Column width={16} mobile={16} computer={13} tablet={16}>
            <Header as="h1">{title}</Header>
            <StaffList staff={frontmatter} />
            <Segment style={{ fontSize: "1.2rem" }}>
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

          </Grid.Column>
          <Grid.Column width={16} mobile={16} computer={3} tablet={16}>
            <Records />
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
