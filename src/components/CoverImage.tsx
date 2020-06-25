import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useCoverImagesData } from '../hooks/useCoverImagesData'
import demo from "../images/demo.png"
import { Image } from 'semantic-ui-react'
interface Props {
  coverImage: string
}

const CoverImage = ({ coverImage }: Props) => {
  const data = useCoverImagesData();
  const imageInfo = data.filter(p => p.base === coverImage)[0];
  console.log(imageInfo);
  if (imageInfo) {
    return imageInfo.image ?
      <Img fluid={imageInfo.image.fluid} />
      : <Image src={imageInfo.publicURL} ></Image>
  }
  return <Image src={demo} ></Image>
}

export default CoverImage
