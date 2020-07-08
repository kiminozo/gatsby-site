import React, { Component } from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql, navigate } from "gatsby"
import { SEO, Layout, SideBar, TagsLine } from "../components";
import kebabCase from "lodash/kebabCase"
import { Pagination, Grid, Header, List, Divider, Segment, Label } from "semantic-ui-react";

type CategoriesEdge = {
    node: {
        frontmatter: {
            slug: string;
            title: string
        }
    }
}

interface TemplateProps {
    pageContext: {
        category: string;
        basePath: string;
        activePage: number;
        totalPages: number;
    }
    data: {
        allMarkdownRemark: {
            totalCount: number;
            nodes: {
                frontmatter: {
                    slug: string;
                    title: string;
                    categories: string[];
                    tags: string[];
                }
                excerpt: string;
            }[]
        }
    }
};

function getPath(basePath: string, activePage: string | number | undefined) {
    const path = (activePage === 1 || activePage === "1")
        ? basePath : basePath + "/" + activePage;
    return path;
}

const CategoriesTemplatePage = (props: TemplateProps) => {
    const {
        pageContext: { category, basePath, activePage, totalPages },
        data: { allMarkdownRemark: { totalCount, nodes } }
    } = props;
    return (
        <Layout path={getPath(basePath, 1)}>
            <SEO title={category} />

            <Grid container stackable>
                <Grid.Column mobile={16} computer={11} tablet={11}>
                    <Header as="h1" >
                        {category}
                        <Label color='teal'>{totalCount}</Label>
                    </Header>
                    <Divider />




                    <Header as="h2" >文章列表</Header>
                    <Divider hidden />

                    {
                        nodes.map(({ frontmatter: { slug, title, categories, tags }, excerpt }) => (
                            <React.Fragment key={slug}>
                                <Header as="h3" size='medium'>
                                    <Header.Content><Link to={slug}>{title}</Link></Header.Content>
                                </Header>

                                <p>{excerpt}</p>
                                <TagsLine categories={[]} tags={tags} />

                                <Divider hidden />
                                <Divider hidden />
                            </React.Fragment>
                        ))
                    }

                    {totalPages > 1 &&
                        (
                            <>
                                <Divider />
                                <Pagination
                                    onPageChange={(e, { activePage }) => { navigate(getPath(basePath, activePage)) }}
                                    firstItem={null}
                                    lastItem={null}
                                    prevItem={activePage === 1 ? null : undefined}
                                    nextItem={activePage === totalPages ? null : undefined}
                                    activePage={activePage}
                                    totalPages={totalPages} />
                            </>
                        )
                    }

                    {/* <Link to="/categories">All Categories</Link> */}
                </Grid.Column>
                <Grid.Column mobile={16} computer={5} tablet={5} >
                    <SideBar />
                </Grid.Column>
            </Grid>
        </Layout>
    )
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
    nodes {
      frontmatter {
        slug
        title
        categories
        tags
      }
      excerpt(truncate: true)
    }
    }
}
`