import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { IcService } from './ic.service' ;
declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title : string = 'NFT Minter Motoko';
  ic_response : string = '';
  connected = false;
  principal = null;

  constructor(private icService:IcService){
  }

  ngOnInit(): void {}

  public async getGreet(name:string){
    this.ic_response = await this.icService.greet(name);
  }

  public async onLogin(data: any) {
    await this.icService.connectPlug();
    const p = await window.ic.plug.agent.getPrincipal();
    this.principal = p.toString();
    this.connected = (window.ic.plug.agent !== null && this.principal !== null ) ? true : false;
  }

}