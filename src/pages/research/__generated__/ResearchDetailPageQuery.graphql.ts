/**
 * @generated SignedSource<<d847ee73f3ba8189a8ffaca180aabb25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ResearchDetailPageQuery$variables = {
  id: string;
};
export type ResearchDetailPageQuery$data = {
  readonly research: {
    readonly id: string;
    readonly name: string;
    readonly schema: any;
  } | null;
};
export type ResearchDetailPageQuery = {
  response: ResearchDetailPageQuery$data;
  variables: ResearchDetailPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Research",
    "kind": "LinkedField",
    "name": "research",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResearchDetailPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResearchDetailPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b5e6146dd3450565b87bb7b8890a74d9",
    "id": null,
    "metadata": {},
    "name": "ResearchDetailPageQuery",
    "operationKind": "query",
    "text": "query ResearchDetailPageQuery(\n  $id: ID!\n) {\n  research(id: $id) {\n    id\n    name\n    schema\n  }\n}\n"
  }
};
})();

(node as any).hash = "ccebad1bf7ce856216a3aca0aac71ef4";

export default node;
