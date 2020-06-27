import { Link } from "gatsby"
import React from "react"
import { Menu, Container, Divider, Segment, Grid, List, Header } from 'semantic-ui-react'

import "./footer.sass"

//Build with GatsbyJS and React 16.12.0. Hosted on V
//The code is open source and available at 
//Copyright ©forritz Theme by kiminozo

const Footer = () => (
    <>
        <Divider />

        {/* <Container textAlign="center" style={{ height: 48 }}>
            © 2006-{new Date().getFullYear()},
            <a href="https://forritz.org">For RITZ</a>
            {` `}All rights reserved.
         </Container> */}

        <Segment as="footer" vertical style={{ padding: 10 }}>
            <Container>
                <Grid divided stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header as='h4' content='About' />
                            <List link >
                                <List.Item as='a'>Sitemap</List.Item>
                                <List.Item as='a'>Contact Us</List.Item>
                                <List.Item as='a'>Religious Ceremonies</List.Item>
                                <List.Item as='a'>Gazebo Plans</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header as='h4' content='Services' />
                            <List link >
                                <List.Item as='a'>Banana Pre-Order</List.Item>
                                <List.Item as='a'>DNA FAQ</List.Item>
                                <List.Item as='a'>How To Access</List.Item>
                                <List.Item as='a'>Favorite X-Men</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as='h4' >
                                Footer Header
                             </Header>
                            <p>
                                © 2006-{new Date().getFullYear()},
                                 <Link to="/">For RITZ</Link>
                                {` `}All rights reserved.
                           </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </>
)

export default Footer
