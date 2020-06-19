import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout } from "../components";

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

const CategoriesPage = (props: CategoriesPageProp) => {
    const {
        data: { allMarkdownRemark: { group },
            site: { siteMetadata: { title } }
        }
    } = props;
    return (
        <Layout>
            <SEO title={title} />
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
        </Layout>
    )
}
export default CategoriesPage

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