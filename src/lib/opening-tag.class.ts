import { Tag } from './tag.class';
/**
 * The `OpeningTag` string object represents the immutable opening tag.
 */
export class OpeningTag<
  Name extends string,
  Opening extends string = string,
  Closing extends string = string,
  AttributeName extends string = string
> extends Tag<Name, Opening, Closing, AttributeName> {
  /**
   * The `get` accessor, with the help of `toStringTag`, changes the default tag to `'openingTag'` for an instance of `OpeningTag`.
   * It can be read by the `typeOf()` function of `@angular-package/type`.
   */
   public get [Symbol.toStringTag](): string {
    return 'openingTag';
  }
}
