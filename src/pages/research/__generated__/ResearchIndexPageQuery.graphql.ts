/**
 * @generated SignedSource<<e42e240fe44552fc7974d87eebb0f3c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ResearchIndexPageQuery$variables = {};
export type ResearchIndexPageQuery$data = {
  readonly me: {
    readonly name: string;
  };
  readonly researches: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
};
export type ResearchIndexPageQuery = {
  response: ResearchIndexPageQuery$data;
  variables: ResearchIndexPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Research",
  "kind": "LinkedField",
  "name": "researches",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ResearchIndexPageQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
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
    "name": "ResearchIndexPageQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "307391406e65240128dd3e73628fb8e4",
    "id": null,
    "metadata": {},
    "name": "ResearchIndexPageQuery",
    "operationKind": "query",
    "text": "query ResearchIndexPageQuery {\n  researches {\n    id\n    name\n  }\n  me {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "cb1d3ec39a408aec69dccd0558cc4ee0";

export default node;
