/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


const createBlogPages = async (createPage, graphql, reporter) => {
  const blogPostTemplate = require.resolve(`./src/templates/PageTemplate.tsx`)
  const result = await graphql(`
   {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000, filter: {frontmatter: {slug: {ne: null, regex: "/^(?!\\/songs).+/"}}}) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
}
`)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({
    node
  }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}


const createSongPages = async (createPage, graphql, reporter) => {
  const songTemplate = require.resolve(`./src/templates/SongTemplate.tsx`)
  const result = await graphql(`
{
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000, filter: {frontmatter: {slug: {ne: null, regex: "/(\\/songs).+/"}}}) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
}
`)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({
    node
  }) => {
    createPage({
      path: node.frontmatter.slug,
      component: songTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}



exports.createPages = async ({
  actions,
  graphql,
  reporter
}) => {
  const {
    createPage
  } = actions

  await createBlogPages(createPage, graphql, reporter);
  await createSongPages(createPage, graphql, reporter);
}

