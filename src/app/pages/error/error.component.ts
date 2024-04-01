import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  originalText: string = '404, Page Not Found!';
  scrambledText: string = '';
  specialCharacters: string[] = ['#', '@', '!', '$', '%', '*'];
  revealIndices: number[] = [];
  revealIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.startAnimation();
  }

  startAnimation() {
    this.scrambleText();
    this.revealCharacter();
  }

  scrambleText() {
    const textArray = this.originalText.split('');
    const specialCharIndex = Math.floor(
      Math.random() * this.specialCharacters.length
    );
    const specialChar = this.specialCharacters[specialCharIndex];
    this.scrambledText = textArray.map(() => specialChar).join('');
    const length = textArray.length;
    this.revealIndices = [];
    while (this.revealIndices.length < length) {
      const randomIndex = Math.floor(Math.random() * length);
      if (!this.revealIndices.includes(randomIndex)) {
        this.revealIndices.push(randomIndex);
      }
    }
  }

  revealCharacter() {
    const index = this.revealIndices[this.revealIndex];
    if (index !== undefined) {
      const textArray = this.scrambledText.split('');
      textArray[index] = this.originalText[index];
      this.scrambledText = textArray.join('');
      this.revealIndex = (this.revealIndex + 1) % this.revealIndices.length;
      setTimeout(() => {
        this.revealCharacter(); // Continue animating recursively
      }, 100); // Adjust the interval as needed
    } else {
      this.startAnimation(); // Restart the animation
    }
  }
}
