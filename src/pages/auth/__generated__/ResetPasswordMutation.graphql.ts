/**
 * @generated SignedSource<<c3557781b135a0ad9fa0d0ad31311771>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResetPasswordInput = {
  password: string;
  token: string;
};
export type ResetPasswordMutation$variables = {
  input: ResetPasswordInput;
};
export type ResetPasswordMutation$data = {
  readonly resetPassword: boolean;
};
export type ResetPasswordMutation = {
  response: ResetPasswordMutation$data;
  variables: ResetPasswordMutation$variables;
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
    "name": "resetPassword",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResetPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResetPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9618cf4a1088f4f98b21cc7e8f9cb91c",
    "id": null,
    "metadata": {},
    "name": "ResetPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ResetPasswordMutation(\n  $input: ResetPasswordInput!\n) {\n  resetPassword(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "c3e4368229c0f3320043786b03d84862";

export default node;
