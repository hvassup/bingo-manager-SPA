import {HostBinding} from '@angular/core';

export class CoronaFloater {
  public y = 500;
  public x = 500;
  public width = 50;
  public height = 50;
  private _dirX: number;
  private _dirY: number;
  constructor() {
    this._calcFloater();
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
  }

  public updatePosition() {
    this.x += this._dirX;
    this.y += this._dirY;
    if (!this._isInside(this.x, this.y)) {
      this._calcFloater();
    }
  }

  private _isInside(x, y): boolean {
    const padding = 50;
    return x + this.width + padding > 0 &&
      x < window.innerWidth &&
      y + this.height + padding > 0 &&
      y < window.innerHeight;
  }

  private _calcFloater() {
    this.height = this.width = Math.round(50 + Math.random() * 100);
    this._dirX = (Math.random() - 0.5) * (this.width / 250);
    this._dirY = (Math.random() - 0.5) * (this.width / 250);
    const moveCount = Math.min(
      Math.abs((window.innerWidth + this.width) / this._dirX),
      Math.abs((window.innerHeight + this.height) / this._dirY)
    );
    this.x = window.innerWidth / 2 - moveCount / 2 * this._dirX - this.width / 2;
    this.y = window.innerHeight / 2 - moveCount / 2 * this._dirY - this.height / 2;
  }

}
