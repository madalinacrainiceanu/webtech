class Robot {
  constructor(name) {
    this.name = name;
  }

  move() {
    console.log(`${this.name} is moving`);
  }
}

const r0 = new Robot("some robot");
r0.move();

class Weapon {
  constructor(description) {
    this.description = description;
  }

  fire() {
    console.log(`${this.description} is firing`);
  }
}

const w0 = new Weapon("laser");
w0.fire();

class CombatRobot extends Robot {
  constructor(name) {
    super(name);
    this.weapons = [];
  }

  addWeapons(w) {
    this.weapons.push(w);
  }

  fire() {
    console.log("firing all weapons");
    this.weapons.forEach((element) => {
      element.fire();
    });
  }
}

const r1 = new CombatRobot("some combat robot");
r1.addWeapons(w0);
r1.move();
r1.fire();

Robot.prototype.fly = function () {
  console.log(`${this.name} is flying`);
};

r1.fly();

// Clasa de bază
class Software {
  constructor(name) {
    this.name = name;
  }

  run() {
    console.log(`${this.name} is running`);
  }
}

// Clasa Plugin (similară cu Weapon din exemplu)
class Plugin {
  constructor(name) {
    this.name = name;
  }

  activate() {
    console.log(`Plugin "${this.name}" is activated`);
  }
}

// Clasa Browser, care moștenește Software
class Browser extends Software {
  constructor(name) {
    super(name); // apelăm constructorul din Software
    this.plugins = []; // inițial, fără pluginuri
  }

  installPlugin(plugin) {
    this.plugins.push(plugin);
    console.log(`Plugin "${plugin.name}" installed in ${this.name}`);
  }

  run() {
    // suprascriem metoda run() din Software
    console.log(`${this.name} browser is now running`);
    if (this.plugins.length > 0) {
      console.log(`Active plugins:`);
      this.plugins.forEach((p) => p.activate());
    } else {
      console.log("No plugins installed");
    }
  }
}

const chrome = new Browser("Google Chrome");
const plugin1 = new Plugin("AdBlock");
const plugin2 = new Plugin("Dark Mode");

chrome.installPlugin(plugin1);
chrome.installPlugin(plugin2);

chrome.run();
