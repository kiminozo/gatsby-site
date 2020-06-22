import React, { Component } from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout } from "../components";
import kebabCase from "lodash/kebabCase"
import { Pagination } from "semantic-ui-react";

type CategoriesEdge = {
    node: {
        frontmatter: {
            slug: string;
            title: string
        }
    }
}

type TemplateProps = {
    pageContext: {
        category: string;
        activePage: number,
        totalPages: number
    }
    data: {
        allMarkdownRemark: {
            totalCount: number
            edges: CategoriesEdge[]

        }
    }
};

class CategoriesTemplatePage extends Component<TemplateProps> {


    render() {
        const { category, activePage, totalPages } = this.props.pageContext;
        const { edges, totalCount } = this.props.data.allMarkdownRemark
        const tagHeader = `${totalCount} post${
            totalCount === 1 ? "" : "s"
            } category with "${category}"`
        return (
            <Layout path={`/categories/${kebabCase(category)}/`}>
                <SEO title="categories" />
                <h1>{tagHeader}</h1>
                <ul>
                    {edges.map(({ node }) => {
                        const { slug } = node.frontmatter
                        const { title } = node.frontmatter
                        return (
                            <li key={slug}>
                                <Link to={slug}>{title}</Link>
                            </li>
                        )
                    })}
                </ul>
                {/*
              This links to a page that does not yet exist.
              You'll come back to it!
            */}
                <Pagination
                    firstItem={null}
                    lastItem={null}
                    activePage={activePage}
                    totalPages={totalPages} />
                <br />
                <Link to="/categories">All Categories</Link>
            </Layout>
        )
    }
}

export default function CategoriesTemplate({ pageContext, data }: TemplateProps) {
    return (<CategoriesTemplatePage pageContext={pageContext} data={data} />)
}

export const query = graphql`
  query($category: String, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
       limit: $limit,
       skip: $skip,
       sort: {fields: [frontmatter___slug], order: ASC},
       filter: {frontmatter: {categories: {in: [$category]}}}
    ){
      totalCount
      edges {
        node {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`