'use strict';
const { getFullPopulateObject } = require('./helpers')

module.exports = ({ strapi }) => {
  // Subscribe to the lifecycles that we are intrested in.
  strapi.db.lifecycles.subscribe((event) => {
    if (event.action === 'beforeFindMany' || event.action === 'beforeFindOne') {
      const populate = event.params?.populate;

      if (populate && populate[0] === 'deep') {
        const depth = populate[1] ?? 5 
        const modelObject = getFullPopulateObject(event.model.uid, depth);
        event.params.populate = modelObject.populate
      }
    }
  });
};
