export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
      "/systems/tricube/templates/actors/parts/general.html"
    ];
        //return loadTemplates(templatePaths);
        return foundry.applications.handlebars.loadTemplates(templatePaths);
};