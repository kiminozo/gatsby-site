import React, { Component } from "react"
import { Link } from "gatsby"
import {
    Label, Icon,
} from 'semantic-ui-react'
import kebabCase from "lodash/kebabCase"

type Props = {
    categories?: string[];
    tags?: string[];
}

export default class TagsLine extends Component<Props> {
    render() {
        const { categories, tags } = this.props;
        return (
            <Label.Group >
                {
                    categories &&
                    categories.map(category =>
                        (<Label as={Link} color='teal' to={`/categories/${kebabCase(category)}/`} >
                            <Icon name='bookmark' />{category}
                        </Label>)
                    )
                }
                {
                    tags &&
                    tags.map(tag =>
                        (<Label as={Link} to={`/tags/${kebabCase(tag)}/`}>{tag}</Label>)
                    )
                }
            </Label.Group>
        );
    }
}

