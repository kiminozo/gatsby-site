import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout, CoverImage } from "../components";
import {
    Card
} from 'semantic-ui-react'
import { string } from "prop-types";


interface PageProps {
    data: {
        records: {
            nodes: {
                frontmatter: {
                    coverImage: string;
                    id: string;
                    title: string;
                    slug: string;
                }
            }[],
        }
    }
}


const DiscographyPage = (props: PageProps) => {
    const { data: { records: { nodes } } } = props;
    const records = nodes.map(p => p.frontmatter);
    const cardSize = { width: 150, height: 150 };
    return (
        <Layout>
            <SEO title="唱片集" />
            <div>
                <h1>唱片集</h1>
                <Card.Group itemsPerRow={6} doubling>
                    {records.map(item =>
                        (
                            <Card raised style={cardSize} as={Link} key={item.id} to={item.slug}>
                                <CoverImage key={item.id} coverImage={item.coverImage} />
                                {/* <Label attached='bottom left'>{item.title}</Label> */}
                            </Card>
                        )
                    )}
                </Card.Group>
            </div>
        </Layout>
    )
}
export default DiscographyPage

export const query = graphql`
  {
    records: allMarkdownRemark(filter: {frontmatter: {type: {eq: "record"}}}, sort: {fields: frontmatter___order}) {
      nodes {
        frontmatter {
          coverImage
          id
          title
          slug
        }
      }
    }
  }
`