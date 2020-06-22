import React, { Component } from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql, navigate } from "gatsby"
import { SEO, Layout } from "../components";
import kebabCase from "lodash/kebabCase"
import { Pagination, Grid } from "semantic-ui-react";

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

function getPath(category: string, activePage: string | number | undefined) {
    const categoryPath = `/categories/${kebabCase(category)}`;
    const path = (activePage === 1 || activePage === "1")
        ? categoryPath : categoryPath + "/" + activePage;
    return path;
}

class CategoriesTemplatePage extends Component<TemplateProps> {
    render() {
        const { category, activePage, totalPages } = this.props.pageContext;
        const { edges, totalCount } = this.props.data.allMarkdownRemark
        const tagHeader = `${totalCount} post${
            totalCount === 1 ? "" : "s"
            } category with "${category}"`

        return (
            <Layout path={getPath(category, 1)}>
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
                {totalPages > 1 &&
                    (
                        <div>
                            <Pagination
                                onPageChange={(e, { activePage }) => { navigate(getPath(category, activePage)) }}
                                firstItem={null}
                                lastItem={null}
                                prevItem={activePage === 1 ? null : undefined}
                                nextItem={activePage === totalPages ? null : undefined}
                                activePage={activePage}
                                totalPages={totalPages} />
                        </div>
                    )
                }

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