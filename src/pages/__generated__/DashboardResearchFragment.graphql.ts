/**
 * @generated SignedSource<<e735616bd63feeb8480cfde2776d96c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DashboardResearchFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly schema: any;
  readonly " $fragmentType": "DashboardResearchFragment";
};
export type DashboardResearchFragment$key = {
  readonly " $data"?: DashboardResearchFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DashboardResearchFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DashboardResearchFragment",
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
  "type": "Research",
  "abstractKey": null
};

(node as any).hash = "f839de13126c87032888858cbb1f3276";

export default node;
