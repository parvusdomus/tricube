import TRICUBE_CHAR_SHEET from "./modules/tricube_charsheet.js";
import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";

Hooks.once("init", function(){
  console.log("test | INITIALIZING TRICUBE CHARSHEETS...");
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("tricube", TRICUBE_CHAR_SHEET, {
    makeDefault: true,
    types: ['Player']
  });
  preloadHandlebarsTemplates();
});