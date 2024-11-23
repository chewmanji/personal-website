class TypeWriter {
  constructor(element, { speed = 75, pauseBetween = 400 } = {}) {
    this.element = element;
    this.speed = speed;
    this.pauseBetween = pauseBetween;
  }

  async type(text) {
    for (const char of text) {
      this.element.innerHTML += char;
      await this.delay(this.speed);
    }
  }

  async erase(length) {
    for (let i = 0; i < length; i++) {
      this.element.textContent = this.element.textContent.slice(0, -1);
      await this.delay(this.speed);
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async typeSequence(texts) {
    for (const { text, erase } of texts) {
      await this.type(text);
      await this.delay(this.pauseBetween);
      if (erase) await this.erase(text.length);
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const element1 = document.getElementById("l1");
  let writer = new TypeWriter(element1);
  await writer.typeSequence([
    { text: "I'm a web develo", erase: true },
    { text: "I'm a software engineer", erase: false },
  ]);
  const element2 = document.getElementById("l2");
  writer = new TypeWriter(element2);
  await writer.typeSequence([
    { text: "specializing in web development", erase: false },
  ]);
  element1.classList.add("shimmer-right");
  element1.addEventListener("animationend", () => {
    element2.classList.add("shimmer-left");
  });
  const emoji = document.getElementById("e");
  emoji.classList.add("show-slow");
});
