import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Img = ({ filename, alt, className }) => {
  const { allFile } = useStaticQuery(
    graphql`
      query Image {
        allFile(filter: { sourceInstanceName: { eq: "assets" } }) {
          edges {
            node {
              name
              relativePath
              sourceInstanceName
              childImageSharp {
                gatsbyImageData(formats: [AUTO, WEBP])
              }
            }
          }
        }
      }
    `
  );
  const img = allFile.edges.find((edge) => {
    return edge.node.relativePath.includes(filename);
  });

  return (
    <GatsbyImage
      image={getImage(img.node.childImageSharp)}
      alt={alt}
      layout="fullWidth"
      key={img.node.name}
      className={className}
    />
  );
};
export default Img;
