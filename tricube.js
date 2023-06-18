import TRICUBE_CHAR_SHEET from "./modules/tricube_charsheet.js";
import TRICUBE_CHALLENGE_SHEET from "./modules/tricube_challengesheet.js";
import TRICUBE_ITEM_SHEET from "./modules/tricube_itemsheet.js";
import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";

Hooks.once("init", function(){
  document.getElementById("logo").src = "/systems/tricube/style/images/TT_Logo2.png";
  console.log("test | INITIALIZING TRICUBE CHARACTER SHEETS...");
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tricube", TRICUBE_CHAR_SHEET, {
    makeDefault: true,
    types: ['Player']
  });
  Actors.registerSheet("tricube", TRICUBE_CHALLENGE_SHEET, {
    makeDefault: true,
    types: ['Challenge']
  });
  console.log("test | INITIALIZING TRICUBE ITEM SHEETS...");
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("tricube", TRICUBE_ITEM_SHEET,{
    makeDefault: true,
    types: ['perk','quirk','affliction']
  });
  preloadHandlebarsTemplates();

  console.log("test | INITIALIZING TRICUBE SETTINGS...");

  game.settings.register('tricube', 'bgImage', {
    name: game.i18n.localize("TRI.config.bgImageName"),
    hint: game.i18n.localize("TRI.config.bgImageHint"),
    type: String,
    default: 'systems/tricube/style/images/white.webp',
    scope: 'world',
    requiresReload: true,
    config: true,
    filePicker: 'image',
  });

  game.settings.register('tricube', 'listHeaderBgColor', {
      name: game.i18n.localize("TRI.config.listHeaderBgColorName"),
      hint: game.i18n.localize("TRI.config.listHeaderBgColorHint"),
      scope: 'world',
      requiresReload: true,
      config: true,
      type: String,
      default: '#000000',
  });

  game.settings.register('tricube', 'listHeaderFontColor', {
    name: game.i18n.localize("TRI.config.listHeaderFontColorName"),
    hint: game.i18n.localize("TRI.config.listHeaderFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#ffffff',
  }); 

  game.settings.register('tricube', 'headerFontColor', {
    name: game.i18n.localize("TRI.config.headerFontColorName"),
    hint: game.i18n.localize("TRI.config.headerFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#000000',
  });

  game.settings.register('tricube', 'regularFontColor', {
    name: game.i18n.localize("TRI.config.itemFontColorName"),
    hint: game.i18n.localize("TRI.config.itemFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#000000',
  });

  game.settings.register('tricube', 'inputBgColor', {
    name: game.i18n.localize("TRI.config.inputBgColorName"),
    hint: game.i18n.localize("TRI.config.inputBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#ffffdc',
  });

  game.settings.register('tricube', 'inputFontColor', {
    name: game.i18n.localize("TRI.config.inputFontColorName"),
    hint: game.i18n.localize("TRI.config.inputFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#000000',
  });

  

  const root = document.querySelector(':root');
  let bgImagePath="url(../../../"+game.settings.get ("tricube", "bgImage")+")"
  root.style.setProperty('--bg-image',bgImagePath)
  let listHeaderBgColor=game.settings.get ("tricube", "listHeaderBgColor")
  root.style.setProperty('--list-header-color',listHeaderBgColor)
  let listHeaderFontColor=game.settings.get ("tricube", "listHeaderFontColor")
  root.style.setProperty('--list-header-font-color',listHeaderFontColor)
  let headerFontColor=game.settings.get ("tricube", "headerFontColor")
  root.style.setProperty('--header-font-color',headerFontColor)
  let regularFontColor=game.settings.get ("tricube", "regularFontColor")
  root.style.setProperty('--list-text-color',regularFontColor)
  let inputBgColor=game.settings.get ("tricube", "inputBgColor")
  root.style.setProperty('--input-bg-color',inputBgColor)
  let inputFontColor=game.settings.get ("tricube", "inputFontColor")
  root.style.setProperty('--input-text-color',inputFontColor)

});

Hooks.on("renderPause", () => {
  $("#pause img").attr("class", "fa-spin pause-image");
  $("#pause figcaption").attr("class", "pause-tricube");
});

Hooks.on('setup', () => {

 
  
})


Hooks.on('renderSettingsConfig', (app, el, data) => {
  // Insert color picker input
  el.find('[name="tricube.listHeaderBgColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('tricube','listHeaderBgColor')}" data-edit="tricube.listHeaderBgColor">`)
  el.find('[name="tricube.listHeaderFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('tricube','listHeaderFontColor')}" data-edit="tricube.listHeaderFontColor">`) 
  el.find('[name="tricube.headerFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('tricube','headerFontColor')}" data-edit="tricube.headerFontColor">`)
  el.find('[name="tricube.regularFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('tricube','regularFontColor')}" data-edit="tricube.regularFontColor">`)
  el.find('[name="tricube.inputBgColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('tricube','inputBgColor')}" data-edit="tricube.inputBgColor">`)
  el.find('[name="tricube.inputFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('tricube','inputFontColor')}" data-edit="tricube.inputFontColor">`)

});
