import { useStaticQuery, graphql } from "gatsby"
import { FluidObject } from "gatsby-image"

interface CoverImageInfo {
  relativePath: string
  name: string
  publicURL: string
  extension: string
  base: string
  image: {
    fluid: FluidObject
    size: FluidObject
  }
}

interface Data {
  coverImages: {
    nodes: CoverImageInfo[]
  }
}

// export const squareImage = graphql`
//   fragment squareImage on File {
//     childImageSharp {
//       fluid(maxWidth: 200, maxHeight: 200) {
//         ...GatsbyImageSharpFluid
//       }
//     }
//   }
// `

export const query = graphql`
  {
    coverImages: allFile(filter: {relativeDirectory: {regex: "/record.+/"}, extension: {in: ["png","jpg"]}}) {
      nodes {
        name
        publicURL
        extension
        base
        image:childImageSharp {
          fluid(maxWidth: 300, maxHeight: 300, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

export const useCoverImagesData = (): CoverImageInfo[] => {
  const data = useStaticQuery<Data>(query)
  return data.coverImages.nodes;
}
