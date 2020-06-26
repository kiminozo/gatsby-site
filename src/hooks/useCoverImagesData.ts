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
  }
}

interface Data {
  coverImages: {
    nodes: CoverImageInfo[]
  }
}


export const query = graphql`
  {
    coverImages: allFile(filter: {relativeDirectory: {regex: "/record.+/"}}) {
      nodes {
        name
        publicURL
        extension
        base
        image:childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
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
