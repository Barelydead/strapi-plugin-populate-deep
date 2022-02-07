# Strapi plugin populate-deep
This plugin allows for easier population of deep content structures using the rest API.

# Usages

## Examples

Populate a request with the default max depth.

`/api/articles?populate=deep`

Populate a request with the a custom depth

`/api/articles?populate=deep,10`

Populate a request with the a custom depth

`/api/articles/1?populate=deep,10`

## Good to know

The default max depth is 5 levels deep.

The populate deep option is available for all collections and single types using the findOne and findMany methods.


# Installation

`npm install strapi-plugin-populate-deep`

`yarn add strapi-plugin-populate-deep`


# Contributions
The original idea for getting the populate structure was created by [tomnovotny7](https://github.com/tomnovotny7) and can be found in [this](https://github.com/strapi/strapi/issues/11836) github thread
