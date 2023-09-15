import { RuleGroupType } from "react-querybuilder"

// interface CommonProperties {
//   path?: number[]
//   id?: string
//   disabled?: boolean
// }
// type RuleType<
//   F extends string = string,
//   O extends string = string,
//   V = any,
//   C extends string = string,
// > = CommonProperties & {
//   field: F
//   operator: O
//   value: V
//   valueSource?: ValueSource
//   /**
//    * Only used when adding a rule to a query that uses independent combinators
//    */
//   combinatorPreceding?: C
// }
// type RuleGroupType<
//   R extends RuleType = RuleType,
//   C extends string = string,
// > = CommonProperties & {
//   combinator: C
//   rules: RuleGroupArray<RuleGroupType<R, C>, R>
//   not?: boolean
// }
// type RuleGroupArray<
//   RG extends RuleGroupType = RuleGroupType,
//   R extends RuleType = RuleType,
// > = (R | RG)[]
// ---
type JsonPredicate = {
  $and?: JsonPredicate[]
  $or?: JsonPredicate[]
  $not?: JsonPredicate
  $eq?: string | number | boolean
  $ne?: string | number | boolean
  $gt?: number
  $ge?: number
  $lt?: number
  $le?: number
  $in?: (string | number | boolean)[]
  $contains?: string | number | boolean
}
// Examples:
// - `{"$and":[{"field1":{"$eq":"value"}},{"field2":{"$eq":"value"}}]}`
// - `{"$or":[{"field1":{"$eq":"value"}},{"$not":{"field2":{"$eq":"value"}}}]}`
// - `{"$and":[{"arrayfield":{"$contains":"value"}}]}`
export const convertToJsonPredicate = (query: RuleGroupType): JsonPredicate => {
  if (query.combinator === "and") {
    return {
      $and: query.rules.map(rule => {
        if ("combinator" in rule) {
          return convertToJsonPredicate(rule)
        } else {
          return {
            [rule.field]: {
              [rule.operator]: rule.value,
            },
          }
        }
      }),
    }
  } else if (query.combinator === "or") {
    return {
      $or: query.rules.map(rule => {
        if ("combinator" in rule) {
          return convertToJsonPredicate(rule)
        } else {
          return {
            [rule.field]: {
              [rule.operator]: rule.value,
            },
          }
        }
      }),
    }
  } else {
    throw new Error("Unknown combinator: " + query.combinator)
  }
}
