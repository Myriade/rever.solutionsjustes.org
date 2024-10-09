/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Rêver à l'essentiel - Soutions Justes`,
    siteUrl: `https://rever.solutionsjustes.org`,
    description: `Chaque rêve mérite de ne pas être essentiel ! Ensemble, apprenons la réalité de l’immigration humanitaire et faisons entendre les histoires de ceux et celles qui aspirent à un avenir meilleur.`
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
        siteUrl: `https://rever.solutionsjustes.org`,
      },
    } ,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "GTM-59WRR2G6"", // Google Analytics / GA
          //"AW-CONVERSION_ID", // Google Ads / Adwords / AW
        ],
        pluginConfig: {
          respectDNT: true,  // Avoids sending pageview hits from custom paths
        },
      },
    },
  ]
};

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})