import React, { Component, createRef } from "react";
import { PageProps, Link } from "gatsby"
import lodash from "lodash";
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
import { type } from "os";
//import DocsLayout from "src/components/DocsLayout";


const Placeholder = () => <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

type Props = {
};
type State = {
  message: string
  activeKey: string
  idx: number;
}


export default class StickyExampleAdjacentContext extends Component<Props, State> {
  contextRef = createRef()

  handleUpdate = (nothing: null, { calculations }: VisibilityEventData) => {
    if (calculations) {
      let s = calculations.pixelsPassed.toFixed() + "px";//data.children.toString();
      this.setState({ message: s })
    }
  }

  showIndexs: Set<number> = new Set();

  handleItemUpdate = (key: number, c: VisibilityCalculations) => {
    let idxs = this.showIndexs;
    let isShown = c.topVisible && c.bottomVisible
      || c.topPassed && c.passing && !c.bottomVisible;
    if (isShown) {
      idxs.add(key)
    } else {
      idxs.delete(key)
    }

    let array = [...idxs]
    let min = lodash.min(array) ?? -1;
    //let s = JSON.stringify(array);//`key-${min}`
    this.setState({ activeKey: `#hd-${min}`, idx: min });
  }

  state = { message: "", activeKey: "", idx: -1 }

  render() {
    const { message, activeKey, idx } = this.state;

    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Ref innerRef={this.contextRef}>
            <Visibility onUpdate={this.handleUpdate}>
              <Segment>
                <div>
                  {lodash.times(20, (i) => (
                    <React.Fragment>
                      <Visibility
                        onUpdate={(nothing: null, { calculations }: VisibilityEventData) =>
                          this.handleItemUpdate(i, calculations)}
                      >
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
                      </Visibility>
                    </React.Fragment>
                  ))}
                </div>
                <Rail position='right'>
                  <Sticky context={this.contextRef}>
                    <p>{message ? message : "null"}</p>
                    <p>{activeKey ? activeKey : "nokey"}</p>

                    <Header as='h3'>Stuck Content</Header>
                    <Menu pointing vertical text>
                      {lodash.times(20, (i) => {
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