# The Graph

## Building Subgraphs with Subgraph Studio

* Installing The Graph CLI

```npm install -g @graphprotocol/graph-cli```

* Initializing a Subgraph based off of the Smart Contract Address passed in as the Argument to --from-contract
* The Initialization including the Fetching of ABIs and Saving them in the ABIs Directory
* The Flag --index-events will automatically populate Code and Configuration in schema.graphql and src/mapping.ts based on the Events emitted from the Smart Contract

```graph init --contract-name Token --index-events --product subgraph-studio --from-contract 0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7```

* After the GraphQL Schema is ready, it can be used to generate the Entities locally to start using in the Mappings

```graph codegen```

* To deploy the Subgraph the Deploy Key is needed to pass

```graph auth --studio```

```graph deploy --studio <subgraph-name>```