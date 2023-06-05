class Pokemon {
  totalAttackPoints = 0;

  constructor(name, type, lp, attack) {
    this.name = name;
    this.type = type;
    this.lifePoints = lp;
    this.attack = attack;
  }

  showInformation(kindOfInformation) {
    let value = kindOfInformation.toLowerCase();
    if (value === "type") {
      return `${this.name} ist ein ${this.type}-Pokemon.`;
    }

    if (value === "attack") {
      return `${this.name} kann maximal ${this.attack} Schaden verursachen.`;
    }

    return `Bitte überprüfe nochmal deine Angabe!`;
  }

  //kämpfen oder fliehen...
  flightOrFight(decision) {
    return decision.toLowerCase() === "fight"
      ? "Du hast dich für den Kampf entschieden!"
      : "Du fliehst...";
  }

  //hat die attacke getroffen?...
  checkHitOrMiss() {
    let randomNum = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    return randomNum >= 3 ? true : false;
  }

  //wenn ja, dann gib mir attackPoints aus
  calculateCurrentAttackPoints() {
    this.totalAttackPoints = Math.floor(
      Math.random() * (this.attack - 1 + 1) + 1
    );

    return this.checkHitOrMiss() ? this.totalAttackPoints : 0;
  }

  //lebenspunkte werden angezeigt
  showCurrentLifePoints() {
    return `Lebenspunkte ${this.name}: ${this.lifePoints}`;
  }

  //attacke wird ausgeführt, die lebenspunkte übergeben als enemyAttack in der funktion calculateCurrentLifePoints
  doAttack() {
    return this.calculateCurrentAttackPoints();
  }

  //speichert den wert der lebenspunkte
  //(lebenspunkte - attacke)
  setCurrentLifePoints(value) {
    this.lifePoints = value;
  }

  //enemyAttack --> doAttack()
  calculateCurrentLifePoints(enemyAttack) {
    if (enemyAttack === 0) {
      return `${this.name} wurde nicht getroffen...`;
    } else {
      //neue lebenspunkte werden gespeichert
      let newLifePoints = this.lifePoints - enemyAttack;
      //führt die Funktion aus, übreschreibt this.lifepoints
      this.setCurrentLifePoints(newLifePoints);

      if (this.lifePoints <= 0) {
        return `${this.name} wurde besiegt!`;
      } else {
        return `${this.name} wurde getroffen mit ${enemyAttack} Schaden!\nLebenspunkte: ${this.lifePoints} `;
      }
    }
  }
}

class EnemyPokemon {
  constructor() {
    //ein array mit möglichen gegner, setPossibleEnemyPokemon()
    this.grassPokemon = [];
  }

  //zufällig ausgewählter gegner aus dem array, getEnemyPokemonFromGrass()
  encounteredPokemon = {};

  setPossibleEnemyPokemon(pokemon) {
    this.grassPokemon = [...pokemon];
    return "Du gehst durch das hohe Grass...\n";
  }

  getEnemyPokemonFromGrass() {
    this.encounteredPokemon =
      this.grassPokemon[Math.floor(Math.random() * this.grassPokemon.length)];
    return `Oh nein, ein wildes ${this.encounteredPokemon.name} erscheint!`;
  }

  showCurrentLifePoints() {
    return this.encounteredPokemon.showCurrentLifePoints();
  }

  //führt die attacke aus der pokemon klasse aus
  doAttack() {
    return this.encounteredPokemon.doAttack();
  }

  //attackPoints --> doAttack()
  calculateCurrentLifePoints(attackPoints) {
    return this.encounteredPokemon.calculateCurrentLifePoints(attackPoints);
  }
}

class Player {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  choosePokemon(pokemon) {
    return pokemon instanceof Pokemon
      ? `Du hast ${pokemon.name} gewählt!`
      : `${pokemon} ist nicht in deinem Pokedex vorhanden!\nWähle ein neues Pokemon aus.\n`;
  }
}

let bisasam = new Pokemon(
  "Bisasam",
  ["Pflanze", "Gift"],
  Math.floor(Math.random() * (10 - 7 + 1) + 7),
  3
);

let glumanda = new Pokemon(
  "Glumanda",
  "Feuer",
  Math.floor(Math.random() * (15 - 7 + 1) + 7),
  4
);

let shiggy = new Pokemon(
  "Shiggy",
  "Wasser",
  Math.floor(Math.random() * (15 - 7 + 1) + 7),
  3
);

let raupy = new Pokemon(
  "Raupy",
  "Käfer",
  Math.floor(Math.random() * (15 - 7 + 1) + 7),
  2
);

let rattfratz = new Pokemon(
  "Rattfratz",
  "Normal",
  Math.floor(Math.random() * (15 - 7 + 1) + 7),
  2
);

console.log(bisasam);
console.log(glumanda);
console.log(shiggy);
console.log(raupy);

let newPlayer = new Player("Ksenia", 28);
let enemyPokemon = new EnemyPokemon();

//************************************Let's start the Game***************************************************************************************************

console.log("\n***Spielerin***");
console.log(newPlayer);

console.log("\n***Wähle dein Pokemon***");
console.log(newPlayer.choosePokemon("Peter"));
console.log(newPlayer.choosePokemon(shiggy));

console.log("\n***Information anzeigen***");
//tippe entweder "type" oder "attack" ein
console.log(shiggy.showInformation("Type"));
console.log(shiggy.showInformation("Attack"));
console.log(shiggy.showInformation("Power"));

console.log("\n***Gegner erscheint***");
console.log(
  enemyPokemon.setPossibleEnemyPokemon([bisasam, glumanda, raupy, rattfratz])
);
console.log(enemyPokemon.getEnemyPokemonFromGrass());

console.log("\n***Flucht oder Kampf?***");
console.log(
  `Du kannst entweder kämpfen oder fliehen.\nWie entscheidest du dich?\n`
);
console.log(shiggy.flightOrFight("fight")); //tippe fight um zu kämpfen

console.log("\n***Übersicht über die Lebenspunkte***");
console.log(shiggy.showCurrentLifePoints());
console.log(enemyPokemon.showCurrentLifePoints());

console.log("\n***Gegner Attacke***");
console.log(shiggy.calculateCurrentLifePoints(enemyPokemon.doAttack()));

console.log("\n***Deine Attacke***");
console.log(enemyPokemon.calculateCurrentLifePoints(shiggy.doAttack()));

console.log("\n***Gegner Attacke***");
console.log(shiggy.calculateCurrentLifePoints(enemyPokemon.doAttack()));

console.log("\n***Deine Attacke***");
console.log(enemyPokemon.calculateCurrentLifePoints(shiggy.doAttack()));

console.log("\n***Gegner Attacke***");
console.log(shiggy.calculateCurrentLifePoints(enemyPokemon.doAttack()));

console.log("\n***Deine Attacke***");
console.log(enemyPokemon.calculateCurrentLifePoints(shiggy.doAttack()));

console.log("\n***Gegner Attacke***");
console.log(shiggy.calculateCurrentLifePoints(enemyPokemon.doAttack()));

console.log("\n***Deine Attacke***");
console.log(enemyPokemon.calculateCurrentLifePoints(shiggy.doAttack()));

console.log("\n***Gegner Attacke***");
console.log(shiggy.calculateCurrentLifePoints(enemyPokemon.doAttack()));

console.log("\n***Deine Attacke***");
console.log(enemyPokemon.calculateCurrentLifePoints(shiggy.doAttack()));
