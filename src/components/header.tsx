import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Menu, Container, Dropdown, Divider, Header as UIHeader, Icon, Image }
  from 'semantic-ui-react'

import "./header.sass"
import styles from "./header.module.sass"
import { menusConfig } from "../menu";

import logo from "../assets/logo.jpg"


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
      <header>

        <Container>
          <UIHeader as="h2" style={{ paddingTop: 10 }}>
            {/* <Icon name='settings' /> */}
            <Image src={logo} size="big" />
            <UIHeader.Content>
              For RITZ
            <UIHeader.Subheader>岡崎律子的非官方中文资料站</UIHeader.Subheader>
            </UIHeader.Content>
          </UIHeader>

        </Container>
        <Menu secondary pointing color="pink" size='large' style={{ marginBottom: 20 }}>
          <Container>
            {
              menus.map(item =>
                (<Menu.Item as={Link}
                  name={item.name}
                  activeClassName='active'
                  link={true}
                  to={item.link}
                />))
            }
          </Container>
        </Menu>
        {/* <Menu inverted pointing size="small" style={{ marginBottom: 20 }}>
          <Container>
            {
              menus.map(item => item.sub ?
                item.sub.map(sub =>
                  (
                    <Menu.Item as={Link}
                      name={sub.name}
                      activeClassName='active'
                      link={true}
                      to={sub.link}
                    />
                  ))
                : (<></>)
              )
              // (
              //   <Dropdown text={item.name} className='link item' >
              //     <Dropdown.Menu>{
              //       item.sub.map(sub => (
              //         <Dropdown.Item as={Link} to={sub.link}>{sub.name}</Dropdown.Item>
              //       ))
              //     }
              //     </Dropdown.Menu>
              //   </Dropdown>
              // )
              // (<Menu.Item as={Link}
              //   name={item.name}
              //   activeClassName='active'
              //   link={true}
              //   to={item.link}
              // />))
            }
          </Container>
        </Menu> */}

      </header>

    );
  }
}

export default Header;
