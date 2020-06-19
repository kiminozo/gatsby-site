import React, { Component } from "react"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout } from "../components";

type TagEdge = {
    node: {
        frontmatter: {
            slug: string;
            title: string
        }
    }
}

type TemplateProps = {
    pageContext: {
        tag: string;
    }
    data: {
        allMarkdownRemark: {
            totalCount: number
            edges: TagEdge[]

        }
    }
};

// Tags.propTypes = {
//     pageContext: PropTypes.shape({
//         tag: PropTypes.string.isRequired,
//     }),
//     data: PropTypes.shape({
//         allMarkdownRemark: PropTypes.shape({
//             totalCount: PropTypes.number.isRequired,
//             edges: PropTypes.arrayOf(
//                 PropTypes.shape({
//                     node: PropTypes.shape({
//                         frontmatter: PropTypes.shape({
//                             title: PropTypes.string.isRequired,
//                         }),
//                         fields: PropTypes.shape({
//                             slug: PropTypes.string.isRequired,
//                         }),
//                     }),
//                 }).isRequired
//             ),
//         }),
//     }),
// }

class TagsTemplatePage extends Component<TemplateProps> {


    render() {
        const { tag } = this.props.pageContext;
        const { edges, totalCount } = this.props.data.allMarkdownRemark
        const tagHeader = `${totalCount} post${
            totalCount === 1 ? "" : "s"
            } tagged with "${tag}"`
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
                <Link to="/tags">All tags</Link>
            </Layout>
        )
    }
}

export default function TagsTemplate({ pageContext, data }: TemplateProps) {
    return (<TagsTemplatePage pageContext={pageContext} data={data} />)
}

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
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