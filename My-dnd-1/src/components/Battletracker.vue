<template>
    <div class="battletracker">
      <div class="turn-indicator">
        <h2>Turn - {{ currentCombatantName }}</h2>
        <div class="decorated-divider">
          <img src="../assets/svg/gold-decoration-line.svg" alt="Line Decoration" class="line" />
        </div>
        <h3>Round - {{ currentRound }}</h3>
      </div>
  
      <div class="combatants">
        <div
          v-for="(combatant, index) in sortedCombatants"
          :key="index"
          :class="['combatant', { active: index === turnIndex }]"
        >
          <input type="text" v-model="combatant.name" placeholder="Name" class="name" />
  
          <div class="attribute">
            <img src="../assets/svg/initiative-icon.svg" alt="Initiative" />
            <div class="attribute-details">
              <label>Initiative</label>
              <input type="number" v-model.number="combatant.initiative" maxlength="4" @blur="sortCombatants" />
            </div>
          </div>
  
          <div class="attribute">
            <img src="../assets/svg/shield-icon.svg" alt="Armor Class" />
            <div class="attribute-details">
              <label>AC</label>
              <input type="number" v-model.number="combatant.ac" maxlength="4" />
            </div>
          </div>
  
          <div class="health">
            <img src="../assets/svg/health-icon.svg" alt="Health" />
            <div class="attribute-details">
              <label>Max</label>
              <input type="number" v-model.number="combatant.maxHp" maxlength="4" />
            </div>
            <div class="attribute-details">
              <label>Current</label>
              <input type="number" v-model.number="combatant.currentHp" maxlength="4" />
            </div>
            <div class="attribute-details">
              <label>Temp</label>
              <input type="number" v-model.number="combatant.tempHp" maxlength="4" />
            </div>
          </div>
  
          <div class="damage-control">
            <button @click="applyHeal(index)" class="heal">Heal</button>
            <input type="number" v-model.number="combatant.damageValue" class="damage-input" maxlength="4" />
            <button @click="applyDamage(index)" class="damage">Damage</button>
          </div>
  
          <button @click="removeCombatant(index)" class="remove">&times;</button>
        </div>
      </div>
  
      <button @click="addCombatant" class="add-combatant">Add Combatant</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Battletracker',
    data() {
      return {
        combatants: [],
        turnIndex: 0,
        currentRound: 1,
      };
    },
    computed: {
      sortedCombatants() {
        return [...this.combatants].sort((a, b) => b.initiative - a.initiative);
      },
      currentCombatantName() {
        return this.combatants[this.turnIndex]?.name || 'None';
      },
    },
    methods: {
      addCombatant() {
        this.combatants.push({
          name: '',
          initiative: 0,
          ac: 0,
          maxHp: 0,
          currentHp: 0,
          tempHp: 0,
          damageValue: 0,
        });
      },
      removeCombatant(index) {
        this.combatants.splice(index, 1);
        if (this.turnIndex >= this.combatants.length) {
          this.turnIndex = 0;
          this.currentRound++;
        }
      },
      applyHeal(index) {
        const combatant = this.combatants[index];
        combatant.currentHp = Math.min(
          combatant.currentHp + combatant.damageValue,
          combatant.maxHp
        );
        combatant.damageValue = 0;
      },
      applyDamage(index) {
        const combatant = this.combatants[index];
        let damage = combatant.damageValue;
  
        if (combatant.tempHp > 0) {
          const tempHpUsed = Math.min(damage, combatant.tempHp);
          combatant.tempHp -= tempHpUsed;
          damage -= tempHpUsed;
        }
  
        combatant.currentHp = Math.max(combatant.currentHp - damage, 0);
        combatant.damageValue = 0;
      },
      sortCombatants() {
        this.combatants.sort((a, b) => b.initiative - a.initiative);
      },
    },
    watch: {
      turnIndex(newIndex) {
        if (newIndex >= this.combatants.length) {
          this.turnIndex = 0;
          this.currentRound++;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .battletracker {
    padding: 20px;
    font-family: 'Raleway', sans-serif;
  }
  
  .turn-indicator {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .turn-indicator h2 {
    font-size: 2rem;
    color: var(--color-secondary);
    margin-bottom: 5px;
  }
  
  .decorated-divider {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
  
  .decorated-divider .decoration {
    height: 200px;
  }
  
  .decorated-divider .line {
    flex: 1;
    height: 2px;
    background-color: var(--color-secondary);
    max-width: 50%;
  }
  
  .decorated-divider .flipped-horizontal {
    transform: scaleX(-1);
  }
  
  .combatants {
    margin-top: 20px;
  }
  
  .combatant {
    background-color: var(--white-pure);
    border: 1px solid transparent;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr) auto;
    gap: 15px;
    align-items: center;
    position: relative;
  }
  
  .combatant.active {
    border-color: var(--color-secondary);
    background-color: #d9d9d9;
  }
  
  .name {
    font-family: 'Cinzel', serif;
    font-size: 1.5rem;
    border: none;
    border-bottom: 1px solid var(--grey-medium);
    background: none;
    width: 100%;
    transition: border-color 0.2s;
  }
  
  .name:focus {
    border-bottom: 1px solid var(--color-secondary);
    outline: none;
  }
  
  .attribute {
    display: flex;
    align-items: center;
  }
  
  .attribute img {
    height: 40px;
    margin-right: 10px;
  }
  
  .attribute-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .attribute-details input {
    border: none;
    border-bottom: 1px solid var(--grey-medium);
    background: none;
    transition: border-color 0.2s;
    width: 50px;
  }
  
  .attribute-details input:focus {
    border-bottom: 1px solid var(--color-secondary);
    outline: none;
  }
  
  .health {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .health img {
    height: 40px;
    margin-right: 10px;
  }
  
  .damage-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .damage-input {
    border: 1px solid black;
    width: 80px;
    height: 30px;
  }
  
  .heal,
  .damage {
    border: 1px solid;
    width: 80px;
    height: 30px;
    cursor: pointer;
    background-color: var(--white-pure);
    color: var( --color-text-dark);
  }
  
  .heal {
    border-color: var(--green-strong);
  }
  
  .damage {
    border-color: var(--red-danger);
  }
  
  .remove {
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    color: var(--red-danger);
  }
  
  .add-combatant {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: var(--white-pure);
    border: 1px solid var( --color-text-dark);
    border-radius: 8px;
    cursor: pointer;
    color: var( --color-text-dark);
    font-size: 1rem;
  }
  </style>
  