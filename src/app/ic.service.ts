import { Injectable } from '@angular/core';
import { Principal } from '@dfinity/principal';

const ic_service = require('../declarations/backend').backend;
declare const window: any;


@Injectable({
  providedIn: 'root'
})
export class IcService {

  constructor() { }
  public async greet(name:string) {
    return await ic_service.greet(name);
  }

  public async mintNFT(url: string, principal: string) {
    const _principal = Principal.fromText(principal);
    return await ic_service.mint_nft(url, _principal);
  }

  public async getAllNFTs() {
    const nfts = await ic_service.get_all_nfts();
    return nfts;
  }

  public async buyNFT(id: number, buyer: string, seller: string) {
    const _buyer = Principal.fromText(buyer);
    return await ic_service.buy_NFT(id, _buyer, seller);
  };

  public async getBalance(p: string) {
    const _principal = Principal.fromText(p);
    return await ic_service.balanceOf(_principal);
  }

  principalOfCaller = "";
  public async connectPlug() {

    const connected = await window.ic.plug.isConnected();
    
    if (!connected) {
      await window.ic.plug.requestConnect();
    }

    if (!window.ic.plug.agent) {
      await window.ic.plug.createAgent();
    }

    const principal = await window.ic.plug.agent.getPrincipal();

    let principalId = principal.toString();

    this.principalOfCaller = principal;

  }
}