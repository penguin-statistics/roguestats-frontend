/**
 * @generated SignedSource<<5cf4b54222699e6733e06cdd79262672>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateEventInput = {
  content: any;
  researchID: string;
  userAgent: string;
};
export type ResearchDetailPageMutation$variables = {
  input: CreateEventInput;
};
export type ResearchDetailPageMutation$data = {
  readonly createEvent: {
    readonly id: string;
  };
};
export type ResearchDetailPageMutation = {
  response: ResearchDetailPageMutation$data;
  variables: ResearchDetailPageMutation$variables;
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
    "concreteType": "Event",
    "kind": "LinkedField",
    "name": "createEvent",
    "plural": false,
    "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResearchDetailPageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResearchDetailPageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c88b346c4e136135b833c965b58edd7a",
    "id": null,
    "metadata": {},
    "name": "ResearchDetailPageMutation",
    "operationKind": "mutation",
    "text": "mutation ResearchDetailPageMutation(\n  $input: CreateEventInput!\n) {\n  createEvent(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc67b9a226aff8c3aefa35154175c5a5";

export default node;
