import React, { Component, createRef } from "react";
import { PageProps, Link } from "gatsby"
import _ from "lodash";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Menu,
  Segment,
  Sticky,
  Rail,
} from "semantic-ui-react";



class Page3 extends Component {
  contextRef = createRef()


  render() {
    return (
      <div>
        <Menu borderless inverted pointing color="blue">
          <Container>
            <Menu.Item header active>
              Home
            </Menu.Item>
            <Menu.Item>New feature</Menu.Item>
            <Menu.Item>Press</Menu.Item>
            <Menu.Item>New hires</Menu.Item>
            <Menu.Item>About</Menu.Item>
          </Container>
        </Menu>
        <Grid container stackable>
          <Grid.Row>
            <Segment basic>
              <Header as="h1" size="huge">
                <Header.Content>The Semantic-UI Blog</Header.Content>
                <Header.Subheader>
                  A simple example of creating a blog with Semantic-UI.
                </Header.Subheader>
              </Header>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
              <Header size="large" as="h2">
                <Header.Content>Sample blog post</Header.Content>
                <Header.Subheader>
                  March 6, 2017 by <a href="#root">Jack</a>
                </Header.Subheader>
              </Header>
              <Divider hidden />
              <p>
                This blog post shows a few different types of content that's
                supported and styled with Semantic-UI. Basic typesetting, list,
                and code are all supported.
              </p>
              <Divider />
              <p>
                Cum sociis natoque penatibus et magnis{" "}
                <a href="#root">dis parturient montes</a>, nascetur ridiculus
                mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
                venenatis vestibulum. Sed posuere consectetur est at lobortis.
                Cras mattis consectetur purus sit amet fermentum.
              </p>
              <blockquote>
                Curabitur blandit tempus porttitor. Nullam quis risus eget urna
                mollis ornare vel eu leo. Nullam id dolor id nibh ultricies
                vehicula ut id elit.
              </blockquote>
              <p>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis
                consectetur purus sit amet fermentum. Aenean lacinia bibendum
                nulla sed consectetur.
              </p>
              <Header as="h3" size="large">
                Heading
              </Header>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <Header as="h3" size="medium">
                Sub-heading
              </Header>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
              </p>
              <Segment secondary>
                <code>Example code block</code>
              </Segment>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem
                malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
                commodo, tortor mauris condimentum nibh, ut fermentum massa.
              </p>
              <Header size="medium">Sub-heading</Header>
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean lacinia bibendum nulla sed
                consectetur. Etiam porta sem malesuada magna mollis euismod.
                Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
              <ul>
                <li>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et.
                </li>
                <li>Donec id elit non mi porta gravida at eget metus.</li>
                <li>Nulla vitae elit libero, a pharetra augue.</li>
              </ul>
              <p>
                Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae
                elit libero, a pharetra augue.
              </p>
              <ol>
                <li>Vestibulum id ligula porta felis euismod semper.</li>
                <li>
                  Cum sociis natoque penatibus et magnis dis parturient montes,
                  nascetur ridiculus mus.
                </li>
                <li>
                  Maecenas sed diam eget risus varius blandit sit amet non
                  magna.
                </li>
              </ol>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Sed posuere
                consectetur est at lobortis.
              </p>
              <Divider hidden />
              <Header size="large" as="h2">
                <Header.Content>Another blog post</Header.Content>
                <Header.Subheader>
                  April 1, 2027 by <a href="#root">Mac</a>
                </Header.Subheader>
              </Header>
              <Divider hidden />
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare
                sem lacinia quam venenatis vestibulum. Sed posuere consectetur
                est at lobortis. Cras mattis consectetur purus sit amet
                fermentum.
              </p>
              <blockquote>
                Curabitur blandit tempus porttitor. Nullam quis risus eget urna
                mollis ornare vel eu leo. Nullam id dolor id nibh ultricies
                vehicula ut id elit.
              </blockquote>
              <p>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis
                consectetur purus sit amet fermentum. Aenean lacinia bibendum
                nulla sed consectetur.
              </p>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <Divider hidden />
              <Header size="large" as="h2">
                <Header.Content>New feature</Header.Content>
                <Header.Subheader>
                  Autumn 13, 2019 by <a href="#root">Semantic</a>
                </Header.Subheader>
              </Header>
              <Divider hidden />
              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare
                sem lacinia quam venenatis vestibulum. Sed posuere consectetur
                est at lobortis. Cras mattis consectetur purus sit amet
                fermentum.
              </p>
              <ul>
                <li>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur et.
                </li>
                <li>Donec id elit non mi porta gravida at eget metus.</li>
                <li>Nulla vitae elit libero, a pharetra augue.</li>
              </ul>
              <p>
                Etiam porta sem malesuada magna mollis euismod. Cras mattis
                consectetur purus sit amet fermentum. Aenean lacinia bibendum
                nulla sed consectetur.
              </p>
              <p>
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor. Duis mollis, est non commodo luctus, nisi erat porttitor
                ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <Divider hidden />
              <Button basic circular size="huge">
                <a href="#root">Previous</a>
              </Button>{" "}
              <Button basic circular size="huge">
                <a href="#root">Next</a>
              </Button>
              <Divider hidden />
            </Grid.Column>
            <Grid.Column width={3}>
              <Rail position='right'>
                <Sticky context={this.contextRef}>
                  <Menu vertical accordion fluid>
                    <Menu.Item >Septempber 2017</Menu.Item>
                    <Menu.Item >August 2017</Menu.Item>
                    <Menu.Item >Heading</Menu.Item>
                    <Menu.Item >April 2017</Menu.Item>
                    <Menu.Item >March 2017</Menu.Item>
                    <Menu.Item >February 2017</Menu.Item>
                    <Menu.Item >January 2017</Menu.Item>
                    <Menu.Item >December 2016</Menu.Item>
                    <Menu.Item >October 2016</Menu.Item>
                    <Menu.Item >July 2016</Menu.Item>
                    <Menu.Item >July 2016</Menu.Item>
                    <Menu.Item >May 2016</Menu.Item>
                    <Menu.Item >April 2016</Menu.Item>
                    <Menu.Item >January 2016</Menu.Item>
                    <Menu.Item >May 2015</Menu.Item>
                  </Menu>
                </Sticky>
                <Header as="h4">Elsewhere</Header>
                <List>
                  <List.Item as="a">Github</List.Item>
                  <List.Item as="a">Twitter</List.Item>
                  <List.Item as="a">Facebook</List.Item>
                </List>
              </Rail>

            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Segment secondary as="footer">
          <Container textAlign="center">
            <p>
              Blog template built for Semantic-UI by{" "}
              <a href="https://semantic-ui-forest.com">@Semantic-UI-Forest</a>.
            </p>
            <a href="#root">Back to top</a>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Page3;