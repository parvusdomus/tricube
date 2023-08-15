export default class tricubeChat {
    static chatListeners (html) {
      html.on('click', '.spendKarma', this._spendKarma.bind(this));
      html.on('click', '.gainResolve', this._gainResolve.bind(this));
      html.on('click', '.gainKarma', this._gainKarma.bind(this));
    }

    static _spendKarma (event, data){
      const dataset = event.currentTarget.dataset;
      const element = event.currentTarget;
      let dados_split = dataset.dados.split(',');
      let difficulty = Number(dataset.ndiff)-1
      let tirada=dataset.ndice+"d6"
      let rollText="<label>"+tirada+" VS "+difficulty+"</label>"
      let nExitos=0
      let nUnos=0
      let testResult=""
      let dados=[];
      let actor = game.actors.get(dataset.actor_id);
      if (game.user.isGM==false){
        let karma=Number(actor.system.resources.karma.value)-1;
        actor.update ({ 'system.resources.karma.value': karma });
      }
      for (let i = 0; i < dataset.ndice; i++) {
        if (dados_split[i] >= difficulty){nExitos++}
        if (dados_split[i] == 1){nUnos++}
        dados.push(dados_split[i]);
      }
      if (nExitos >= 1){
        testResult="<h3 style=\"background-color:green; color:white;\">"+game.i18n.localize("TRI.ui.regularSuccess")+"</h3>"
        if (nExitos >= 2){
          testResult="<h3 style=\"background-color:blue; color:white;\">"+game.i18n.localize("TRI.ui.criticalSuccess")+"</h3>"
        }
      }
      else{
        testResult="<h3 style=\"background-color:grey; color:white;\">"+game.i18n.localize("TRI.ui.regularFailure")+"</h3>"
      }
      if (nUnos >= Number(dataset.ndice)){
        testResult="<h3 style=\"background-color:red; color:white;\">"+game.i18n.localize("TRI.ui.criticalFailure")+"</h3>"
        canSpendKarma=false
      }
      const messageId = $(element)
            .parents('[data-message-id]')
            .attr('data-message-id');
      const message = game.messages.get(messageId)
      const archivo_template = '/systems/tricube/templates/chat/test-result-karma.html';
      const datos_template = {
        dados: dados,
        nDice: dataset.ndice,
        rollText: rollText,
        nDiff: difficulty,
        testResult: testResult
      };
      renderTemplate(archivo_template, datos_template).then(
        (contenido_Dialogo_chat)=> {
          message.update({id: messageId, content: contenido_Dialogo_chat})
      })

    }

    static _gainResolve (event, data){
      const dataset = event.currentTarget.dataset;
      const element = event.currentTarget;
      let actor = game.actors.get(dataset.actor_id);
      let resolve=Number(actor.system.resources.resolve.value)+1;
      let resolve_max=Number(actor.system.resources.resolve.max)
      if (resolve > resolve_max){resolve=resolve_max}
      actor.update ({ 'system.resources.resolve.value': resolve });
      const messageId = $(element)
            .parents('[data-message-id]')
            .attr('data-message-id');
      const message = game.messages.get(messageId)
      let msg_content="<div class=\"tricube test-result\"><h3 style=\"background-color:grey; color:white;\">"+game.i18n.localize("TRI.ui.acceptIntrusion")+"</h3></div>"
      //message.update({id: messageId, content: msg_content})
      let chatData = {
        content: msg_content,
        speaker: ChatMessage.getSpeaker()
      };
      ChatMessage.create(chatData);

    }

    static _gainKarma (event, data){
      const dataset = event.currentTarget.dataset;
      const element = event.currentTarget;
      let actor = game.actors.get(dataset.actor_id);
      let karma=Number(actor.system.resources.karma.value)+1;
      let karma_max=Number(actor.system.resources.karma.max)
      if (karma > karma_max){karma=karma_max}
      actor.update ({ 'system.resources.karma.value': karma });
      const messageId = $(element)
            .parents('[data-message-id]')
            .attr('data-message-id');
      const message = game.messages.get(messageId)
      let msg_content="<div class=\"tricube test-result\"><h3 style=\"background-color:grey; color:white;\">"+game.i18n.localize("TRI.ui.acceptIntrusion")+"</h3></div>"
      //message.update({id: messageId, content: msg_content})
      let chatData = {
        content: msg_content,
        speaker: ChatMessage.getSpeaker()
      };
      ChatMessage.create(chatData);
    }
}