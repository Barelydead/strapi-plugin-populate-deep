'use strict';
const { getFullPopulateObject } = require('./helpers');

module.exports = ({ strapi }) => {
  // Subscribe to the lifecycles that we are intrested in.
  strapi.db.lifecycles.subscribe((event) => {
    if (event.action === 'beforeFindMany' || event.action === 'beforeFindOne') {
      const populate = event.params?.populate;

      if (populate && populate[0] === 'deep') {
        const defaultDepth = strapi.plugin('strapi-plugin-populate-deep')?.config('defaultDepth') || 5;
        const skipLocalizationsFields = strapi.plugin('strapi-plugin-populate-deep')?.config('skipLocalizationsFields');

        const depth = populate[1] ?? defaultDepth;
        const ignore = skipLocalizationsFields ? ['localizations'] : [];
        const modelObject = getFullPopulateObject(event.model.uid, depth, ignore);
        event.params.populate = modelObject.populate;
      }
    }
  });
};
