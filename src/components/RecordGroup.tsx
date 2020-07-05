import React from "react"
import { Link } from "gatsby"


import { Card, Label } from 'semantic-ui-react'
import _ from "lodash";
import { useRecordsData } from "../hooks/useRecordsData"
import CoverImage from './CoverImage'



type Props = {
    discographyId: string[];
}

const lableStyle = { backgroundColor: '#0003', color: '#fff' }

const RecordGroup = (props: Props) => {
    const { discographyId } = props;

    const records = useRecordsData();

    const list = records.filter(p => discographyId.indexOf(p.id) >= 0);
    return (
        <Card.Group stackable centered >
            {list.map(item => (
                <Card fluid color='teal' as={Link} key={item.id} to={item.slug}>
                    <CoverImage key={item.id} coverimage={item.coverImage} />
                    <Label size="tiny" style={lableStyle} attached='bottom'>{item.title}</Label>
                </Card>

            ))
            }
        </Card.Group >)
}

export default RecordGroup;