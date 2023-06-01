export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
      "/systems/tricube/templates/actors/parts/config.html",
      "/systems/tricube/templates/actors/parts/general.html",
      "/systems/tricube/templates/actors/parts/notes.html"
    ];
        return loadTemplates(templatePaths);
};