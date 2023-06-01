export default class TRICUBE_CHAR_SHEET extends ActorSheet{
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
          classes: ["tricube", "sheet", "actor"],
          template: "systems/tricube/templates/actors/character.html",
          width: 600,
          height: 500,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "general" }]
        });
  
    }
    getData() {
      const data = super.getData();
      console.log ("DATA")
      console.log (data)
      //data.dtypes = ["String", "Number", "Boolean"];
      if (this.actor.type == 'Player') {
        this._prepareCharacterItems(data);
        //this._calculaValores(data);
      }
      console.log ("ACTOR")
      console.log (this.actor)
      console.log ("ACTOR DATA")
      console.log (data)
      return data;
    }

    _prepareCharacterItems(sheetData){
      console.log ("PREPARE ITEMS")
      const actorData = sheetData;
      const Perks = [];
		  const Quirks = [];
		  const Afflictions = [];
      for (let i of sheetData.items){
        switch (i.type){
				  case 'Perk':
				  {
            console.log ("PERK")
					  Perks.push(i);
					  break;
				  }
          case 'Quirk':
          {
            console.log ("QUIRK")
            Quirks.push(i);
            break;
          }
          case 'Affliction':
          {
            console.log ("AFFLICTION")
            Afflictions.push(i);
            break;
          }
        }
      }
      actorData.Perks = Perks;
      actorData.Quirks = Quirks;
      actorData.Afflictions = Afflictions;
    }

    activateListeners(html)
	  {
		  super.activateListeners(html);
      html.find('a.item-edit').click(this._onEditClick.bind(this));
		  html.find('a.item-delete').click(this._onDeleteClick.bind(this));
    }

    async _onEditClick(event, data)
	  {
      event.preventDefault();
		  const dataset = event.currentTarget.dataset;
		  const item = this.actor.items.get(dataset.id);
		  item.sheet.render(true);
		  return;
    }
    
    async _onDeleteClick(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      Dialog.confirm({
        title: "Delete item?",
        content: "Please confirm if you want to delete this item.",
        yes: () => this.actor.deleteEmbeddedDocuments("Item", [dataset.id]),
        no: () => {},
        defaultYes: false
         });
      return;
    }


    
  
  }