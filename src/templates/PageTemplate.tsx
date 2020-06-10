import React, { Component, createRef } from "react"
import { graphql, PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { type } from "os"
import { Button, Grid, Header, Ref, Segment, Rail, Accordion, Menu, Icon, Sticky } from 'semantic-ui-react'
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
      }
      html: string;
      headings: Headings[]
    }
  }
}

const sidebarStyle = {
  background: '#fff',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.1)',
  paddingLeft: '1em',
  paddingBottom: '0.1em',
  paddingTop: '0.1em',
}

class TemplatePage extends Component<TemplateProps> {
  contextRef = createRef()

  renderMenu(headings: Headings[]) {
    if (headings.length == 0) {
      return;
    }

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
      <Rail position='right'>
        <Sticky context={this.contextRef} offset={20}>
          <Menu as={Accordion} fluid style={sidebarStyle} text vertical>
            {h1s.map(h1 => (
              <Menu.Item>
                <Accordion.Title active={true}>
                  <b>{h1.h.value}</b>
                  <Icon name='dropdown' />
                </Accordion.Title>
                <Accordion.Content as={Menu.Menu} active={true}>
                  {h1.child.map(h2 =>
                    (<Menu.Item href={`#${h2.id}`}
                      content={h2.value} active={false}
                    />)
                  )}
                </Accordion.Content>
              </Menu.Item>
            ))
            }
          </Menu>
        </Sticky>
      </Rail >
    )
  }

  render() {
    const { markdownRemark } = this.props.data; // data.markdownRemark holds your post data
    const { frontmatter, html, headings } = markdownRemark
    return (
      <Layout>
        <SEO title="Page two" />
        <Grid container>
          <Ref innerRef={this.contextRef}>
            <Grid.Column width={10}>
              <Header as="h1">{frontmatter.title}</Header>
              {/* <p>{frontmatter.date}</p> */}
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
              {this.renderMenu(headings)}
            </Grid.Column>
          </Ref>
        </Grid>
      </Layout >
    )
  }
}

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
      }
      headings {
        depth
        id
        value
      }
    }
  }
`