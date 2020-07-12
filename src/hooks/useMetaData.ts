import { useStaticQuery, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase";

interface Meta {
    id: string
    title: string
}
interface MetaData {
    metas: {
        nodes: {
            frontmatter: Meta
        }[]
    }
}

export const getMetaId = (title: string) => useMetaData()
    .filter(p => p.title === title)
    .map(p => p.id)[0] || kebabCase(title);

export const useMetaData = (): Meta[] => {
    const data = useStaticQuery<MetaData>(graphql`
      {
        metas: allMarkdownRemark(filter: 
          {
              frontmatter: {type: {eq: "meta"}}}) {
              nodes{
               frontmatter {
                id
                title
              }
          }
         }
      }
    `)
    return data.metas.nodes.map(p => p.frontmatter);
}
