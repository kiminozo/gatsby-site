import React from "react"
// Utilities
import _ from "lodash"
// Components
import { Link, graphql, PageProps } from "gatsby"
import { SEO, Layout, CoverImage, SideBar } from "../components";
import {
    Card, Divider, Grid
} from 'semantic-ui-react'

interface RecordInfo {
    coverImage: string;
    id: string;
    title: string;
    slug: string;
    artist: string
    categories: string[]
}

interface Props extends PageProps {
    data: {
        records: {
            nodes: {
                frontmatter: RecordInfo
            }[],
        }
    }
}

//const cardSize = { width: 150, height: 150 };


const DiscographyPage = (props: Props) => {
    const { data: { records: { nodes } } } = props;
    const records = nodes.map(p => p.frontmatter);

    const group = _.groupBy(records, p => p.categories[0]);
    const categories = _.map(group, (value, key) => ({ category: key, records: value }));
    return (
        <Layout path={props.location.pathname}>
            <SEO title="唱片集" />
            <Grid>
                <Grid.Column mobile={16} computer={13} tablet={14}>
                    <h1>唱片集</h1>
                    <Divider />
                    {
                        categories.map(({ category, records }) => (
                            <>
                                <h2>{category}</h2>
                                <Card.Group itemsPerRow={5} doubling>
                                    {records.map(item =>
                                        (
                                            <Card as={Link} key={item.id} to={item.slug}>
                                                <CoverImage key={item.id} coverImage={item.coverImage} />
                                                {/* <Label attached='bottom left'>{item.title}</Label> */}
                                            </Card>
                                        )
                                    )}
                                </Card.Group>
                            </>
                        ))
                    }
                </Grid.Column>
            </Grid>
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
          artist
          categories
        }
      }
    }
  }
`