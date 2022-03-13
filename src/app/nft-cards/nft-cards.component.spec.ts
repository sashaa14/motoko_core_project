import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftCardsComponent } from './nft-cards.component';

describe('NftCardsComponent', () => {
  let component: NftCardsComponent;
  let fixture: ComponentFixture<NftCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
