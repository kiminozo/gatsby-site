/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require("lodash")


const createPages = async (createPage, graphql, reporter) => {

  const result = await graphql(`
   {
  posts:allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000, filter: {frontmatter: {type: {eq: null}}}) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
  songs:allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000, filter: {frontmatter: {type: {eq: "song"}}}) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
  tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
  }
  categoriesGroup: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___categories) {
      fieldValue
    }
  }
}
`)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const blogPostTemplate = require.resolve(`./src/templates/PageTemplate.tsx`)
  const posts = result.data.posts.edges;
  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })

  const songTemplate = require.resolve(`./src/templates/SongTemplate.tsx`)
  const songs = result.data.songs.edges;
  songs.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: songTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })

  const tagTemplate = require.resolve("./src/templates/TagsTemplate.tsx")
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  const categoryTemplate = require.resolve("./src/templates/CategoriesTemplate.tsx")
  const categories = result.data.categoriesGroup.group;
  // Make tag pages
  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
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

  await createPages(createPage, graphql, reporter);

}

