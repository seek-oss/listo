import { ModuleCategories } from '../types/index';

const pickCategoriesWithResponse = (categories: ModuleCategories) => {
  return Object.keys(categories).reduce<{ [category: string]: string[] }>(
    (pickedCategories, categoryKey) => {
      const submodules = Object.keys(categories[categoryKey]).reduce<string[]>(
        (pickedModules, moduleKey) => {
          return categories[categoryKey][moduleKey]['response']
            ? [...pickedModules, moduleKey]
            : pickedModules;
        },
        [],
      );
      return submodules.length
        ? { ...pickedCategories, ...{ [categoryKey]: submodules } }
        : pickedCategories;
    },
    {},
  );
};

export const selectedCategories = (categories: ModuleCategories) => {
  return Object.entries(categories).reduce(
    (pickedCategories, [categoryKey, category]) => {
      const submodules = Object.entries(categories[categoryKey]).reduce(
        (pickedModules, [moduleKey, mod]) => {
          return categories[categoryKey][moduleKey]['response']
            ? {
                ...pickedModules,
                [moduleKey]: mod,
              }
            : pickedModules;
        },
        {},
      );
      return Object.keys(submodules).length > 0
        ? { ...pickedCategories, ...{ [categoryKey]: submodules } }
        : pickedCategories;
    },
    {} as ModuleCategories,
  );
};

export default pickCategoriesWithResponse;
