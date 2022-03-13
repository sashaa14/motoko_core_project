import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import T "dip721_types";

actor class DRC721(_name : Text, _symbol : Text) {

    //Using DIP721 standard, adapted from https://github.com/SuddenlyHazel/DIP721/blob/main/src/DIP721/DIP721.mo
    private stable var tokenPk : Nat = 0;
    
    public type NFT_ID = Nat;

    public type Time = Time.Time;

    private stable var entry_number : NFT_ID = 0;

    public type NFT = {
        id: Nat;
        owner: Principal;
        origin: Principal;
        url: Text;
    };

    private stable var tokenURIEntries : [(T.TokenId, Text)] = [];
    private stable var ownersEntries : [(T.TokenId, Principal)] = [];
    private stable var balancesEntries : [(Principal, Nat)] = [];
    private stable var tokenApprovalsEntries : [(T.TokenId, Principal)] = [];
    private stable var operatorApprovalsEntries : [(Principal, [Principal])] = [];
    private stable var nftEntries : [(NFT_ID, NFT)] = [];

    private let tokenURIs : HashMap.HashMap<T.TokenId, Text> = HashMap.fromIter<T.TokenId, Text>(tokenURIEntries.vals(), 10, Nat.equal, Hash.hash);
    private let owners : HashMap.HashMap<T.TokenId, Principal> = HashMap.fromIter<T.TokenId, Principal>(ownersEntries.vals(), 10, Nat.equal, Hash.hash);
    private let balances : HashMap.HashMap<Principal, Nat> = HashMap.fromIter<Principal, Nat>(balancesEntries.vals(), 10, Principal.equal, Principal.hash);
    private let tokenApprovals : HashMap.HashMap<T.TokenId, Principal> = HashMap.fromIter<T.TokenId, Principal>(tokenApprovalsEntries.vals(), 10, Nat.equal, Hash.hash);
    private let operatorApprovals : HashMap.HashMap<Principal, [Principal]> = HashMap.fromIter<Principal, [Principal]>(operatorApprovalsEntries.vals(), 10, Principal.equal, Principal.hash);

    // NFT Storage
    private let nfts : HashMap.HashMap<NFT_ID, NFT> = HashMap.HashMap<NFT_ID, NFT>(0, Nat.equal, Hash.hash);

    // Create NFTs
    public func mint_nft(url: Text, principal: Principal) : async Bool {
        entry_number += 1;
        var record_nft : NFT = {
            id = entry_number;
            owner = principal;
            origin = principal;
            url = url;
        };
        nfts.put(entry_number, record_nft);
        addToBalance(principal : Principal, 35: Nat);
        return true;
    };

    // Get single NFT
    public query func get_nft(id: Nat) : async ?NFT {
        return nfts.get(id);
    };

    // Get list of ALL NFTs
    public func get_all_nfts() : async [NFT] {
        return Iter.toArray<NFT>(nfts.vals());
    };

    // Get the list of ALL NFTs of a caller / user
    public shared func get_all_users_nfts(p: Principal) : async [NFT] {
        var all : [NFT] = Iter.toArray<NFT>(nfts.vals());

        return Array.filter<NFT>(all, func (n: NFT) : Bool {
            return n.owner == p;
        });
    };

    // Buy NFT
    private func change_owner(id: Nat, new: Principal) : Bool {
        var current = nfts.get(id);
        
        switch(current) {
            case(null) { return false };
            case(?nft) {
                var _new : NFT = {
                    id = nft.id;
                    owner = new;
                    origin = nft.origin;
                    url = nft.url;
                };
                nfts.put(id, _new);
                return true;
            };
        };
    };

    public func buy_NFT(id: Nat, b: Principal, s: Principal): async Bool {
        var changed = change_owner(id, b);
        if (changed) {
            addToBalance(s, 50);
            takeFromBalance(b, 50);
            return true;
        };
        return false;
    };

    // Balances
    private func takeFromBalance(account : Principal, price: Nat) {
        switch (balances.get(account)) {
            case (null) { balances.put(account, 0); };
            case (?v) { balances.put(account, v - price); };
        };
    };

    private func addToBalance(account : Principal, price: Nat) {
        switch (balances.get(account)) {
            case null { balances.put(account, price); };
            case (?v) { balances.put(account, v + price); };
        };
    };

    public func balanceOf(p : Principal) : async ?Nat {
        return balances.get(p);
    };

    system func preupgrade() {
        tokenURIEntries := Iter.toArray(tokenURIs.entries());
        ownersEntries := Iter.toArray(owners.entries());
        balancesEntries := Iter.toArray(balances.entries());
        tokenApprovalsEntries := Iter.toArray(tokenApprovals.entries());
        operatorApprovalsEntries := Iter.toArray(operatorApprovals.entries());
        
    };

    system func postupgrade() {
        tokenURIEntries := [];
        ownersEntries := [];
        balancesEntries := [];
        tokenApprovalsEntries := [];
        operatorApprovalsEntries := [];
    };
};