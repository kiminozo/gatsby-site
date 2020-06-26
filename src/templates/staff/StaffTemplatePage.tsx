import React, { Component } from "react"
// Components
import { Link, graphql } from "gatsby"
import { SEO, Layout } from "../../components";
import StaffList, { StaffInfo } from '../../components/StaffList'
import { List } from "semantic-ui-react";


export interface TemplateProps {
    title: string
    pageContext: {
        staff: string;
    }
    data: {
        songs: {
            totalCount: number
            nodes: {
                song: StaffInfo & {
                    slug: string
                    title: string
                }
            }[]
        }
    }
};

export class StaffTemplatePage extends Component<TemplateProps> {
    render() {
        const { title,
            pageContext: { staff },
            data: { songs: { nodes, totalCount } } } = this.props;

        // const staffHeader = `${totalCount} post${
        //     totalCount === 1 ? "" : "s"
        //     } tagged with "${staff}"`
        return (
            <Layout>
                <SEO title={title} />
                <h1>{title}</h1>
                <h1>曲目列表</h1>
                <List divided relaxed>
                    {nodes.map(({ song }) =>
                        (
                            <List.Item >
                                <List.Icon name="music" size="large" color='blue' />
                                <List.Content>
                                    <List.Header as="h3">
                                        <Link to={song.slug}>{song.title}</Link>
                                    </List.Header>
                                    <List.Description>
                                        <StaffList staff={song} />
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        ))
                    }
                </List>
            </Layout>
        )
    }
}