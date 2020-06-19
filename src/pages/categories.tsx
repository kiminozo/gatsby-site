import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
type CategoriesGroup = {
    fieldValue: string;
    totalCount: number;
}

type CategoriesPageProp = {
    data: {
        allMarkdownRemark: {
            group: CategoriesGroup[]
        },
        site: {
            siteMetadata: {
                title: string
            },
        },
    }
}

const TagsPage = (props: CategoriesPageProp) => {
    const {
        data: { allMarkdownRemark: { group },
            site: { siteMetadata: { title } }
        }
    } = props;
    return (
        <div>
            <Helmet title={title} />
            <div>
                <h1>Categories</h1>
                <ul>
                    {group.map(category => (
                        <li key={category.fieldValue}>
                            <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                                {category.fieldValue} ({category.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default TagsPage

export const CategoriesQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`