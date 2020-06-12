import React, { Component, createRef } from "react"
import { graphql, PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  Button, Grid, Header, Ref, Segment, Rail, Accordion,
  Menu, Icon, Sticky, Visibility, VisibilityEventData, Responsive, Container
} from 'semantic-ui-react'
import _ from "lodash";

// this prop will be injected by the GraphQL query below.
type Headings = {
  depth: number;
  id: string;
  value: string;
}

type Item = {
  h: Headings;
  child: Headings[]
}

type TemplateProps = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        slug: string;
        date: string;
        toc: boolean;
      }
      html: string;
      headings: Headings[]
    }
  }
}

type TemplateState = {
  activeId: string
}

type HeaderInfo = {
  id: string;
  offset: number;
}

const sidebarStyle = {
  background: '#fff',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
  paddingLeft: '1em',
  paddingBottom: '0.1em',
  paddingTop: '0.1em',
}

class TemplatePage extends Component<TemplateProps, TemplateState> {
  contextRef = createRef<HTMLDivElement>()
  headerInfos: HeaderInfo[] = [];

  constructor(props: Readonly<TemplateProps>) {
    super(props);
    this.state = { activeId: "" }
  }

  handleUpdate = (nothing: null, { calculations }: VisibilityEventData) => {
    if (calculations && this.headerInfos.length > 0) {
      let offsetTop = calculations.pixelsPassed;//data.children.toString();
      let id = this.headerInfos[0].id;
      for (const headerInfo of this.headerInfos) {
        if (headerInfo.offset > offsetTop) {
          break;
        }
        id = headerInfo.id;
      }
      this.setState({ activeId: id })
    }
  }

  componentDidMount() {
    const { headings } = this.props.data.markdownRemark;
    headings.forEach(element => {
      let offset = document.getElementById(element.id)?.offsetTop ?? 0;
      this.headerInfos.push({ id: element.id, offset });
    });
  }

  renderMenu(headings: Headings[]) {
    if (headings.length == 0) {
      return;
    }

    const { activeId } = this.state;

    let h1s: Item[] = []
    let h1: Item | null = null;
    headings.forEach(h => {
      if (h.depth === 1) {
        h1 = { h, child: [] };
        h1s.push(h1);
      } else if (h.depth === 2 && h1) {
        (h1 as Item).child.push(h);
      }
    })

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Rail position='right'>
          <Sticky context={this.contextRef} offset={20}>
            <Menu as={Accordion} fluid style={sidebarStyle} text vertical>
              {h1s.map(h1 => (
                <Menu.Item>
                  <Accordion.Title active={true}>
                    {h1.h.id === activeId ? (<b>{h1.h.value}</b>) : h1.h.value}
                  </Accordion.Title>
                  <Accordion.Content as={Menu.Menu} active={true}>
                    {h1.child.map(h2 =>
                      (<Menu.Item href={`#${h2.id}`}
                        content={h2.value} active={h2.id === activeId}
                      />)
                    )}
                  </Accordion.Content>
                </Menu.Item>
              ))
              }
            </Menu>
          </Sticky>
        </Rail>
      </Responsive >
    )
  }

  render() {
    const { markdownRemark } = this.props.data; // data.markdownRemark holds your post data
    const { frontmatter, html, headings } = markdownRemark

    const body = (<Grid container>
      <Ref innerRef={this.contextRef}>
        <Grid.Column width={10} mobile={16} computer={10}>
          <Header as="h1">{frontmatter.title}</Header>
          {/* <p>{frontmatter.date}</p> */}
          <Container text
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {frontmatter.toc && this.renderMenu(headings)}
        </Grid.Column>
      </Ref>
    </Grid>)

    return (
      <Layout>
        <SEO title={frontmatter.title} />
        {frontmatter.toc ?
          (<Visibility onUpdate={this.handleUpdate}>
            {body}
          </Visibility>) :
          body
        }
      </Layout>
    )
  }
}

// class MobileTemplatePage extends Component<TemplateProps, TemplateState> {
//   render() {
//     const { markdownRemark } = this.props.data; // data.markdownRemark holds your post data
//     const { frontmatter, html, headings } = markdownRemark
//     return (
//       <Layout>
//         <SEO title={frontmatter.title} />
//         <Grid container>
//           <Grid.Column width={10}>
//             <Header as="h1">{frontmatter.title}</Header>
//             <div
//               className="blog-post-content"
//               dangerouslySetInnerHTML={{ __html: html }}
//             />
//           </Grid.Column>
//         </Grid>
//       </Layout>
//     )
//   }
// }

export default function Template({ data }: TemplateProps) {
  return (<TemplatePage data={data} />)
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        toc
      }
      headings {
        depth
        id
        value
      }
    }
  }
`