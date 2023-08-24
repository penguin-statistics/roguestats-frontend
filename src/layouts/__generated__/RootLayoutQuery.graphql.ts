/**
 * @generated SignedSource<<0c18f39f244982e1008b19d84695db72>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RootLayoutQuery$variables = {};
export type RootLayoutQuery$data = {
  readonly me: {
    readonly name: string;
  };
};
export type RootLayoutQuery = {
  response: RootLayoutQuery$data;
  variables: RootLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootLayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootLayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3ba54ac9b06bf63b2e33952390c9ae58",
    "id": null,
    "metadata": {},
    "name": "RootLayoutQuery",
    "operationKind": "query",
    "text": "query RootLayoutQuery {\n  me {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3524ad689b421b566f69e9e46c2a451f";

export default node;
