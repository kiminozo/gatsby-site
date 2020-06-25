import { Link, PageProps, useStaticQuery, graphql } from "gatsby"
import React from "react"
import { Menu, Container, Dropdown, Divider, Header as UIHeader, Icon, Image }
  from 'semantic-ui-react'

import "./header.sass"
import styles from "./header.module.sass"
import { menusConfig, MenuConfig } from "../menu";
import { WindowLocation } from "@reach/router"

import logo from "../assets/logo.jpg"
import _ from "lodash";


type Props = {
  siteTitle: string;
  pathName: string
};
// type State = {
//   activeItem: string;
// }
function getPath(pathName: string) {
  const start = pathName.startsWith("/") ? 1 : 0;
  const end = pathName.endsWith("/") ? pathName.length - 1 : pathName.length;
  const path = pathName.substring(start, end);
  return path;
}

function isActive(item: MenuConfig, pathName: string): boolean {
  const path = getPath(pathName);
  const dir = path.split("/")[0];
  const part = (array: string[] | undefined): boolean => array ?
    _.findIndex(array, x => x === dir) >= 0 : false;

  //console.log("dir:" + dir);
  //console.log(pathName);
  // console.log("getPath:" + getPath("/categories/rain-or-shine"));

  // console.log(path === getPath("/categories/rain-or-shine"));

  if (item.sub) {
    return _.findIndex(item.sub, p => getPath(p.link) === path) >= 0
      || _.findIndex(item.sub, p => part(p.active)) >= 0
  }
  return item.link === pathName
    || getPath(item.link) === dir
    || part(item.active);
}

class Header extends React.Component<Props> {
  static defaultProps = {
    siteTitle: ''
  };

  // state = ({ activeItem: '' })

  render() {
    const menus = menusConfig;
    const { pathName } = this.props;
    // const { activeItem } = this.state;

    return (
      <header>
        {/* <h6>path:{pathName}</h6> */}
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
        <Menu secondary pointing color="pink" size='large'>
          <Container>
            {menus.map(item => item.sub ?
              (
                <Dropdown
                  text={item.name}
                  key={item.name}
                  className={`link item ${isActive(item, pathName) ? 'active' : undefined}`}>
                  <Dropdown.Menu>{
                    item.sub.map(sub => (
                      <Dropdown.Item as={Link} key={sub.name} to={sub.link}>{sub.name}</Dropdown.Item>
                    ))
                  }
                  </Dropdown.Menu>
                </Dropdown>
              )
              :
              (<Menu.Item as={Link}
                key={item.name}
                name={item.name}
                active={isActive(item, pathName)}
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

// const HeaderHook = () => {
//   const data = useStaticQuery(graphql`
//     query {
//         sitePage {
//             path
//         }       
//     }
//   `)

//   return <Header path={data.sitePage.path} />
// }

export default Header;
