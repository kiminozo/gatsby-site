import React, { Component } from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"

type TagEdge = {
    node: {
        fields: {
            slug: string;
        }
        frontmatter: {
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

class TagsTemplate extends Component<TemplateProps> {


    render() {
        const { tag } = this.props.pageContext;
        const { edges, totalCount } = this.props.data.allMarkdownRemark
        const tagHeader = `${totalCount} post${
            totalCount === 1 ? "" : "s"
            } tagged with "${tag}"`
        return (
            <div>
                <h1>{tagHeader}</h1>
                <ul>
                    {edges.map(({ node }) => {
                        const { slug } = node.fields
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
            </div>
        )
    }
}


export default TagsTemplate
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
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`