import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  startPoint: string = '';
  endPoint: string = '';
  trips: any[] = [];

  previousEnd: string = '';
  svgHeight = 400;
  svgWidth = 800;
  baseY = 50;
  yStep = 50;

  addTrip() {
    if (!this.startPoint || !this.endPoint) return;

    const trip: any = {};
    trip.start = this.startPoint.substring(0, 3).toUpperCase();
    trip.end = this.endPoint.substring(0, 3).toUpperCase();

    const index = this.trips.length;
    const xGap = 120;

    trip.x1 = 50 + index * xGap;
    trip.x2 = trip.x1 + xGap;

    // Logic to determine trip level
    let level = 1;

    // Level 2 if same start and end found in previous trips
    const sameTripExists = this.trips.some(t => t.start === trip.start && t.end === trip.end);
    if (sameTripExists) {
      level = 2;
    }

    trip.level = level;
    trip.y = this.baseY + (level - 1) * this.yStep;

    this.trips.push(trip);
    this.previousEnd = this.endPoint;

    // Reset input fields
    this.startPoint = '';
    this.endPoint = '';
  }
}
