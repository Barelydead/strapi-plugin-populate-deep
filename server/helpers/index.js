const { isEmpty } = require("lodash/fp");

const deepAssign = (target, source) => {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (typeof source[key] === 'object' && source[key] !== null) {
          if (!target[key] || typeof target[key] !== 'object' || target[key] === null) {
            target[key] = source[key];
          }
          deepAssign(target[key], source[key]);
        } else if (!target[key] || typeof target[key] !== 'object' || target[key] === null) {
          target[key] = source[key];
        }
      }
    }
    return target;
}

const getModelPopulationAttributes = (model) => {
  if (model.uid === "plugin::upload.file") {
    const { related, ...attributes } = model.attributes;
    return attributes;
  }

  return model.attributes;
};

const getFullPopulateObject = (modelUid, maxDepth = 20, ignore) => {
  const skipCreatorFields = strapi.plugin('strapi-plugin-populate-deep')?.config('skipCreatorFields');

  if (maxDepth <= 1) {
    return true;
  }
  if (modelUid === "admin::user" && skipCreatorFields) {
    return undefined;
  }

  const populate = {};
  const model = strapi.getModel(modelUid);
  if (ignore && !ignore.includes(model.collectionName)) ignore.push(model.collectionName)
  for (const [key, value] of Object.entries(
    getModelPopulationAttributes(model)
  )) {
    if (ignore?.includes(key)) continue
    if (value) {
      if (value.type === "component") {
        populate[key] = getFullPopulateObject(value.component, maxDepth - 1);
      } else if (value.type === "dynamiczone") {
        const dynamicPopulate = value.components.reduce((prev, cur) => {
          const curPopulate = getFullPopulateObject(cur, maxDepth - 1);
          return curPopulate === true ? prev : deepAssign(prev, curPopulate);
        }, {});
        populate[key] = isEmpty(dynamicPopulate) ? true : dynamicPopulate;
      } else if (value.type === "relation") {
        const relationPopulate = getFullPopulateObject(
          value.target,
          (key === 'localizations') && maxDepth > 2 ? 1 : maxDepth - 1,
          ignore
        );
        if (relationPopulate) {
          populate[key] = relationPopulate;
        }
      } else if (value.type === "media") {
        populate[key] = true;
      }
    }
  }
  return isEmpty(populate) ? true : { populate };
};

module.exports = {
  getFullPopulateObject
}
