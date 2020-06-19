import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
type TagGroup = {
    fieldValue: string;
    totalCount: number;
}

type TagsPageProp = {
    data: {
        allMarkdownRemark: {
            group: TagGroup[]
        },
        site: {
            siteMetadata: {
                title: string
            },
        },
    }
}

const TagsPage = (props: TagsPageProp) => {
    const {
        data: { allMarkdownRemark: { group },
            site: { siteMetadata: { title } }
        }
    } = props;
    return (
        <div>
            <Helmet title={title} />
            <div>
                <h1>Tags</h1>
                <ul>
                    {group.map(tag => (
                        <li key={tag.fieldValue}>
                            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                {tag.fieldValue} ({tag.totalCount})
            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`