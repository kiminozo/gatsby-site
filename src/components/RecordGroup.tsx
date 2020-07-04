import React, { Component } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"


import {
    Icon, Grid, Header, Container, Segment, Divider, Responsive,
    Button, Card, Image, Label, Item, List
} from 'semantic-ui-react'
import _ from "lodash";
import { useRecordsData } from "../hooks/useRecordsData"
import CoverImage from './CoverImage'


import demo from "../images/demo.png"

type Props = {
    discographyId: string[];
}


const RecordGroup = (props: Props) => {
    const { discographyId } = props;

    const records = useRecordsData();

    //return <div></div>
    const list = records.filter(p => discographyId.indexOf(p.id) >= 0);
    return (
        <Card.Group doubling centered>
            {list.map(item => (
                <Card fluid color='teal' as={Link} key={item.id} to={item.slug}>
                    {/* <CoverImage key={item.id} coverImage={item.coverImage} />
                    {/* <Label attached='bottom left' color='black'>{item.title}</Label> */}
                    <CoverImage key={item.id} coverImage={item.coverImage} />
                    {/* <Card.Content>
                        <Card.Meta>{item.title}</Card.v>
                    </Card.Content> */}
                </Card>
            ))
            }
        </Card.Group >)
}

export default RecordGroup;