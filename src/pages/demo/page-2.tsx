// Gatsby supports TypeScript natively!
import React, { Component, createRef } from "react"
import { PageProps, Link } from "gatsby"
import { Button, Grid, Header, Ref, Segment, Rail, Accordion, Menu, Icon } from 'semantic-ui-react'

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import _ from "lodash";

const sidebarStyle = {
  background: '#fff',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
  paddingLeft: '1em',
  paddingBottom: '0.1em',
  paddingTop: '0.1em',
}

export default class SecondPage extends Component<PageProps> {
  contextRef = createRef()

  renderMenu() {
    return (
      <Rail position='right'>
        <Segment context={this.contextRef}>
          <Menu as={Accordion} fluid style={sidebarStyle} text vertical>
            {_.times(3, (i) => (
              <Menu.Item>
                <Accordion.Title active={true}>
                  <b>sectionName</b>
                  <Icon name='dropdown' />
                </Accordion.Title>
                <Accordion.Content as={Menu.Menu} active={true}>
                  {_.times(5, (j) => (
                    <Menu.Item
                      content="title" active={i == 2 && j == 2}
                    />
                  ))}
                </Accordion.Content>
              </Menu.Item>
            ))
            }
          </Menu>
        </Segment>
      </Rail>
    )
  }

  render() {
    const props = this.props;

    return (
      <Layout>
        <SEO title="Page two" />
        <Grid container>
          <Grid.Column width={10} style={{ background: '#FF3' }}>
            <Ref innerRef={this.contextRef}>
              <Segment>
                <>
                  <h1>Hi from the second page</h1>
                  <p>Welcome to page 2 ({props.path})</p>
                  <Button as={Link} to="/">
                    homepage
                  </Button>
                </>
                {this.renderMenu()}
              </Segment>
            </Ref>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

