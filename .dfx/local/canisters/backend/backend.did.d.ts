import type { Principal } from '@dfinity/principal';
export interface DRC721 {
  'balanceOf' : (arg_0: Principal) => Promise<[] | [bigint]>,
  'buy_NFT' : (arg_0: bigint, arg_1: Principal, arg_2: Principal) => Promise<
      boolean
    >,
  'get_all_nfts' : () => Promise<Array<NFT>>,
  'get_all_users_nfts' : (arg_0: Principal) => Promise<Array<NFT>>,
  'get_nft' : (arg_0: bigint) => Promise<[] | [NFT]>,
  'mint_nft' : (arg_0: string, arg_1: Principal) => Promise<boolean>,
}
export interface NFT {
  'id' : bigint,
  'url' : string,
  'owner' : Principal,
  'origin' : Principal,
}
export interface _SERVICE extends DRC721 {}
