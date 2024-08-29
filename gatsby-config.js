/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Rêver à l'essentiel - Soutions Justes`,
    siteUrl: `https://rever.myriadeweb.com`,
    description: `Les personnes im·migrantes sans statut ou à statut précaire sont souvent contraintes de mettre de côté leurs plus grandes aspirations pour ne rêver qu'à l'essentiel.`
  },
  plugins: [
    "gatsby-plugin-image", 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp", 
    "gatsby-plugin-sass", 
    "gatsby-plugin-sitemap", 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.jpg"
      }
    } , {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    } , {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://rever.myriadeweb.com`,
      },
    } ,
    `gatsby-plugin-image`,
  ]
};

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})