/**
 * @generated SignedSource<<3e0363ea4a0cf96608393be14d14d2fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NewEvent = {
  content: any;
  researchId: string;
  userAgent?: string | null;
};
export type ResearchDetailPageMutation$variables = {
  input: NewEvent;
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
    "cacheID": "c35690561c01de9e6b5ec59862b29670",
    "id": null,
    "metadata": {},
    "name": "ResearchDetailPageMutation",
    "operationKind": "mutation",
    "text": "mutation ResearchDetailPageMutation(\n  $input: NewEvent!\n) {\n  createEvent(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "90c2d827dc2c86422a6490b0cf930e80";

export default node;
