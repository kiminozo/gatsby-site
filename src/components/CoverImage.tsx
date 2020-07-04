import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import { useCoverImagesData } from '../hooks/useCoverImagesData'
import demo from "../images/demo.png"
import { Image, ImageProps } from 'semantic-ui-react'
interface Props extends ImageProps {
  coverImage: string
}

const imgStyle = { maxHeight: 200 }



const CoverImage = (props: Props) => {
  const data = useCoverImagesData();
  const { coverImage } = props;
  const imageInfo = data.filter(p => p.base === coverImage)[0];
  //console.log(imageInfo);
  if (imageInfo) {
    return imageInfo.image ?
      <Image {...props}>
        <Img fluid={{ ...imageInfo.image.fluid, aspectRatio: 1 }} />
      </Image>
      : <Image src={imageInfo.publicURL} />
  }
  return <Image style={imgStyle} src={demo} ></Image>
}

export default CoverImage
