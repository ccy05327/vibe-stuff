class Card {
  constructor(title, description, link, section) {
    this.title = title;
    this.description = description;
    this.link = link;
    this.section = section;
  }

  generateHTML() {
    return `
      <a href="${this.link}" class="card">
        <div class="card-title">${this.title}</div>
        <div class="card-description">${this.description}</div>
      </a>
    `;
  }
}

export default Card;
