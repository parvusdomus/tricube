export async function DiceRollV2(event)
{
    console.log ("ON DIE ROLL V2")
    event.preventDefault();
    const dataset = event.currentTarget.dataset;
    let tirada= ""
    let ndice=dataset.ndice
    let difficulty=document.getElementById("ndiff").value;
    tirada=ndice+"d6cs>="+difficulty
    let d6Roll = new Roll(String(tirada)).roll({async: false});
    d6Roll.toMessage({
        flavor: ndice+"D6 VS "+difficulty,
        rollMode: 'roll',
        speaker: ChatMessage.getSpeaker()
    });
    return;
}