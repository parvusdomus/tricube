import TRICUBE_CHAR_SHEET from "./modules/tricube_charsheet.js";
import TRICUBE_CHALLENGE_SHEET from "./modules/tricube_challengesheet.js";
import TRICUBE_ITEM_SHEET from "./modules/tricube_itemsheet.js";
import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";
import DieRoller from "./modules/DieRoller.js";
import {_getInitiativeFormula} from './modules/combat.js';
import {diceToFaces} from "./modules/rolls.js";
import tricubeChat from "./modules/chat.js";



Hooks.once("init", function(){
  //document.getElementById("logo").src = "/systems/tricube/style/images/TT_Logo2.png";
  console.log("test | INITIALIZING TRICUBE CHARACTER SHEETS...");
  foundry.documents.collections.Actors.unregisterSheet("core", foundry.appv1.sheets.ActorSheet);
  foundry.documents.collections.Actors.registerSheet("tricube", TRICUBE_CHAR_SHEET, {
    makeDefault: true,
    types: ['Player']
  });
  foundry.documents.collections.Actors.registerSheet("tricube", TRICUBE_CHALLENGE_SHEET, {
    makeDefault: true,
    types: ['Challenge']
  });
  console.log("test | INITIALIZING TRICUBE ITEM SHEETS...");
  foundry.documents.collections.Items.unregisterSheet("core", foundry.appv1.sheets.ItemSheet);
  foundry.documents.collections.Items.registerSheet("tricube", TRICUBE_ITEM_SHEET,{
    makeDefault: true,
    types: ['perk','quirk','affliction','knack']
  });
  preloadHandlebarsTemplates();
  

    // Slowing down pings
    CONFIG.Canvas.pings.styles.pulse.duration = 2000
    CONFIG.Canvas.pings.styles.alert.duration = 2000
    CONFIG.Canvas.pings.styles.arrow.duration = 2000

  console.log("test | INITIALIZING TRICUBE SETTINGS...");

  game.settings.register("tricube", "dieRollerPosition", {
    scope: "client",
    config: false,
    default: null,
    type: Object
  });

  game.settings.register("tricube", "enableRank", {
    name: game.i18n.localize("TRI.config.enableRankName"),
    hint: game.i18n.localize("TRI.config.enableRankHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register("tricube", "enableStyles", {
    name: game.i18n.localize("TRI.config.enableStylesName"),
    hint: game.i18n.localize("TRI.config.enableStylesHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register("tricube", "enableKnacks", {
    name: game.i18n.localize("TRI.config.enableKnacksName"),
    hint: game.i18n.localize("TRI.config.enableKnacksHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register("tricube", "enableSubTraits", {
    name: game.i18n.localize("TRI.config.enableSubTraitsName"),
    hint: game.i18n.localize("TRI.config.enableSubTraitsHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register("tricube", "enableSubStyles", {
    name: game.i18n.localize("TRI.config.enableSubStylesName"),
    hint: game.i18n.localize("TRI.config.enableSubStylesHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

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

  game.settings.register('tricube', 'chatBgImage', {
    name: game.i18n.localize("TRI.config.chatBgImageName"),
    hint: game.i18n.localize("TRI.config.chatBgImageHint"),
    type: String,
    default: 'systems/tricube/style/images/white.webp',
    scope: 'world',
    requiresReload: true,
    config: true,
    filePicker: 'image',
  });

  game.settings.register('tricube', 'titleFont', {
    name: game.i18n.localize("TRI.config.titleFontName"),
    hint: game.i18n.localize("TRI.config.titleFontHint"),
    config: true,
    type: String,
    scope: 'world',
    choices: {
      "Dominican": "Default Tricube Tales Font",
      "Werewolf_Moon": "A Welsh Werewolf",
      "East_Anglia": "Accursed: Dark Tales of Morden",
      "WHITC": "Christmas Capers",
      "RexliaRg": "Chrome Shells and Neon Streets",
      "Nautilus": "Down in the Depths",
      "Yagathan": "Eldritch Detectives",
      "Amble": "Firefighters",
      "MountainsofChristmas": "Goblin Gangsters",
      "BLACC": "Heroes of Sherwood Forest",
      "Creepster": "Horrible Henchmen",
      "Duvall": "Hunters of Victorian London",
      "mandalore": "Interstellar Bounty Hunters",
      "Starjedi": "Interstellar Laser Knights",
      "xirod": "Interstellar Mech Wars",
      "Mandalore_Halftone": "Interstellar Rebels",
      "pirulen": "Interstellar Smugglers",
      "Arkhip": "Interstellar Troopers",
      "MysteryQuest": "Maidenstead Mysteries",
      "Bangers": "Metahuman Uprising",
      "OhioKraft": "Minerunners",
      "WIZARDRY": "Paths Between the Stars",
      "TradeWinds": "Pirates of the Bone Blade",
      "Foul": "Rotten Odds",
      "BLOODY": "Samhain Slaughter",
      "Cinzel": "Sharp Knives and Dark Streets",
      "IMPOS5": "Spellrunners",
      "Almendrasc": "Stranger Tales",
      "StoneAge": "Stone Age Hunters",
      "IMMORTAL": "Summer Camp Slayers",
      "MetalMacabre": "Sundered Chains",
      "Bagnard": "Tales of the City Guard",
      "MountainsofChristmas": "Tales of the Goblin Horde",
      "RifficFree": "Tales of the Little Adventurers",
      "Orbitron": "Titan Effect: Covert Tales",
      "MetalMacabre": "Twisted Wishes",
      "Headhunter": "Voyage to the Isle of Skulls",
      "Saddlebag": "Wardens of the Weird West",
      "Berry": "Welcome to Drakonheim",
      "Skia": "Winter Eternal: Darkness & Ice",
      "Corleone": "Wiseguys: Gangster Tales"
    },
    requiresReload: true,
    default: 'Dominican',
  });

  game.settings.register("tricube", "listHeaderBgColor", {
    name: game.i18n.localize("TRI.config.listHeaderBgColorName"),
    hint: game.i18n.localize("TRI.config.listHeaderBgColorHint"),
    scope: "world",
    config: true,
    default: '#000000ff',
    requiresReload: true,
    type: new game.colorPicker.ColorPickerField(),
  });

  game.settings.register("tricube", "listHeaderFontColor", {
    name: game.i18n.localize("TRI.config.listHeaderFontColorName"),
    hint: game.i18n.localize("TRI.config.listHeaderFontColorHint"),
    scope: "world",
    config: true,
    default: '#ffffffff',
    requiresReload: true,
    type: new game.colorPicker.ColorPickerField(),
  });

  game.settings.register("tricube", "headerFontColor", {
    name: game.i18n.localize("TRI.config.headerFontColorName"),
    hint: game.i18n.localize("TRI.config.headerFontColorHint"),
    scope: "world",
    config: true,
    default: '#000000ff',
    requiresReload: true,
    type: new game.colorPicker.ColorPickerField(),
  });

  //VOY POR AQUI

  game.settings.register('tricube', 'regularFontColor', {
    name: game.i18n.localize("TRI.config.itemFontColorName"),
    hint: game.i18n.localize("TRI.config.itemFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#000000ff',
  });

  game.settings.register('tricube', 'inputBgColor', {
    name: game.i18n.localize("TRI.config.inputBgColorName"),
    hint: game.i18n.localize("TRI.config.inputBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#ffffdcff',
  });

  game.settings.register('tricube', 'inputFontColor', {
    name: game.i18n.localize("TRI.config.inputFontColorName"),
    hint: game.i18n.localize("TRI.config.inputFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#000000ff',
  });

  game.settings.register('tricube', 'windowHeaderBgColor', {
    name: game.i18n.localize("TRI.config.windowHeaderBgColorName"),
    hint: game.i18n.localize("TRI.config.windowHeaderBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#000000ff',
  });

  game.settings.register('tricube', 'windowHeaderFontColor', {
    name: game.i18n.localize("TRI.config.windowHeaderFontColorName"),
    hint: game.i18n.localize("TRI.config.windowHeaderFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#ffffffff',
  });

  game.settings.register('tricube', 'dieRollerFontColor', {
    name: game.i18n.localize("TRI.config.dieRollerFontColorName"),
    hint: game.i18n.localize("TRI.config.dieRollerFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#000000ff',
  });

  game.settings.register('tricube', 'dieRollerButtonBgColor', {
    name: game.i18n.localize("TRI.config.dieRollerButtonBgColorName"),
    hint: game.i18n.localize("TRI.config.dieRollerButtonBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#ffffffff',
  });

  game.settings.register('tricube', 'dieRollerButtonFontColor', {
    name: game.i18n.localize("TRI.config.dieRollerButtonFontColorName"),
    hint: game.i18n.localize("TRI.config.dieRollerButtonFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#000000ff',
  });

  game.settings.register('tricube', 'tabActiveBgColor', {
    name: game.i18n.localize("TRI.config.tabActiveBgColorName"),
    hint: game.i18n.localize("TRI.config.tabActiveBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#000000ff',
  });

  game.settings.register('tricube', 'tabActiveFontColor', {
    name: game.i18n.localize("TRI.config.tabActiveFontColorName"),
    hint: game.i18n.localize("TRI.config.tabActiveFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#ffffffff',
  });

  game.settings.register('tricube', 'tabHoverBgColor', {
    name: game.i18n.localize("TRI.config.tabHoverBgColorName"),
    hint: game.i18n.localize("TRI.config.tabHoverBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#555353ff',
  });

  game.settings.register('tricube', 'tabHoverFontColor', {
    name: game.i18n.localize("TRI.config.tabHoverFontColorName"),
    hint: game.i18n.localize("TRI.config.tabHoverFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: new game.colorPicker.ColorPickerField(),
    default: '#d8d1d1ff',
  });
  

  const root = document.querySelector(':root');
  let bgImagePath="url(../../../"+game.settings.get ("tricube", "bgImage")+")"
  root.style.setProperty('--bg-image',bgImagePath)
  let chatbgImagePath="url(../../../"+game.settings.get ("tricube", "chatBgImage")+")"
  root.style.setProperty('--chat-bg-image',chatbgImagePath)
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
  let titleFont=game.settings.get ("tricube", "titleFont")
  root.style.setProperty('--font-name',titleFont) 
  let windowHeaderBgColor=game.settings.get ("tricube", "windowHeaderBgColor")
  root.style.setProperty('--window-header-bg-color',windowHeaderBgColor) 
  let windowHeaderFontColor=game.settings.get ("tricube", "windowHeaderFontColor")
  root.style.setProperty('--window-header-font-color',windowHeaderFontColor) 
  let dieRollerFontColor=game.settings.get ("tricube", "dieRollerFontColor")
  root.style.setProperty('--die-roller-font-color',dieRollerFontColor) 
  let dieRollerButtonFontColor=game.settings.get ("tricube", "dieRollerButtonFontColor")
  root.style.setProperty('--die-roller-button-font-color',dieRollerButtonFontColor) 
  let dieRollerButtonBgColor=game.settings.get ("tricube", "dieRollerButtonBgColor")
  root.style.setProperty('--die-roller-button-bg-color',dieRollerButtonBgColor) 
  let tabActiveBgColor=game.settings.get ("tricube", "tabActiveBgColor")
  root.style.setProperty('--tab-bg-color-active',tabActiveBgColor)
  let tabActiveFontColor=game.settings.get ("tricube", "tabActiveFontColor")
  root.style.setProperty('--tab-text-color-active',tabActiveFontColor)
  let tabHoverBgColor=game.settings.get ("tricube", "tabHoverBgColor")
  root.style.setProperty('--tab-bg-color-hover',tabHoverBgColor)
  let tabHoverFontColor=game.settings.get ("tricube", "tabHoverFontColor")
  root.style.setProperty('--tab-text-color-hover',tabHoverFontColor)

  //ACTIVATE FLOATING DICE ROLLER


  


  //DICE FACE HELPER
  Handlebars.registerHelper("times", function(n, content)
    {
      let result = "";
      for (let i = 0; i < n; ++i)
      {
          result += content.fn(i);
      }
    
      return result;
    });
    
  Handlebars.registerHelper("face", diceToFaces);

});


Hooks.on("renderPause", () => {
  $("#pause img").attr("class", "fa-spin pause-image");
  $("#pause figcaption").attr("class", "pause-tricube");
});

Hooks.on('ready', () => {
  new DieRoller(DieRoller.defaultOptions, { excludeTextLabels: true }).render(true);
  
})

/*Hooks.on('renderChatMessageHTML', (message, html) => {
  console.log ("MESSAGE HTML")
  console.log (message)
  console.log ("HTML HTML")
  console.log (html)
  tricubeChat.chatListeners(message, html)
})*/
//Hooks.on('renderChatMessage', (message, html) => tricubeChat.chatListeners(message, html))

/*Hooks.on('renderChatMessage', (message, html) => {
  console.log ("MESSAGE")
  console.log (message)
  console.log ("HTML")
  console.log (html)
  tricubeChat.chatListeners(message, html)
})*/

Hooks.on("renderChatMessageHTML", (message, html) => {
  html.querySelector(".spendKarma")?.addEventListener('click', () => {tricubeChat._spendKarma(html,message)});
  html.querySelector(".gainResolve")?.addEventListener('click', () => {tricubeChat._gainResolve(html)});
  html.querySelector(".gainKarma")?.addEventListener('click', () => {tricubeChat._gainKarma(html)});
});

Hooks.on('refreshToken', () => {

})