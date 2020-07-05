import React from "react"
// Utilities
import _ from "lodash"
// Components
import { Link, graphql, PageProps } from "gatsby"
import { SEO, Layout, CoverImage, SideBar } from "../components";
import {
    Card, Divider, Grid, Header
} from 'semantic-ui-react'

interface RecordInfo {
    coverImage: string;
    id: string;
    title: string;
    slug: string;
    artist: string
    categories: string[]
}

interface ContextProps {
    pageContext: {
        category: string
    }
}

interface TemplateProps {
    title: string;
    path: string;
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
    single?: boolean;
    category: string;
    artists: {
        artist: string;
        records: RecordInfo[];
    }[]
}

const Records = ({ single, category, artists }: RecordsProp) => (
    <>
        {!single &&
            <Header as='h2'>
                {artists.length == 1 ?
                    <Link to={`/discography/${_.kebabCase(category)}/`}>{category}</Link>
                    : <>{category}</>
                }
            </Header>
        }
        {
            artists.map(({ artist, records }) => (
                <>
                    {artists.length > 1 && (
                        <Header as={single ? 'h2' : "h3"}>
                            <Link to={`/discography/${_.kebabCase(artist)}/`}>{artist}</Link>
                        </Header>
                    )}
                    <Card.Group fluid itemsPerRow={5} doubling>
                        {records.map(item =>
                            (
                                <Card as={Link} key={item.id} to={item.slug}>
                                    <CoverImage key={item.id} coverimage={item.coverImage} />
                                </Card>
                            )
                        )}
                    </Card.Group>
                </>
            ))
        }
    </>
)

const DiscographyTemplate = (props: TemplateProps) => {
    const { title, path, data: { records: { nodes } } } = props;
    const records = nodes.map(p => p.frontmatter);

    const group = _.groupBy(records, p => p.categories[0]);
    const groupArtist = (records: RecordInfo[]) => {
        const g = _.groupBy(records, p => p.artist);
        return _.map(g, (value, key) => ({ artist: key, records: value }))
    }
    const categories = _.map(group, (value, key) => ({ category: key, artists: groupArtist(value) }));
    return (
        <Layout path={path}>
            <SEO title={title} />
            <Grid>
                <Grid.Column mobile={16} computer={13} tablet={14}>
                    <h1>{title}</h1>
                    <Divider />
                    {
                        categories.length == 1 ?
                            <Records single {...categories[0]} />
                            : categories.map(props => (
                                <Records {...props} />
                            ))
                    }
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

//export { DiscographyTemplate, TemplateProps };
export default function Template(props: TemplateProps & ContextProps) {
    const category = props.pageContext.category;
    const path = `/discography/${_.kebabCase(category)}/`
    return (<DiscographyTemplate {...props} path={path} title={category} />)
}

export const query = graphql`
  query ($category: String) {
    records: allMarkdownRemark(filter: {frontmatter: {type: {eq: "record"}, categories: {glob: $category}}}, sort: {fields: frontmatter___order}) {
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
