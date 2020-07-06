import React from "react"
import { graphql } from "gatsby"
import { StaffTemplatePage, TemplateProps } from './StaffTemplatePage'

export default function SingerTemplate({ pageContext, data }: TemplateProps) {
  return (<StaffTemplatePage title={`${pageContext.staff} 演唱的歌曲`}
    pageContext={pageContext} data={data} />)
}

export const pageQuery = graphql`
  query($staff: String, $skip: Int!, $limit: Int!) {
    songs: allMarkdownRemark(
        limit: $limit,
        skip: $skip,
        filter: {frontmatter: {singer: {in: [$staff]}}},
        sort: {fields: frontmatter___order}
        ) {
      totalCount
      nodes {
        song:frontmatter {
            slug
            title
            singer
            songWriter: songwriter
            lyricWriter: lyricwriter
            arranger
          }
      }
    }
  }
`