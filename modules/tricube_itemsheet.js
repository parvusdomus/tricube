export default class TRICUBE_ITEM_SHEET extends foundry.appv1.sheets.ItemSheet{
    static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
          classes: ["tricube", "sheet", "item"],
          template: "systems/tricube/templates/actors/character.html",
          width: 400,
          height: 530
        });
  
    }
    get template(){
        return `systems/tricube/templates/items/${this.item.type}.html`;
    }


  
  }