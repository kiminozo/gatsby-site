import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Menu, Container, Dropdown } from 'semantic-ui-react'

import "./header.sass"
import styles from "./header.module.sass"
import { menusConfig } from "../menu";

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

  state = ({ activeItem: '' })

  render() {
    const menus = menusConfig;
    const { activeItem } = this.state;

    return (
      <Menu inverted pointing color="blue">
        <Container>
          {
            menus.map(item => item.sub ?
              (
                <Dropdown text={item.name} className='link item' >
                  <Dropdown.Menu>{
                    item.sub.map(sub => (
                      <Dropdown.Item as={Link} to={sub.link}>{sub.name}</Dropdown.Item>
                    ))
                  }
                  </Dropdown.Menu>
                </Dropdown>
              )
              : (<Menu.Item as={Link}
                name={item.name}
                activeClassName='active'
                link={true}
                to={item.link}
              />))
          }
        </Container>
      </Menu>
    );
  }

  //     <Menu inverted pointing color="blue">
  //   <Container>
  //     <Menu.Item as={Link}
  //       name='home'
  //       activeClassName='active'
  //       link={true}
  //       to="/"
  //     />
  //     <Dropdown text='Shopping' className='link item' active={true}>
  //       <Dropdown.Menu>
  //         <Dropdown.Item as={Link} to="/blog/my-first-post/">Home Goods</Dropdown.Item>
  //         <Dropdown.Item as={Link} to="/biography">Bedroom</Dropdown.Item>
  //       </Dropdown.Menu>
  //     </Dropdown>
  //     <Menu.Item as={Link}
  //       name='bio'
  //       activeClassName='active'
  //       link={true}
  //       to="/biography"
  //     />
  //     <Menu.Item as={Link}
  //       name='photos'
  //       activeClassName='active'
  //       link={true}
  //       to="/demo/page-2/"
  //     />
  //     <Menu.Item as={Link}
  //       name='demo'
  //       activeClassName='active'
  //       link={true}
  //       to="/demo/page-5/"
  //     />
  //   </Container>
  // </Menu>

  //     );
  //}
}

export default Header;
