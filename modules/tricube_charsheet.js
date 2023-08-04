export default class TRICUBE_CHAR_SHEET extends ActorSheet{
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
          classes: ["tricube", "sheet", "actor"],
          template: "systems/tricube/templates/actors/character.html",
          width: 600,
          height: 620,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "general" }],
          scrollY: ['section.sheet-body']
        });
  
    }
    getData() {
      const data = super.getData();
      if (this.actor.type == 'Player') {
        this._prepareCharacterItems(data);
        this._updateInitiative(data);
      }
      return data;
    }

    _prepareCharacterItems(sheetData){
      let nAfflictions = 0;
      const actorData = sheetData;
      const Perks = [];
		  const Quirks = [];
		  const Afflictions = [];
      const Knacks = [];
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
          case 'knack':
          {
            Knacks.push(i);
            break;
          }
        }
      }
      actorData.Perks = Perks;
      actorData.Quirks = Quirks;
      actorData.Afflictions = Afflictions;
      actorData.Knacks = Knacks;
      this.actor.update ({ 'system.resources.afflictions.value': nAfflictions });
      actorData.settings = {
        enableKnacks: game.settings.get("tricube", "enableKnacks"),
        enableSubTraits: game.settings.get("tricube", "enableSubTraits"),
        enableSubStyles: game.settings.get("tricube", "enableSubStyles"),
        enableStyles: game.settings.get("tricube", "enableStyles")
      }
    }

    _updateInitiative(sheetData){
      let initiative=""
      if (sheetData.actor.system.trait=="Agile" || sheetData.actor.system.subtrait.reflexes){
        initiative="3d6cs>=5"
      }
      else{
        initiative="2d6cs>=5"
      }
      this.actor.update ({ 'system.initiative': initiative });
    }


    activateListeners(html)
	  {
		  super.activateListeners(html);
      html.find('a.item-create').click(this._onItemCreate.bind(this));
      html.find('a.item-edit').click(this._onEditClick.bind(this));
      html.find('a.item-show').click(this._onShowClick.bind(this));
		  html.find('a.item-delete').click(this._onDeleteClick.bind(this));
      html.find('a.trait-change').click(this._onTraitChange.bind(this));
      html.find('a.combat-change').click(this._onCombatChange.bind(this));
      html.find('a.rank-change').click(this._onRankIncrease.bind(this));
      html.find('a.rank-change').contextmenu(this._onRankDecrease.bind(this));
      html.find('a.resolve-change').click(this._onResolveIncrease.bind(this));
      html.find('a.resolve-change').contextmenu(this._onResolveDecrease.bind(this));
      html.find('a.karma-change').click(this._onKarmaIncrease.bind(this));
      html.find('a.karma-change').contextmenu(this._onKarmaDecrease.bind(this));
      html.find('a.afflictions-change').click(this._onAfflictionsIncrease.bind(this));
      html.find('a.afflictions-change').contextmenu(this._onAfflictionsDecrease.bind(this));
      html.find('a.dice-roll').click(this._onDiceRoll.bind(this));
      html.find ('a.subtrait-toggle').click(this._onSubTraitToggle.bind(this));
      html.find ('a.substyle-toggle').click(this._onSubStyleToggle.bind(this));
    }

    _onItemCreate(event) {
      event.preventDefault();
      const header = event.currentTarget;
      const type = header.dataset.type;
      const data = duplicate(header.dataset);
      const name = `${type.capitalize()}`;
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

    async _onShowClick(event, data)
	  {
      event.preventDefault();
		  const dataset = event.currentTarget.dataset;
		  const item = this.actor.items.get(dataset.id);
      let chatData = {}
      let msg_content = "<p><span>"+item.name+" </span>"
      if (item.system.tag != ""){msg_content+="<span style=\"background-color:"+item.system.bg_color+"; color:"+item.system.text_color+"\">&nbsp;"+item.system.tag+"&nbsp;</span>"}
      msg_content+="</p>"
      if (item.system.desc != ""){msg_content+="<hr>"+item.system.desc}
      chatData = {
        content: msg_content,
      };
      ChatMessage.create(chatData);
		  return;
    }
    
    async _onDeleteClick(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      console.log ("dataset")
      Dialog.confirm({
        title: game.i18n.localize("TRI.ui.deleteTitle"),
			  content: game.i18n.localize("TRI.ui.deleteText"),
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

    async _onSubTraitToggle(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let subtraitName = 'system.subtrait.'+dataset.subtrait;
      let subtrait = this.actor.system.subtrait[dataset.subtrait];
      if (subtrait)
      {
        this.actor.update ({ [subtraitName]: false });
      }
      else
      {
        this.actor.update ({ [subtraitName]: true });
      }
      return;
    }

    async _onSubStyleToggle(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let substyleName = 'system.substyle.'+dataset.substyle;
      let substyle = this.actor.system.substyle[dataset.substyle];
      if (substyle)
      {
        this.actor.update ({ [substyleName]: false });
      }
      else
      {
        this.actor.update ({ [substyleName]: true });
      }
      return;
    } 

    async _onCombatChange(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let combat = this.actor.system.combat
      switch (combat){
        case 'Ranged':
        {
          combat="Melee"
          break;
        }
        case 'Melee':
        {
          combat="Mental"
          break;
        }
        case 'Mental':
        {
          combat="Ranged"
          break;
        }
      }
      this.actor.update ({ 'system.combat': combat });
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
      let resolve=this.actor.system.resources.resolve.value
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
        this.actor.update ({ 'system.resources.resolve.value': resolve });
      } 
      return;
    }

    async _onResolveDecrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let resolve=this.actor.system.resources.resolve.value
      let max_resolve=this.actor.system.resources.resolve.max
      if (event.shiftKey) {
        max_resolve--
        if (max_resolve < 1){max_resolve=1}
        this.actor.update ({ 'system.resources.resolve.max': max_resolve });
        if (resolve > max_resolve){
          resolve=max_resolve
          this.actor.update ({ 'system.resources.resolve.value': resolve });
        }
      }
      else{
        resolve--
        if (resolve < 0){resolve=0}
        this.actor.update ({ 'system.resources.resolve.value': resolve });
      }
      
      return;
    }

    async _onKarmaIncrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let karma=this.actor.system.resources.karma.value
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
        this.actor.update ({ 'system.resources.karma.value': karma });
      }
      
      return;
    }

    async _onKarmaDecrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let karma=this.actor.system.resources.karma.value
      let max_karma=this.actor.system.resources.karma.max
      if (event.shiftKey){
        max_karma--
        if (max_karma < 1){max_karma=1}
        this.actor.update ({ 'system.resources.karma.max': max_karma });
        if (karma > max_karma){
          karma=max_karma
          this.actor.update ({ 'system.resources.karma.value': karma });
        }
      }
      else
      {
        karma--
        if (karma < 0){karma=0}
        this.actor.update ({ 'system.resources.karma.value': karma });
      }
      
      return;
    }
    
    async _onAfflictionsIncrease(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let afflictions=this.actor.system.resources.afflictions.value
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
      let afflictions=this.actor.system.resources.afflictions.value
      let max_afflictions=this.actor.system.resources.afflictions.max
      if (event.shiftKey){
        max_afflictions--
        if (max_afflictions < 1){max_afflictions=1}
        this.actor.update ({ 'system.resources.afflictions.max': max_afflictions });
        if (afflictions > max_afflictions){
          afflictions=max_afflictions
          this.actor.update ({ 'system.resources.afflictions.value': afflictions });
        }
      }
      return;
    }

    async _onDiceRoll(event,data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let tirada= ""
      let ndice=dataset.ndice
      let difficulty=dataset.ndiff
      if (event.shiftKey){
        difficulty=4
        
      }
      if (event.ctrlKey){
        difficulty=6
      }
      tirada=ndice+"d6cs>="+difficulty
      let d6Roll = new Roll(String(tirada)).roll({async: false});
      d6Roll.toMessage({
        flavor: ndice+"D6 VS "+difficulty,
        rollMode: 'roll',
        speaker: ChatMessage.getSpeaker({ alias: this.actor.name })
        });
      return;
    }
  
  }