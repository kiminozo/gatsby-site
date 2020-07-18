import React from "react"
import { Link } from "gatsby"
import {
    Label, Icon,
} from 'semantic-ui-react'
import kebabCase from "lodash/kebabCase"
import { getMetaId } from "../hooks/useMetaData";

interface Props {
    categories?: string[];
    tags?: string[];
}

const TagsLine = ({ categories, tags }: Props) => (
    <Label.Group >
        {
            categories &&
            categories.map(category =>
                (<Label as={Link} key={category} color='teal' to={`/category/${getMetaId(category)}/`} >
                    <Icon name='bookmark' />{category}
                </Label>)
            )
        }
        {
            tags &&
            tags.map(tag =>
                (<Label as={Link} key={tag} to={`/tags/${kebabCase(tag)}/`}>{tag}</Label>)
            )
        }
    </Label.Group>
);

export default TagsLine;