import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Menu } from 'semantic-ui-react'


type Props = {
    siteTitle: string;
};

class MenuTabular extends React.Component<Props> {
    state = { activeItem: 'bio' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu tabular>
                <Menu.Item
                    name='bio'
                    active={activeItem === 'bio'}
                    link={true}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='photos'
                    active={activeItem === 'photos'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}

export default MenuTabular;