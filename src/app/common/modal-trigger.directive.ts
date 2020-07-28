import {Directive, Inject, ElementRef, OnInit, Input} from '@angular/core';
import {JQ_TOKEN} from './jQuery.service';

@Directive({
  selector: '[appModalTrigger]'
})
export class ModalTriggerDirective implements OnInit{
  el: HTMLElement;
  @Input('appModalTrigger') modalId: string;
  constructor(@Inject(JQ_TOKEN) private jq: any, private ref: ElementRef) {
    this.el = ref.nativeElement;
  }

  ngOnInit(): void {
    this.el.addEventListener('click', event => {
      this.jq(`#${this.modalId}`).modal({});
    });
  }
}
