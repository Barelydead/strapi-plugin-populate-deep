# Strapi plugin populate-deep
This plugin allows for easier population of deep content structures using the rest API.

# Examples

Populate a request with the default max depth.
`/api/articles?populate=deep`

Populate a request with the a custom depth
`/api/articles?populate=deep,10`

# Installation

`npm install strapi-plugin-deep-populate`

`yarn add strapi-plugin-deep-populate`

# Contributions
The original idea for getting the populate structure was created by [tomnovotny7](https://github.com/tomnovotny7) and can be found in [this](https://github.com/strapi/strapi/issues/11836) github thread