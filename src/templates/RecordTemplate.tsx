import React, { Component } from "react"
import { graphql, Link } from "gatsby"

import { SEO, Layout, SideBar, CoverImage } from "../components";
import StaffList, { StaffInfo, StaffLink } from '../components/StaffList'

import {
  Button, Grid, Header, Ref, Segment, Rail, Accordion,
  Label, Divider, Item, List, Card
} from 'semantic-ui-react'
import _ from "lodash";
import demo from "../images/demo.png"

type RecordInfo = {
  coverImage: string;
  recordNo: string;
  recordPrice: string;
  recordPublisher: string;
  recordType: string;
  recordReleaseDate: string;
}

interface TemplateProps {
  data: {
    record: {
      frontmatter: RecordInfo & {
        title: string;
        slug: string;
      }
      html: string;
    }
    songs: {
      nodes: {
        frontmatter: StaffInfo & {
          title: string;
          slug: string;
        }
      }[]
    }
  }
}

const Record = ({ title, info, artist }: { title: string, info: RecordInfo, artist: string[] }) => (
  <Card.Group>
    <Card>
      <CoverImage coverImage={info.coverImage} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>编号:{info.recordNo}</Card.Meta>
        <Card.Meta>艺术家:<StaffLink type="singer" names={artist} /></Card.Meta>
        <Card.Meta>唱片类型:{info.recordType}</Card.Meta>
        <Card.Meta>发售日期:{info.recordReleaseDate}</Card.Meta>
        <Card.Meta>发行商:{info.recordPublisher}</Card.Meta>
        {info.recordPrice && <Card.Meta>售价:{info.recordPrice}</Card.Meta>}
        <Card.Description>
        </Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
)

class RecordTemplate extends Component<TemplateProps> {

  constructor(props: Readonly<TemplateProps>) {
    super(props);
  }



  render() {
    const { record: { frontmatter, html }, songs: { nodes } } = this.props.data; // data.markdownRemark holds your post data
    const { title, slug } = frontmatter;
    const songs = nodes.map(p => p.frontmatter)
    const artist = [...new Set<string>(songs.flatMap(p => p.singer))]
    return (
      <Layout path={slug}>
        <SEO title={title} />
        <Grid>
          <Grid.Column mobile={16} computer={4} tablet={4}>
            <Record title={title} artist={artist} info={frontmatter} />
          </Grid.Column>
          <Grid.Column mobile={16} computer={12} tablet={12}>
            <h1>简介</h1>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <Divider />
            <h1>曲目列表</h1>
            <List divided relaxed>
              {songs.map(song =>
                (
                  <List.Item key={song.slug}>
                    <List.Icon name="music" size="large" color='blue' />
                    <List.Content>
                      <List.Header as="h3">
                        <Link to={song.slug}>{song.title}</Link>
                      </List.Header>
                      <List.Description>
                        <StaffList staff={song} />
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))
              }
            </List>
          </Grid.Column>
          {/* <Grid.Column mobile={16} computer={3} tablet={5} >
            <SideBar />
          </Grid.Column> */}
        </Grid>
      </Layout>
    )
  }
}

export default function Template({ data }: TemplateProps) {
  return (<RecordTemplate data={data} />)
}


export const pageQuery = graphql`
  query($id: String!){
    record: markdownRemark(frontmatter: {id: {eq: $id}}) {
      html
      frontmatter {
        id
        slug
        title
        coverImage
        recordNo
        recordPrice
        recordPublisher
        recordType
        recordReleaseDate
      }
    }
    songs: allMarkdownRemark(filter: {frontmatter: {type: {eq: "song"}, discographyId: {glob: $id}}}, sort: {fields: frontmatter___order}) {
      nodes {
        frontmatter {
          title
          slug
          songWriter:songwriter
          lyricWriter:lyricwriter
          singer
          arranger
        }
      }
    }
  }
`