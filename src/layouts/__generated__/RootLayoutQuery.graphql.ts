/**
 * @generated SignedSource<<0b58e34b7341263e2655d132a8506a46>>
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
    readonly email: string | null;
    readonly id: string;
    readonly name: string;
  };
};
export type RootLayoutQuery = {
  response: RootLayoutQuery$data;
  variables: RootLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootLayoutQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootLayoutQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "66ed04007ab36d0c80c812f45468fe7c",
    "id": null,
    "metadata": {},
    "name": "RootLayoutQuery",
    "operationKind": "query",
    "text": "query RootLayoutQuery {\n  me {\n    id\n    email\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "420728ad5e8bba82f5b18c24f57e06da";

export default node;
