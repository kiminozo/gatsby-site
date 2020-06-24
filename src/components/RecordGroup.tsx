import React, { Component } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"


import {
    Icon, Grid, Header, Container, Segment, Divider, Responsive,
    Button, Card, Image, Label, Item, List
} from 'semantic-ui-react'
import _ from "lodash";
import { useRecordsData } from "../hooks/useRecordsData"

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