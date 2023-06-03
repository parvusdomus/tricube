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
      if (this.actor.type == 'Player') {
        this._prepareCharacterItems(data);
      }
      return data;
    }

    _prepareCharacterItems(sheetData){
      let nAfflictions = 0;
      const actorData = sheetData;
      const Perks = [];
		  const Quirks = [];
		  const Afflictions = [];
      for (let i of sheetData.items){
        switch (i.type){
				  case 'perk':
				  {
					  Perks.push(i);
					  break;
				  }
          case 'quirk':
          {
            Quirks.push(i);
            break;
          }
          case 'affliction':
          {
            nAfflictions++;
            Afflictions.push(i);
            break;
          }
        }
      }
      actorData.Perks = Perks;
      actorData.Quirks = Quirks;
      actorData.Afflictions = Afflictions;
      this.actor.update ({ 'system.resources.afflictions.current': nAfflictions });
    }

    activateListeners(html)
	  {
		  super.activateListeners(html);
      html.find('a.item-create').click(this._onItemCreate.bind(this));
      html.find('a.item-edit').click(this._onEditClick.bind(this));
		  html.find('a.item-delete').click(this._onDeleteClick.bind(this));
      html.find('a.trait-change').click(this._onTraitChange.bind(this));
      html.find('a.rank-change').click(this._onRankIncrease.bind(this));
      html.find('a.rank-change').contextmenu(this._onRankDecrease.bind(this));
      html.find('a.resolve-change').click(this._onResolveIncrease.bind(this));
      html.find('a.resolve-change').contextmenu(this._onResolveDecrease.bind(this));
      html.find('a.karma-change').click(this._onKarmaIncrease.bind(this));
      html.find('a.karma-change').contextmenu(this._onKarmaDecrease.bind(this));
      html.find('a.afflictions-change').click(this._onAfflictionsIncrease.bind(this));
      html.find('a.afflictions-change').contextmenu(this._onAfflictionsDecrease.bind(this));
    }

    _onItemCreate(event) {
      event.preventDefault();
      const header = event.currentTarget;
      // Get the type of item to create.
      const type = header.dataset.type;
      // Grab any data associated with this control.
      const data = duplicate(header.dataset);
      // Initialize a default name.
      const name = `${type.capitalize()}`;
      // Prepare the item object.
      const itemData = {
        name: name,
        type: type,
        data: data
      };
      // Remove the type from the dataset since it's in the itemData.type prop.
      delete itemData.data["type"];
    
      // Finally, create the item!
      //     return this.actor.createOwnedItem(itemData);
      return Item.create(itemData, {parent: this.actor});
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

    async _onTraitChange(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let trait = this.actor.system.trait
      switch (trait){
        case 'Agile':
        {
          trait="Brawny"
          break;
        }
        case 'Brawny':
        {
          trait="Crafty"
          break;
        }
        case 'Crafty':
        {
          trait="Agile"
          break;
        }
      }
      this.actor.update ({ 'system.trait': trait });
      return;
    }
    
    async _onRankIncrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let rank=this.actor.system.rank
      rank++
      if (rank > 6){rank=6}
      this.actor.update ({ 'system.rank': rank });
      return;
    }

    async _onRankDecrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let rank=this.actor.system.rank
      rank--
      if (rank < 1){rank=1}
      this.actor.update ({ 'system.rank': rank });
      return;
    }

    async _onResolveIncrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let resolve=this.actor.system.resources.resolve.current
      let max_resolve=this.actor.system.resources.resolve.max
      if (event.shiftKey) {
        max_resolve++
        if (max_resolve > 6){max_resolve=6}
        this.actor.update ({ 'system.resources.resolve.max': max_resolve });
      }
      else
      {
        resolve++
        if (resolve > max_resolve){resolve=max_resolve}
        this.actor.update ({ 'system.resources.resolve.current': resolve });
      } 
      return;
    }

    async _onResolveDecrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let resolve=this.actor.system.resources.resolve.current
      let max_resolve=this.actor.system.resources.resolve.max
      if (event.shiftKey) {
        max_resolve--
        if (max_resolve < 1){max_resolve=1}
        this.actor.update ({ 'system.resources.resolve.max': max_resolve });
        if (resolve > max_resolve){
          resolve=max_resolve
          this.actor.update ({ 'system.resources.resolve.current': resolve });
        }
      }
      else{
        resolve--
        if (resolve < 0){resolve=0}
        this.actor.update ({ 'system.resources.resolve.current': resolve });
      }
      
      return;
    }

    async _onKarmaIncrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let karma=this.actor.system.resources.karma.current
      let max_karma=this.actor.system.resources.karma.max
      if (event.shiftKey) {
        max_karma++
        if (max_karma > 6){max_karma=6}
        this.actor.update ({ 'system.resources.karma.max': max_karma });
      }
      else
      {
        karma++
        if (karma > max_karma){karma=max_karma}
        this.actor.update ({ 'system.resources.karma.current': karma });
      }
      
      return;
    }

    async _onKarmaDecrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let karma=this.actor.system.resources.karma.current
      let max_karma=this.actor.system.resources.karma.max
      if (event.shiftKey){
        max_karma--
        if (max_karma < 1){max_karma=1}
        this.actor.update ({ 'system.resources.karma.max': max_karma });
        if (karma > max_karma){
          karma=max_karma
          this.actor.update ({ 'system.resources.karma.current': karma });
        }
      }
      else
      {
        karma--
        if (karma < 0){karma=0}
        this.actor.update ({ 'system.resources.karma.current': karma });
      }
      
      return;
    }
    
    async _onAfflictionsIncrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let afflictions=this.actor.system.resources.afflictions.current
      let max_afflictions=this.actor.system.resources.afflictions.max
      if (event.shiftKey) {
        max_afflictions++
        if (max_afflictions > 6){max_afflictions=6}
        this.actor.update ({ 'system.resources.afflictions.max': max_afflictions });
      }
      return;
    }

    async _onAfflictionsDecrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let afflictions=this.actor.system.resources.afflictions.current
      let max_afflictions=this.actor.system.resources.afflictions.max
      if (event.shiftKey){
        max_afflictions--
        if (max_afflictions < 1){max_afflictions=1}
        this.actor.update ({ 'system.resources.afflictions.max': max_afflictions });
        if (afflictions > max_afflictions){
          afflictions=max_afflictions
          this.actor.update ({ 'system.resources.afflictions.current': afflictions });
        }
      }
      return;
    }
  
  }