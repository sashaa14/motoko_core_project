import { Component, Input, OnInit } from '@angular/core';
import { IcService } from '../ic.service';
import { Principal } from '@dfinity/principal';

declare var UIkit: any;

@Component({
  selector: 'app-nft-cards',
  templateUrl: './nft-cards.component.html',
  styleUrls: ['./nft-cards.component.css']
})
export class NftCardsComponent implements OnInit {
  @Input() principal: any;
  allNFTs: any = [];
  myNFTs: any = [];
  url: string = "";
  selectedNFT: any;
  currentBalance: number = 0;

  constructor(private ics: IcService) { }

  ngOnInit(): void {
    this.getAllNFTs();
  }

  getAllNFTs() {
    this.ics.getAllNFTs().then((data: any) => {
      this.allNFTs = data;
      this.myNFTs = this.allNFTs.filter((i: any) => {
        if (i.owner.toText() === this.principal) {
          return i;
        };
      });
    });
  };

  mint() {
    this.ics.mintNFT(this.url, this.principal).then((data : boolean) => {
      UIkit.modal.alert((data) ? 'NFT Minted! You earned 35 FOX' : 'Ooops, there was an error!').then(() => {});
      this.getAllNFTs();
      this.url = "";
    });
  };

  preBuyNFT(nft: any) {
    this.ics.getBalance(this.principal).then((balance: number | null) => {
      this.currentBalance = (balance ? balance : 0);
      console.log(this.currentBalance);
      this.selectedNFT = nft;
      UIkit.modal(`#modal-buy`).show();
    });
  };

  buyNFT(nft: any) {
    this.ics.buyNFT(nft.id, this.principal, nft.owner).then((data: boolean) => {
      UIkit.modal.alert((data) ? 'NFT Bought - You can see it in your profile' : 'Ooops, there was an error!').then(() => {});
      this.getAllNFTs();
    });
  };

}
