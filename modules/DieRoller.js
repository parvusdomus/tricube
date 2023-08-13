import {DiceRollV2} from "../modules/rolls.js";

export default class DieRoller extends FormApplication {
    constructor(options) {
	    super(options);

    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "die-roller",
            title: game.i18n.localize("tricube.system.dieRoller"),
            template: "systems/tricube/templates/dialogs/dice-roller.html",
            classes: [ "tricube", "die-roller"],
            popout: false,
            buttons: [],
        });
    }

    getPos() {
        this.pos = game.user.getFlag("tricube", "dieRollerPosition");

        if (!this.pos || (this.pos.length === 0)) {
            let hbpos = $('#hotbar').position();
            let width = $('#hotbar').width();
            this.pos = { left: hbpos.left + width + 4, right: '', top: '', bottom: 110 };

            game.user.setFlag("tricube", "dieRollerPosition", this.pos);
        }

        let result = '';
        if (this.pos != undefined) {
            result = Object.entries(this.pos).filter(k => {
                return (''+ k[1]) !== '';
            }).map(k => {
                return k[0] + ":" + k[1] + ((''+ k[1]).indexOf('px') > 1 ? '' : 'px');
            }).join('; ') + ';';
        }

        return result;
    }

    setPos() {

        let cssPosition = this.getPos();
        let position = this.pos;

        $(this.element).css(cssPosition);
        
        this.position.left = position.left || null;
        if (this.position.left) { Math.round(this.position.left); }

        if (position.bottom) {
            this.position.top = Math.round(window.innerHeight - position.bottom);
        } else if (position.top) {
            this.position.top = Math.round(position.top);
        }

        return this;
    }

    activateListeners(html)
    {

        //html.find(".roll-dice").on('click', this._onDieRoll.bind(this));
        html.find(".roll-dice").on('click', this._onDieRoll.bind(this));

        let elmnt = html.find("#die-roller-move-handle");
        let dieRoller = elmnt.closest('.window-app');
        let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;

        elmnt.on("mousedown", e => {
            e = e || window.event;
            e.preventDefault();
    
            // get the starting position of the cursor
            startPosX = e.clientX;
            startPosY = e.clientY;

            // Set settings if they don't exist
        
            dieRoller[0].style = dieRoller[0].style ?? { top: (''+ math.round(startPosY) + 'px'), left: (''+ Math.round(startPosX) + 'px') };

            document.onmousemove = mouseMove;
            document.onmouseup = () => {
                this.pos = { top: newPosY, left: newPosX };
                game.user.setFlag("tricube", 'dieRollerPosition', this.pos);

                document.onmousemove = null;
                document.onmouseup = null;
            };

        });

        let mouseMove = e => {
            e = e || window.event;

            // calculate the new position
            newPosX = startPosX - e.movementX;
            newPosY = startPosY - e.movementY;

            // with each move we also want to update the start X and Y
            startPosX = e.clientX;
            startPosY = e.clientY;
        
            // set the element's new position:
            dieRoller[0].style.top = ''+ newPosY + "px";
            dieRoller[0].style.left = ''+ newPosX + "px";
        };

        super.activateListeners(html);
    }
    
    async _onDieRoll(event)
    {
        event.preventDefault();
        DiceRollV2(event);
        return;
    }

}
