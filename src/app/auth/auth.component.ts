import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @Input() principal: any;
  @Output() onLogin = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  login() {
    this.onLogin.emit();
  }
  

}
