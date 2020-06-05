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
  Ref,
  Image
} from "semantic-ui-react";


const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />



export default class StickyExampleAdjacentContext extends Component {
  contextRef = createRef()

  render() {
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Ref innerRef={this.contextRef}>
            <Segment>
              {_.times(20, (i) => (
                <div id={`id-${i}`}>
                  <Header as="h2" dividing>H1-{i}</Header>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem
                    malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
                    commodo, tortor mauris condimentum nibh, ut fermentum massa.
                  </p>
                  <p>
                    Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem
                    malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus
                    commodo, tortor mauris condimentum nibh, ut fermentum massa.
                  </p>
                </div>
              ))}
              <Rail position='right'>
                <Sticky context={this.contextRef}>
                  <Header as='h3'>Stuck Content</Header>
                  <Menu pointing vertical text>
                    {_.times(20, (i) => (
                      <Menu.Item >H1-{i}</Menu.Item>
                    ))}
                  </Menu>
                </Sticky>
              </Rail>
            </Segment>
          </Ref>

        </Grid.Column>

      </Grid>
    )
  }
}

//export default Page3;