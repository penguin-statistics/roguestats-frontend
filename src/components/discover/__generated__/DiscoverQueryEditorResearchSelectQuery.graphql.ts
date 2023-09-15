/**
 * @generated SignedSource<<6cf5e769971609dbaaadf2a8f979e737>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type DiscoverQueryEditorResearchSelectQuery$variables = {};
export type DiscoverQueryEditorResearchSelectQuery$data = {
  readonly researches: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly schema: any;
      };
    } | null>;
  };
};
export type DiscoverQueryEditorResearchSelectQuery = {
  response: DiscoverQueryEditorResearchSelectQuery$data;
  variables: DiscoverQueryEditorResearchSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "Research",
  "kind": "LinkedField",
  "name": "node",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "schema",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DiscoverQueryEditorResearchSelectQuery",
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
                  "field": (v0/*: any*/),
                  "action": "THROW",
                  "path": "researches.edges.node"
                }
              ],
              "storageKey": null
            },
            "action": "THROW",
            "path": "researches.edges"
          }
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
    "name": "DiscoverQueryEditorResearchSelectQuery",
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
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2320920052c0248d524d9daf0d4028b5",
    "id": null,
    "metadata": {},
    "name": "DiscoverQueryEditorResearchSelectQuery",
    "operationKind": "query",
    "text": "query DiscoverQueryEditorResearchSelectQuery {\n  researches {\n    edges {\n      node {\n        id\n        name\n        schema\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa00be588c2a8406027e85b20d827e7c";

export default node;
