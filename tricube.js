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
    name: 'Background Image',
    hint: 'Select a Background Image',
    type: String,
    default: 'systems/tricube/style/white.webp',
    scope: 'world',
    requiresReload: true,
    config: true,
    filePicker: 'image',
  });

  const root = document.querySelector(':root');
  let bgImagePath="url(../../../"+game.settings.get ("tricube", "bgImage")+")"
  root.style.setProperty('--bg-image',bgImagePath)

});

Hooks.on("renderPause", () => {
  $("#pause img").attr("class", "fa-spin pause-image");
});