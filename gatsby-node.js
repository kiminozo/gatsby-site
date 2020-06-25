/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const _ = require("lodash")

// function getId(path) {
//   let pathName = path;
//   const end = pathName.endsWith("/") ? pathName.length - 1 : pathName.length;
//   const start = pathName.substring(0, end).lastIndexOf('/')
//   return pathName.substring(start, end);
// }

const createPages = async (createPage, graphql, reporter) => {

  const result = await graphql(`
   {
  posts:allMarkdownRemark(sort: {order: ASC, fields: [frontmatter___slug]}, limit: 1000, filter: {frontmatter: {type: {eq: null}}}) {
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
  records:allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000, filter: {frontmatter: {type: {eq: "record"}}}) {
    edges {
      node {
        frontmatter {
          id
          slug
        }
      }
    }
  }
  tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
  }
  categoriesGroup: allMarkdownRemark(limit: 2000) {
    group(field: frontmatter___categories) {
      fieldValue
      totalCount
    }
  }
}
`)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const blogPostTemplate = require.resolve(`./src/templates/PostTemplate.tsx`)
  const posts = result.data.posts.edges;
  posts.forEach(({ node }, index, posts) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        previous: index !== 0 ? posts[index - 1].node.frontmatter.slug : null,
        next: index + 1 !== posts.length ? posts[index + 1].node.frontmatter.slug : null,
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

  const recordTemplate = require.resolve(`./src/templates/RecordTemplate.tsx`)
  const records = result.data.records.edges;
  records.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: recordTemplate,
      context: {
        id: node.frontmatter.id
        // additional data can be passed via context
        //slug: node.frontmatter.slug,
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
  // Make categorie pages
  const postsPerPage = 10

  categories.forEach(category => {
    const numPages = Math.ceil(category.totalCount / postsPerPage);
    const path = `/categories/${_.kebabCase(category.fieldValue)}`
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? path : `${path}/${i + 1}`,
        component: categoryTemplate,
        context: {
          category: category.fieldValue,
          limit: postsPerPage,
          skip: i * postsPerPage,
          totalPages: numPages,
          activePage: i + 1
        },
      })
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

