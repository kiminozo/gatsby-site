import React, { Component } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"


import {
    Icon, Grid, Header, Container, Segment, Divider, Responsive,
    Button, Card, Image, Label, Item, List
} from 'semantic-ui-react'
import _ from "lodash";
import demo from "../images/demo.png"

type Props = {
    discographyId: string[];
}
interface Data {
    records: {
        edges: {
            node: {
                frontmatter: {
                    id: string
                    title: string
                    coverImage: string
                    slug: string
                }
            }
        }[]
    }
}

const RecordGroup = (props: Props) => {
    const { discographyId } = props;

    const data = useStaticQuery<Data>(graphql`
      {
        records: allMarkdownRemark(filter: 
          {frontmatter: {type: {eq: "record"}}}) {
          edges {
              node {
               frontmatter {
                id
                title
                coverImage
                slug
              }
            }
          }
         }
      }
    `)
    console.log(data.records.edges.length);
    //return <div></div>
    const list = data.records.edges.filter(p => discographyId.indexOf(p.node.frontmatter.id) >= 0)
        .map(p => p.node.frontmatter);
    return (
        <Card.Group doubling>
            {list.map(item => (
                <Card as={Link} to={item.slug}>
                    <Image
                        src={demo}
                    />
                    <Label attached='bottom left'>{item.title}</Label>
                </Card>
            ))
            }
        </Card.Group >)
}

export default RecordGroup;