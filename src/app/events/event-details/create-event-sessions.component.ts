import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ISession} from '../shared';
import {restrictedWords} from '../shared/restricted-words.validator';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-event-sessions.component.html',
  styles: [
      `em {
      float: right;
      color: #E05C65;
      padding-left: 10px;
    }

    .error input, .error textarea, .error select {
      background-color: #E3C3C5;
    }

    .error ::-webkit-input-placeholder {
      color: #999;
    }

    .error ::-moz-placeholder {
      color: #999;
    }

    .error :-moz-placeholder {
      color: #999;
    }

    .error :-ms-input-placeholder {
      color: #999;
    }`
  ]
})
export class CreateEventSessionsComponent implements OnInit {
  newSessionForm: FormGroup;
  sessionName: FormControl;
  presenter: FormControl;
  duration: FormControl;
  experienceLevel: FormControl;
  comments: FormControl;
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelCreation = new EventEmitter();

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.sessionName = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.experienceLevel = new FormControl('', Validators.required);
    this.comments = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);
    this.newSessionForm = new FormGroup({
      sessionName: this.sessionName,
      presenter: this.presenter,
      duration: this.duration,
      level: this.experienceLevel,
      abstract: this.comments
    });
  }

  saveSession(formValues): void {
    const newSession: ISession = {
      id: undefined,
      name: formValues.sessionName,
      presenter: formValues.presenter,
      duration: +formValues.duration,
      level: formValues.level,
      abstract: formValues.abstract,
      voters: []
    };
    this.saveNewSession.emit(newSession);
  }

  cancel(): void{
    this.cancelCreation.emit();
  }
}
