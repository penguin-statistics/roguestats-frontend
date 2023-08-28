/**
 * @generated SignedSource<<ee41b546fd9c76d9397d2b49bfb00a9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RequestPasswordResetInput = {
  email: string;
  turnstileResponse: string;
};
export type RequestPasswordResetMutation$variables = {
  input: RequestPasswordResetInput;
};
export type RequestPasswordResetMutation$data = {
  readonly requestPasswordReset: boolean;
};
export type RequestPasswordResetMutation = {
  response: RequestPasswordResetMutation$data;
  variables: RequestPasswordResetMutation$variables;
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
    "kind": "ScalarField",
    "name": "requestPasswordReset",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RequestPasswordResetMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RequestPasswordResetMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "78a0f491732e6c907e9397848e01041b",
    "id": null,
    "metadata": {},
    "name": "RequestPasswordResetMutation",
    "operationKind": "mutation",
    "text": "mutation RequestPasswordResetMutation(\n  $input: RequestPasswordResetInput!\n) {\n  requestPasswordReset(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "2cf053251ee20538eefc32431a1f2747";

export default node;
