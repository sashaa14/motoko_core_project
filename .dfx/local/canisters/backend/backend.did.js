export const idlFactory = ({ IDL }) => {
  const NFT = IDL.Record({
    'id' : IDL.Nat,
    'url' : IDL.Text,
    'owner' : IDL.Principal,
    'origin' : IDL.Principal,
  });
  const DRC721 = IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Nat)], []),
    'buy_NFT' : IDL.Func(
        [IDL.Nat, IDL.Principal, IDL.Principal],
        [IDL.Bool],
        [],
      ),
    'get_all_nfts' : IDL.Func([], [IDL.Vec(NFT)], []),
    'get_all_users_nfts' : IDL.Func([IDL.Principal], [IDL.Vec(NFT)], []),
    'get_nft' : IDL.Func([IDL.Nat], [IDL.Opt(NFT)], ['query']),
    'mint_nft' : IDL.Func([IDL.Text, IDL.Principal], [IDL.Bool], []),
  });
  return DRC721;
};
export const init = ({ IDL }) => { return [IDL.Text, IDL.Text]; };
