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
  Image,
  Visibility,
  VisibilityEventData
} from "semantic-ui-react";
import { type } from "os";
//import DocsLayout from "src/components/DocsLayout";


const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

type Props = {
};
type State = {
  message: string
}

export default class StickyExampleAdjacentContext extends Component<Props, State> {
  contextRef = createRef()

  handleUpdate = (nothing: null, { calculations }: VisibilityEventData) => {
    if (calculations) {
      let s = calculations.pixelsPassed.toFixed() + "px";//data.children.toString();
      this.setState({ message: s })
    }
  }

  state = { message: "" }

  render() {
    const { message } = this.state;

    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Ref innerRef={this.contextRef}>
            <Visibility onUpdate={this.handleUpdate}>
              <Segment>
                <div>
                  {_.times(20, (i) => (
                    <React.Fragment>
                      <div id={`id-${i}`}>
                        <Header as="h2" dividing key={i}>{`H1-${i}`}</Header>
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
                    </React.Fragment>
                  ))}
                </div>
                <Rail position='right'>
                  <Sticky context={this.contextRef}>
                    <p>{message ? message : "null"}</p>
                    <Header as='h3'>Stuck Content</Header>
                    <Menu pointing vertical text>
                      {_.times(20, (i) => (
                        <Menu.Item >H1-{i}</Menu.Item>
                      ))}
                    </Menu>
                  </Sticky>
                </Rail>
              </Segment>
            </Visibility>
          </Ref>
        </Grid.Column>

      </Grid>
    )
  }
}

//export default Page3;