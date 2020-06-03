import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Menu } from 'semantic-ui-react'

//import "./header.sass"
import styles from "./header.module.sass"
import { throws } from "assert"


type Props = {
  siteTitle: string;
};
type State = {
  activeItem: string;
}

class Header extends React.Component<Props, State> {
  static defaultProps = {
    siteTitle: ''
  };

  state = ({ activeItem: 'bio' })

  //onMenuClick = (_: any, { name: string }) => { }

  render() {
    const { activeItem } = this.state;

    return (<header className={styles.container}>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <Menu tabular>
          <Menu.Item as={Link}
            name='home'
            activeClassName='active'
            link={true}
            to="/"
          />
          <Menu.Item as={Link}
            name='bio'
            activeClassName='active'
            link={true}
            to="/biography"
          />
          <Menu.Item as={Link}
            name='photos'
            activeClassName='active'
            link={true}
            to="/page-2/"
          />
        </Menu>
      </div>
    </header >);
  }
}

export default Header;
