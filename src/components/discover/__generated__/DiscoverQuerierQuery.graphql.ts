/**
 * @generated SignedSource<<c6c1c51b16f997ff27520b31e3789516>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type GroupCountInput = {
  researchId: string;
  resultMappingInput: string;
  where?: EventWhereInput | null;
};
export type EventWhereInput = {
  and?: ReadonlyArray<EventWhereInput> | null;
  contentJsonPredicate?: any | null;
  createdAt?: any | null;
  createdAtGT?: any | null;
  createdAtGTE?: any | null;
  createdAtIn?: ReadonlyArray<any> | null;
  createdAtLT?: any | null;
  createdAtLTE?: any | null;
  createdAtNEQ?: any | null;
  createdAtNotIn?: ReadonlyArray<any> | null;
  hasResearch?: boolean | null;
  hasResearchWith?: ReadonlyArray<ResearchWhereInput> | null;
  hasUser?: boolean | null;
  hasUserWith?: ReadonlyArray<UserWhereInput> | null;
  id?: string | null;
  idContainsFold?: string | null;
  idEqualFold?: string | null;
  idGT?: string | null;
  idGTE?: string | null;
  idIn?: ReadonlyArray<string> | null;
  idLT?: string | null;
  idLTE?: string | null;
  idNEQ?: string | null;
  idNotIn?: ReadonlyArray<string> | null;
  not?: EventWhereInput | null;
  or?: ReadonlyArray<EventWhereInput> | null;
};
export type ResearchWhereInput = {
  and?: ReadonlyArray<ResearchWhereInput> | null;
  hasEvents?: boolean | null;
  hasEventsWith?: ReadonlyArray<EventWhereInput> | null;
  id?: string | null;
  idContainsFold?: string | null;
  idEqualFold?: string | null;
  idGT?: string | null;
  idGTE?: string | null;
  idIn?: ReadonlyArray<string> | null;
  idLT?: string | null;
  idLTE?: string | null;
  idNEQ?: string | null;
  idNotIn?: ReadonlyArray<string> | null;
  name?: string | null;
  nameContains?: string | null;
  nameContainsFold?: string | null;
  nameEqualFold?: string | null;
  nameGT?: string | null;
  nameGTE?: string | null;
  nameHasPrefix?: string | null;
  nameHasSuffix?: string | null;
  nameIn?: ReadonlyArray<string> | null;
  nameLT?: string | null;
  nameLTE?: string | null;
  nameNEQ?: string | null;
  nameNotIn?: ReadonlyArray<string> | null;
  not?: ResearchWhereInput | null;
  or?: ReadonlyArray<ResearchWhereInput> | null;
};
export type UserWhereInput = {
  and?: ReadonlyArray<UserWhereInput> | null;
  hasEvents?: boolean | null;
  hasEventsWith?: ReadonlyArray<EventWhereInput> | null;
  id?: string | null;
  idContainsFold?: string | null;
  idEqualFold?: string | null;
  idGT?: string | null;
  idGTE?: string | null;
  idIn?: ReadonlyArray<string> | null;
  idLT?: string | null;
  idLTE?: string | null;
  idNEQ?: string | null;
  idNotIn?: ReadonlyArray<string> | null;
  not?: UserWhereInput | null;
  or?: ReadonlyArray<UserWhereInput> | null;
};
export type DiscoverQuerierQuery$variables = {
  input: GroupCountInput;
};
export type DiscoverQuerierQuery$data = {
  readonly groupCount: {
    readonly results: ReadonlyArray<{
      readonly category: any;
      readonly count: number;
    }>;
    readonly total: number;
  };
};
export type DiscoverQuerierQuery = {
  response: DiscoverQuerierQuery$data;
  variables: DiscoverQuerierQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "GroupCountResult",
    "kind": "LinkedField",
    "name": "groupCount",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CategoryCount",
        "kind": "LinkedField",
        "name": "results",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "count",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "total",
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
    "name": "DiscoverQuerierQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DiscoverQuerierQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "96c7283347a391893fd08341fd50ea09",
    "id": null,
    "metadata": {},
    "name": "DiscoverQuerierQuery",
    "operationKind": "query",
    "text": "query DiscoverQuerierQuery(\n  $input: GroupCountInput!\n) {\n  groupCount(input: $input) {\n    results {\n      category\n      count\n    }\n    total\n  }\n}\n"
  }
};
})();

(node as any).hash = "5a9fb4096b1e96aa9974f1ae7a4c29f2";

export default node;
