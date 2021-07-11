import {
  /* Events that allow to have Type-Safety */
  TokenURIUpdated as TokenURIUpdatedEvent,
  TokenMetadataURIUpdated as TokenMetadataURIUpdatedEvent,
  Transfer as TransferEvent,
  /* Reference/Class that allows to interact with the Smart Cotnract */
  Token as TokenContract
} from "../generated/Token/Token"

import {
  /* Classes that allow to inetract with The Graph Node */
  Token, User
} from '../generated/schema'

export function handleTransfer(event: TransferEvent): void {
  /* Interact with the existing The Graph Node - load Token if exists otherwise create Token */
  let token = Token.load(event.params.tokenId.toString());
  if (!token) {
    token = new Token(event.params.tokenId.toString());
    token.creator = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;
    token.createdAtTimestamp = event.block.timestamp;

    /* Callign the Smart Contract to get additional Information for the Token */
    let tokenContract = TokenContract.bind(event.address);
    token.contentURI = tokenContract.tokenURI(event.params.tokenId);
    token.metadataURI = tokenContract.tokenMetadataURI(event.params.tokenId);
  }

  /* Updating the Owner of the Token */
  token.owner = event.params.to.toHexString();
  token.save();

  /* Interact with the existing The Graph Node - load User if exists otherwise create User */
  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}

export function handleTokenURIUpdated(event: TokenURIUpdatedEvent): void {
  /* Fetching the Token from The Graph Node and updating it */
  let token = Token.load(event.params._tokenId.toString());
  token.contentURI = event.params._uri;
  token.save();
}

export function TokenMetadataURIUpdated(event: TokenMetadataURIUpdatedEvent): void {
  /* Fetching the Token from The Graph Node and updating it */
  let token = Token.load(event.params._tokenId.toString());
  token.metadataURI = event.params._uri;
  token.save();
}
