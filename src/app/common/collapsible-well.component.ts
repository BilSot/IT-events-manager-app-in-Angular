import {Component} from '@angular/core';

@Component({
  selector: 'app-collapsible-well',
  template: `
    <div class="well pointable" (click)="toggleContent()">
      <h4>
        <ng-content select="div[well-title]"></ng-content>
      </h4>
      <ng-content *ngIf="visible" select="div[well-body]"></ng-content>
    </div>`
})
export class CollapsibleWellComponent{
  visible:boolean = false;

  toggleContent(): void{
    this.visible = !this.visible;
  }
}
