import React, { Component } from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout } from "../components";

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
        const { category } = this.props.pageContext;
        const { edges, totalCount } = this.props.data.allMarkdownRemark
        const tagHeader = `${totalCount} post${
            totalCount === 1 ? "" : "s"
            } category with "${category}"`
        return (
            <Layout>
                <SEO title="tags" />
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
                <Link to="/categories">All Categories</Link>
            </Layout>
        )
    }
}

export default function CategoriesTemplate({ pageContext, data }: TemplateProps) {
    return (<CategoriesTemplatePage pageContext={pageContext} data={data} />)
}

export const query = graphql`
  query($category: String) {
    allMarkdownRemark(limit: 2000, sort: {fields: [frontmatter___date], order: DESC},
     filter: {frontmatter: {categories: {in: [$category]}}}) {
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