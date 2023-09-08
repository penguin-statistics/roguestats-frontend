/**
 * @generated SignedSource<<95b20fee10748707a6dc49b9c5fcf5f3>>
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
  } | null;
  readonly researches: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    } | null>;
  } | null;
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
  "name": "node",
  "plural": false,
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
      {
        "alias": null,
        "args": null,
        "concreteType": "ResearchConnection",
        "kind": "LinkedField",
        "name": "researches",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "concreteType": "ResearchEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "kind": "RequiredField",
                  "field": (v2/*: any*/),
                  "action": "NONE",
                  "path": "researches.edges.node"
                }
              ],
              "storageKey": null
            },
            "action": "NONE",
            "path": "researches.edges"
          }
        ],
        "storageKey": null
      },
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
      {
        "alias": null,
        "args": null,
        "concreteType": "ResearchConnection",
        "kind": "LinkedField",
        "name": "researches",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ResearchEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
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
    "cacheID": "c5a297c8b4b1af7f65ca39c34c745303",
    "id": null,
    "metadata": {},
    "name": "ResearchIndexPageQuery",
    "operationKind": "query",
    "text": "query ResearchIndexPageQuery {\n  researches {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  me {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6efb243f83732802c6ca8a9507c1e0ff";

export default node;
