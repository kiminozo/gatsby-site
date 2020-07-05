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
interface RecordsProp {
    category: string;
    artists: {
        artist: string;
        records: RecordInfo[];
    }[]
}

const Records = ({ category, artists }: RecordsProp) => (
    <>
        <h2>{
            artists.length == 1 ?
                <Link to={`/discography/${_.kebabCase(category)}/`}>{category}</Link>
                : <>{category}</>
        }
        </h2>
        {
            artists.map(({ artist, records }) => (
                <>
                    {artists.length > 1 && (
                        <h3><Link to={`/discography/${_.kebabCase(artist)}/`}>{artist}</Link></h3>
                    )}
                    <Card.Group fluid itemsPerRow={5} doubling>
                        {records.map(item =>
                            (
                                <Card as={Link} key={item.id} to={item.slug}>
                                    <CoverImage key={item.id} coverImage={item.coverImage} />
                                </Card>
                            )
                        )}
                    </Card.Group>
                </>
            ))
        }
    </>
)

const DiscographyPage = (props: Props) => {
    const { data: { records: { nodes } } } = props;
    const records = nodes.map(p => p.frontmatter);

    const group = _.groupBy(records, p => p.categories[0]);
    const groupArtist = (records: RecordInfo[]) => {
        const g = _.groupBy(records, p => p.artist);
        return _.map(g, (value, key) => ({ artist: key, records: value }))
    }
    const categories = _.map(group, (value, key) => ({ category: key, artists: groupArtist(value) }));
    return (
        <Layout path={props.location.pathname}>
            <SEO title="唱片集" />
            <Grid>
                <Grid.Column mobile={16} computer={13} tablet={14}>
                    <h1>唱片集</h1>
                    <Divider />
                    {
                        categories.map(props => (
                            <Records {...props} />
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