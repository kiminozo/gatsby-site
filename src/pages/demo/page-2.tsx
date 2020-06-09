// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link } from "gatsby"
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const SecondPage = (props: PageProps) => (
  <Layout>
    <SEO title="Page two" />
    <Grid container>
      <Grid.Column width={10} style={{ background: '#FF3' }}>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2 ({props.path})</p>
        <Button as={Link} to="/">
          homepage
          </Button>
      </Grid.Column>
      <Grid.Column width={4} style={{ background: '#3FF' }}>
        <div>Hi from the second page</div>
      </Grid.Column>
    </Grid>
  </Layout>
)

export default SecondPage
