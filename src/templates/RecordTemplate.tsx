import React, { Component } from "react"
import { graphql, Link } from "gatsby"

import { SEO, Layout, TagsLine, CoverImage } from "../components";
import StaffList, { StaffInfo } from '../components/StaffList'

import {
  Button, Grid, Header, Ref, Segment, Rail, Accordion,
  Label, Divider, Item, List
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

const Record = ({ title, info }: { title: string, info: RecordInfo }) => (
  <Item.Group>
    <Item>
      <Item.Image>
        <CoverImage coverImage={info.coverImage} />
      </Item.Image>
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>编号:{info.recordNo}</Item.Meta>
        <Item.Meta>艺术家:岡崎律子</Item.Meta>
        <Item.Meta>唱片类型:{info.recordType}</Item.Meta>
        <Item.Meta>发售日期:{info.recordReleaseDate}</Item.Meta>
        <Item.Meta>发行商:{info.recordPublisher}</Item.Meta>
        {info.recordPrice && <Item.Meta>售价:{info.recordPrice}</Item.Meta>}
        <Item.Description>
        </Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>
)

class RecordTemplate extends Component<TemplateProps> {

  constructor(props: Readonly<TemplateProps>) {
    super(props);
  }



  render() {
    const { record: { frontmatter, html }, songs: { nodes } } = this.props.data; // data.markdownRemark holds your post data
    const { title, slug } = frontmatter;
    const songs = nodes.map(p => p.frontmatter)
    return (
      <Layout path={slug}>
        <SEO title={title} />
        <Grid>
          <Grid.Column mobile={16} computer={11} tablet={11}>
            <Record title={title} info={frontmatter} />
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
                  <List.Item >
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
          <Grid.Column mobile={16} computer={5} tablet={5} >

          </Grid.Column>
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