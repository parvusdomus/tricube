import TRICUBE_CHAR_SHEET from "./modules/tricube_charsheet.js";
import TRICUBE_CHALLENGE_SHEET from "./modules/tricube_challengesheet.js";
import TRICUBE_ITEM_SHEET from "./modules/tricube_itemsheet.js";
import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";

Hooks.once("init", function(){
  document.getElementById("logo").src = "/systems/tricube/style/TT_Logo.png";
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
  

});

Hooks.on("renderPause", () => {
  $("#pause img").attr("class", "fa-spin pause-image");
});