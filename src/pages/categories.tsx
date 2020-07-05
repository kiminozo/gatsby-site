import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout } from "../components";
import {
    Menu, Label, List
} from 'semantic-ui-react'
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
                <Menu vertical>
                    {group.map(category => (
                        <Menu.Item as={Link} to={`/categories/${kebabCase(category.fieldValue)}/`} >
                            {category.fieldValue}
                            <Label circular color='teal' >{category.totalCount} </Label>
                        </Menu.Item>
                    ))}
                </Menu>
            </div>
        </Layout >
    )
}
export default CategoriesPage

export const CategoriesQuery = graphql`
{
    site {
        siteMetadata {
            title
        }
    }
    allMarkdownRemark(limit: 2000, filter: { frontmatter: { type: { eq: null } } }) {
        group(field: frontmatter___categories) {
            fieldValue
            totalCount
        }
    }
}
`