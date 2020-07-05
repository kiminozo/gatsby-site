import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import { useCoverImagesData } from '../hooks/useCoverImagesData'
import demo from "../images/demo.png"
import { Image, ImageProps, SemanticSIZES } from 'semantic-ui-react'
interface Props {
  coverimage: string
  size?: SemanticSIZES
}

const imgStyle = { maxHeight: 200 }



const CoverImage = (props: Props) => {
  const data = useCoverImagesData();
  const { coverimage: coverImage, size } = props;
  const imageInfo = data.filter(p => p.base === coverImage)[0];
  const className: string = "ui image " + (size ? size : "medium");
  if (imageInfo) {
    return imageInfo.image ?
      <Img className={className} fluid={{ ...imageInfo.image.fluid, aspectRatio: 1 }} />
      : <Image size={size} src={imageInfo.publicURL} />
  }
  return <Image size={size} style={imgStyle} src={demo} ></Image>
}

export default CoverImage
