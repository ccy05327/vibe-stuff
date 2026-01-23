class Section {
  constructor(name, color, cards = []) {
    this.name = name;
    this.color = color;
    this.cards = cards;
  }

  generateHTML() {
    const cardsHTML = this.cards.map((card) => card.generateHTML()).join("\n");
    return `
      <section>
        <h2 onclick="toggleSection('${this.name}')" style="color: ${
      this.color
    };">
          ${this.name.toUpperCase()}
        </h2>
        <div id="${this.name}-content" class="section-content ${
      this.name
    }-section">
          ${cardsHTML}
        </div>
      </section>
    `;
  }
}

export default Section;
