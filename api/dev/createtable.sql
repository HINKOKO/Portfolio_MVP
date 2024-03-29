



CREATE TABLE auction (
  auction_id serial PRIMARY KEY,
  token_id int UNIQUE NOT NULL,
  token_contract VARCHAR(42) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  sale_starts TIMESTAMP,
  sale_ends TIMESTAMP,
  blockchain VARCHAR(20) NOT NULL,
  token_standard VARCHAR(8) NOT NULL
);--1/n auction to offer


CREATE TABLE bidder (
  bidder_id serial PRIMARY KEY,
  wallet_id VARCHAR(42) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL
);-- n/1 bidder to offer

CREATE TABLE offer (
  offer_id serial PRIMARY KEY,
  created_on TIMESTAMP NOT NULL,
  auction_id int NOT NULL,
  FOREIGN KEY (auction_id) REFERENCES auction (auction_id) ON DELETE CASCADE,
  bidder_id int NOT NULL,
  FOREIGN KEY (bidder_id) REFERENCES bidder (bidder_id) ON DELETE CASCADE

);

-- NEXT PART HAS TO BE LOAD LATER ON

CREATE TABLE transfer (
  transfer_id serial PRIMARY KEY,
  created_on TIMESTAMP NOT NULL,
  auction_id int NOT NULL,
  FOREIGN KEY (auction_id) REFERENCES auction (auction_id),
  token_id int NOT NULL,
  FOREIGN KEY (token_id) REFERENCES auction (token_id),
  bidder_id int NOT NULL,
  FOREIGN KEY (bidder_id) REFERENCES bidder (bidder_id)
);
