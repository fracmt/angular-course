import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-warning',
  template: `
    <p>This a warning alert!</p>
  `
  ,
  styles: [
    `
      p {
        padding: 20px;
        background-color: mistyrose;
        border: 1px solid red;
      }
    `
  ]
})
export class AlertWarningComponent {

  constructor() { }

}
