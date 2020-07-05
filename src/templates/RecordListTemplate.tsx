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

interface RecordInfo {
  id: string;
  coverImage: string;
  recordNo: string;
  recordPrice: string;
  recordPublisher: string;
  recordType: string;
  recordReleaseDate: string;
}

interface SongInfo {
  slug: string;
  title: string;
  discographyId: string[];
  discography: string[];
}

interface TemplateProps {
  pageContext: {
    category: string
  }
  data: {
    records: {
      totalCount: number;
      recordGroup: {
        frontmatter: RecordInfo & {
          slug: string
          title: string
        }
      }[]
    }
    songs: {
      totalCount: number;
      songGroup: {
        frontmatter: SongInfo;
      }[]
    }
  }
}


const RecordListTemplate = (props: TemplateProps) => {
  const { pageContext: { category }, data } = props;
  const { records: { recordGroup }, songs: { songGroup } } = data;
  const records = recordGroup.map(p => p.frontmatter);
  const songs = songGroup.map(p => p.frontmatter);
  return (
    <Layout path={`/discography/${_.kebabCase(category)}/`}>
      <SEO title={category} />
      <Grid>
        <Grid.Column mobile={16} computer={12} tablet={12}>
          <h1>{category}</h1>
          <ul>
            {
              records.map(({ title, id }) => (
                <li>{title}
                  <ol>
                    {
                      songs.filter(p => p.discographyId.includes(id))
                        .map(({ title }) => (
                          <li>{title}</li>
                        ))
                    }
                  </ol>
                </li>

              ))
            }
          </ul>
        </Grid.Column>
      </Grid>
    </Layout >
  )
}

export default function Template(props: TemplateProps) {
  return (<RecordListTemplate {...props} />)
}

export const pageQuery = graphql`
  query ($category: String,$discographyIds:[String]) {
  records: allMarkdownRemark(sort: {fields: [frontmatter___order], order: ASC}, filter: {frontmatter: {categories: {in: [$category]}}}) {
    totalCount
    recordGroup: nodes {
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
  }
  songs:allMarkdownRemark(sort: {fields: [frontmatter___order], order: ASC}, filter: {frontmatter: {type: {eq: "song"}, discographyId: {in: $discographyIds}}}) {
    totalCount
    songGroup: nodes {
      frontmatter {
        slug
        title
        discographyId
        discography
      }
    }
  }
}

`