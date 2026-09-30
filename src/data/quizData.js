export const CREATURE_RESULTS = {
  vampire: {
    id: "vampire",
    name: "THE VAMPIRE",
    subtitle: "The Aristocrat of the Midnight Court",
    image: "/assets/result_vampire.jpg",
    traits: [
      { name: "Calculating", detail: "You measure every gesture and unspoken word. Nothing in your presence happens by accident." },
      { name: "Refined", detail: "A connoisseur of dark vintage, silence, and antique ironies. Vulgarity offends you more than danger." },
      { name: "Unforgiving", detail: "A ledger written in blood and shadow. You may wait centuries, but debts are always paid in full." },
    ],
    description:
      "You move with cold poise through a world too hurried to notice the details. You do not chase what you desire; you wait until darkness brings it directly to your feet. Elegance is your armor, and patience your weapon. Those who mistake your quiet demeanor for docility seldom live to regret it twice.",
    epitaph: "“Time does not wither the patient hunter; it merely sharpens the blade.”",
    accentColor: "#8b2020",
    themeColor: "oxblood",
    symbolIcon: "goblet",
  },
  witch: {
    id: "witch",
    name: "THE WITCH",
    subtitle: "Keeper of the Forgotten Ciphers",
    image: "/assets/result_witch.jpg",
    traits: [
      { name: "Intuitive", detail: "You read the subtle draft under doors, the scent of approaching storms, and the secrets in downcast eyes." },
      { name: "Unruly", detail: "Unbound by societal decrees or mortal consensus. Your wild nature bends to no magistrate." },
      { name: "Alchemical", detail: "You transform sorrow into poison, memory into medicine, and ordinary moments into bewitching omens." },
    ],
    description:
      "You possess an ancient literacy for things unspoken—the rustle of dried wormwood, the turning of the moon, and the intentions people hide behind their teeth. You belong to no master, and your craft answers only to truth. You know which remedies cure and which quietly curdle the blood.",
    epitaph: "“The wood remembers every fire that ever dared enter it.”",
    accentColor: "#678263",
    themeColor: "sage",
    symbolIcon: "cauldron",
  },
  ghost: {
    id: "ghost",
    name: "THE GHOST",
    subtitle: "The Silent Witness Behind the Veil",
    image: "/assets/result_ghost.jpg",
    traits: [
      { name: "Perceptive", detail: "You notice the things the living miss: cold floorboards, forgotten portraits, and words left unsaid." },
      { name: "Ethereal", detail: "A presence felt before seen. Heavy walls cannot bar you, nor can earthly ties hold your wandering thoughts." },
      { name: "Haunted", detail: "Bound by romantic melancholy and eternal memory. You hold tightly to the echoes of what once was." },
    ],
    description:
      "You inhabit the quiet corners between memory and reality. While others scramble for the center of the stage, you see all things from behind the veil. You carry the weight of forgotten promises and cold rooms. You never truly leave a place you have once loved.",
    epitaph: "“Some footsteps leave no dust upon the floorboards, yet rattle the entire house.”",
    accentColor: "#869f8e",
    themeColor: "spectral",
    symbolIcon: "shroud",
  },
  werewolf: {
    id: "werewolf",
    name: "THE WEREWOLF",
    subtitle: "The Primal Beast of the Deep Briar",
    image: "/assets/result_werewolf.jpg",
    traits: [
      { name: "Fierce", detail: "An unquenchable fire burning behind your ribs. When provoked, you give no warning—only impact." },
      { name: "Uncompromising", detail: "Artificial etiquette suffocates you. You honor raw truth, undivided pack loyalty, and the wild." },
      { name: "Primal", detail: "Your senses are dialed into the pulse of the earth. You hear the heartbeat of the forest when the city sleeps." },
    ],
    description:
      "Civilization feels like a garment two sizes too small. Underneath your calm exterior beats an ancient, restless heart. When pushed to the threshold, you do not deliberate—you strike with undivided instinct. Loyalty to your pack is absolute; mercy to your foes is non-existent.",
    epitaph: "“Tear away the silk and gold; under the pale moon, bone remains bone.”",
    accentColor: "#c25e24",
    themeColor: "amber",
    symbolIcon: "claw",
  },
  reaper: {
    id: "reaper",
    name: "THE REAPER",
    subtitle: "The Inevitable Harvester",
    image: "/assets/result_reaper.jpg",
    traits: [
      { name: "Infallible", detail: "You never lose composure in turmoil. While others panic at endings, you understand cycles." },
      { name: "Stoic", detail: "Silent, steadfast, and impartial. Neither gold nor tears can sway the measured swing of your truth." },
      { name: "Final", detail: "When you close a chapter or make a decision, it remains sealed forever. No second guesses." },
    ],
    description:
      "You do not panic when the candle flickers out. You recognize that all things—joy, terror, empires, and heartbeats—have their appointed conclusion. Your quiet composure unnerves those who fear the end, but brings solemn peace to those tired of running.",
    epitaph: "“Every path through the briars, however winding, leads straight to my threshold.”",
    accentColor: "#7e2c2c",
    themeColor: "monochrome",
    symbolIcon: "scythe",
  },
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    roman: "I",
    scene: "/assets/scene_cellar.jpg",
    sceneTitle: "THE CELLAR VAULT",
    question: "You hear three measured knocks from inside the locked oak cabinet in the cellar. What do you do?",
    answers: [
      {
        id: "a",
        text: "Pour a glass of vintage port and wait. If it had the manners to knock, it can wait for an invitation.",
        scores: { vampire: 3, reaper: 1 },
      },
      {
        id: "b",
        text: "Knock three times in return. A dialogue has begun, and it would be impolite to break ritual.",
        scores: { witch: 3, ghost: 1 },
      },
      {
        id: "c",
        text: "Kick the oak door in. Whatever is trapped in there is now locked in with me.",
        scores: { werewolf: 3 },
      },
      {
        id: "d",
        text: "Sit on the cold floor with a pocket watch, counting how long it takes for the knocks to stop.",
        scores: { reaper: 3, ghost: 1 },
      },
    ],
  },
  {
    id: 2,
    roman: "II",
    scene: "/assets/scene_crossroads.jpg",
    sceneTitle: "THE MIDNIGHT CROSSROADS",
    question: "At an overgrown crossroads near midnight, a hooded stranger offers you an antique key with no lock in sight. How do you respond?",
    answers: [
      {
        id: "a",
        text: "Accept it in silence, knowing every lock eventually reveals itself to those who hold the key.",
        scores: { vampire: 2, witch: 2 },
      },
      {
        id: "b",
        text: "Inspect the brass under the moonlight for engraved runes or salt residue before speaking.",
        scores: { witch: 3, ghost: 1 },
      },
      {
        id: "c",
        text: "Demand to know whose pocket it was stolen from, watching their throat as they answer.",
        scores: { werewolf: 3 },
      },
      {
        id: "d",
        text: "Hand them a tarnished copper coin in return. Nothing in this world or the next is free of debt.",
        scores: { reaper: 3, vampire: 1 },
      },
    ],
  },
  {
    id: 3,
    roman: "III",
    scene: "/assets/scene_rooftop_raven.jpg",
    sceneTitle: "THE SPIRES OF CROWS",
    question: "A solitary raven has trailed your steps since sundown, perching on every rooftop you pass. What does it want?",
    answers: [
      {
        id: "a",
        text: "It recognizes a fellow creature of dignity, watchful intellect, and dark plumage.",
        scores: { vampire: 3 },
      },
      {
        id: "b",
        text: "It carries a whisper from someone who departed this earth many seasons ago.",
        scores: { ghost: 3, witch: 1 },
      },
      {
        id: "c",
        text: "It is gossiping about me to the forest, testing how close it can dare come.",
        scores: { werewolf: 3 },
      },
      {
        id: "d",
        text: "It is simply counting down the hours until the night delivers its harvest.",
        scores: { reaper: 3, witch: 1 },
      },
    ],
  },
  {
    id: 4,
    roman: "IV",
    scene: "/assets/scene_grandfather_clock.jpg",
    sceneTitle: "THE THIRTEENTH STROKE",
    question: "The grandfather clock strikes thirteen. The candle in your iron candlestick instantly snuffs out. Where does your hand go first?",
    answers: [
      {
        id: "a",
        text: "Into your wool coat for matches, dried sage, and a pinch of black salt.",
        scores: { witch: 3 },
      },
      {
        id: "b",
        text: "To the concealed hilt at your waist. Steel does not require candlelight to bite.",
        scores: { werewolf: 3, vampire: 1 },
      },
      {
        id: "c",
        text: "Nowhere. Your eyes adjust to total blackness far quicker than they should.",
        scores: { vampire: 3, ghost: 1 },
      },
      {
        id: "d",
        text: "You rest your hands calmly on the chair arm and wait for the darkness to introduce itself.",
        scores: { reaper: 3, ghost: 1 },
      },
    ],
  },
  {
    id: 5,
    roman: "V",
    scene: "/assets/scene_portrait_gallery.jpg",
    sceneTitle: "THE RUINED GALLERY",
    question: "You discover an oil portrait of yourself hanging in a ruined gallery, dated two hundred years before your birth. What is your first thought?",
    answers: [
      {
        id: "a",
        text: "“The painter captured my cheekbones, but the velvet collar is dreadfully out of style.”",
        scores: { vampire: 3 },
      },
      {
        id: "b",
        text: "“So the binding charm held after all. I wondered in which century they had sealed that memory.”",
        scores: { witch: 3 },
      },
      {
        id: "c",
        text: "“I remember that room... the scent of damp rain and dried lavender through the cracked window.”",
        scores: { ghost: 3 },
      },
      {
        id: "d",
        text: "“Whoever owned that human likeness died long before my true skin broke free.”",
        scores: { werewolf: 2, reaper: 2 },
      },
    ],
  },
  {
    id: 6,
    roman: "VI",
    scene: "/assets/scene_midnight_moon.jpg",
    sceneTitle: "THE WATCHTOWER MOON",
    question: "Which nocturnal hour holds the most intoxicating dominion over your spirit?",
    answers: [
      {
        id: "a",
        text: "Midnight—the razor-thin division between yesterday’s regrets and tomorrow’s hunger.",
        scores: { vampire: 3, werewolf: 1 },
      },
      {
        id: "b",
        text: "3:00 AM—the witching hour, when the boundary between the living and the unseen turns to smoke.",
        scores: { witch: 3, ghost: 1 },
      },
      {
        id: "c",
        text: "4:00 AM—the dead cold hush before dawn, when even the night predators have fallen silent.",
        scores: { reaper: 3, ghost: 1 },
      },
      {
        id: "d",
        text: "The twilight cusp—the exact heartbeat the sun bleeds out and the blood begins to pulse.",
        scores: { werewolf: 3 },
      },
    ],
  },
  {
    id: 7,
    roman: "VII",
    scene: "/assets/scene_mausoleum_gate.jpg",
    sceneTitle: "THE MAUSOLEUM THRESHOLD",
    question: "When your time in this realm draws to its inevitable close, what will remain in your wake?",
    answers: [
      {
        id: "a",
        text: "A whispered legend in high parlors behind heavy damask curtains, never quite disproven.",
        scores: { vampire: 3 },
      },
      {
        id: "b",
        text: "A leather-bound grimoire written in invisible cipher, buried beneath the roots of an elder tree.",
        scores: { witch: 3 },
      },
      {
        id: "c",
        text: "A draft of icy air in the parlor every late October, and a door that refuses to stay shut.",
        scores: { ghost: 3 },
      },
      {
        id: "d",
        text: "Broken fences, unpaved tracks leading into the deep pine timber, and an eternal silence.",
        scores: { werewolf: 2, reaper: 2 },
      },
    ],
  },
];
