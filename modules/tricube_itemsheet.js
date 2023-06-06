export default class TRICUBE_ITEM_SHEET extends ItemSheet{
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
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