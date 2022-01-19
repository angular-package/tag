/**
 * The generic type `OpeningTag` indicates the opening tag. It takes the tag name of a generic type variable `Name` constrained by the
 * `string` and wrap of a generic type variable `Chars` constrained by generic type `StringOfLength` of two chars.
 */
export type OpeningTag<
  Name extends string,
  Opening extends string,
  Closing extends string,
> = `${Opening}${Name}${Closing}`;
