import React from "react"
import { Link } from "gatsby"
import { Card, Icon, Image, Button } from 'semantic-ui-react'

import SEO from "../components/seo"
import Layout from "../components/layout";

import logo from "../images/avatar/ritz.jpg"

const CardExampleCard = () => (
  <Card raised style={{ width: 200, height: 540 }}>
    <Image src={logo} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card >
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CardExampleCard />
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Button as={Link} to="/demo/page-2/">
      Go to page 2
    </Button>
    <Button as={Link} to="/demo/page-3/">
      Go to page 3
    </Button>
    <Button as={Link} to="/demo/page-4/">
      Go to page 4
    </Button>
    <Button as={Link} to="/demo/page-5/">
      Go to page 5
    </Button>
    <Link to="/blog/my-first-post/">Go to my first Markdown blog post</Link>
  </Layout>
)

export default IndexPage
