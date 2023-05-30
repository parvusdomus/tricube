export default class TRICUBE_CHAR_SHEET extends ActorSheet{
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
          classes: ["tricube", "sheet", "actor"],
          template: "systems/tricube/templates/actors/character.html",
          width: 800,
          height: 700,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "general" }]
        });
  
    }
    getData() {
        const data = super.getData();
        //data.dtypes = ["String", "Number", "Boolean"];
        //if (this.actor.data.type == 'PJ') {
          //this._prepareCharacterItems(data);
          //this._calculaValores(data);
        //}
        return data;
      }
  
  }