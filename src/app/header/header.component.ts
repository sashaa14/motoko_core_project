import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IcService } from '../ic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() principal : any;

  constructor(private ics: IcService) { }

  ngOnInit(): void {
  }

}
