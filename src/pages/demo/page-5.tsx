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
  VisibilityEventData,
  VisibilityCalculations
} from "semantic-ui-react";
import VisibilitySensor from 'react-visibility-sensor'

import { type } from "os";
//import DocsLayout from "src/components/DocsLayout";


const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

type Props = {
};
type State = {
  message: string
  activeKey: string
  idx: number;
  wasEverVisible: boolean
}


export default class StickyExampleAdjacentContext extends Component<Props, State> {
  contextRef = createRef()

  handleUpdate = (nothing: null, { calculations }: VisibilityEventData) => {
    if (calculations) {
      let s = calculations.pixelsPassed.toFixed() + "px";//data.children.toString();
      this.setState({ message: s })
    }
  }


  showIndexList: Set<number> = new Set();
  handleVisibility = (key: number, visible: boolean) => {
    let idxs = this.showIndexList;
    if (visible) {
      idxs.add(key)
    } else {
      idxs.delete(key)
    }
    let array = [...idxs]
    let min = _.min(array) ?? -1;
    let s = JSON.stringify(array);//`key-${min}`
    this.setState({ activeKey: s, idx: min });
  }


  // handleItemUpdate = (key: number, c: VisibilityCalculations) => {
  //   let idxs = this.showIndexs;
  //   let isShown = c.topVisible && c.bottomVisible
  //     || c.topPassed && c.passing && !c.bottomVisible;
  //   if (isShown) {
  //     idxs.add(key)
  //   } else {
  //     idxs.delete(key)
  //   }

  //   let array = [...idxs]
  //   let min = _.min(array) ?? -1;
  //   //let s = JSON.stringify(array);//`key-${min}`
  //   this.setState({ activeKey: `#hd-${min}`, idx: min });
  // }

  state = { message: "", activeKey: "", idx: -1, wasEverVisible: false }

  render() {
    const { message, activeKey, idx, wasEverVisible } = this.state;

    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Ref innerRef={this.contextRef}>
            <Visibility onUpdate={this.handleUpdate}>
              <Segment>

                <div>
                  {_.times(20, (i) => (
                    <React.Fragment>
                      <VisibilitySensor
                        key={i}
                        onChange={(visible: boolean) => this.handleVisibility(i, visible)}>
                        <div id={`id-${i}`}>
                          <Header as="h2" dividing href={`#hd-${i}`} key={i}>{`H1-${i}`}</Header>
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
                      </VisibilitySensor>
                    </React.Fragment>
                  ))}
                </div>


                <Rail position='right'>
                  <Sticky context={this.contextRef}>
                    <p>{message ? message : "null"}</p>
                    <p>{activeKey ? activeKey : "nokey"}</p>

                    <Header as='h3'>Stuck Content</Header>
                    <Menu mini vertical text color="red">
                      {_.times(20, (i) => {
                        let header = `#hd-${i}`;
                        return (<Menu.Item active={idx === i}>H1-{i}</Menu.Item>)
                      }
                      )}
                    </Menu>
                  </Sticky>
                </Rail>
              </Segment>
            </Visibility>
          </Ref>
        </Grid.Column >

      </Grid >
    )
  }
}

//export default Page3;