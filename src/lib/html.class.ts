// Class.
import { TagExtension } from './tag-extension.class';
/**
 * The `Html` is an extension of `Tag` string object and represents any tag of Html.
 */
export class Html<
  Name extends string,
  AttributeName extends string = string
> extends TagExtension<Name, '<', '>', AttributeName> {
  //#region instance public accessors.
  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'html'` for an instance of `Html`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'html';
  }
  //#endregion instance public accessors.

  //#region static public methods.
  /**
   * The static method defines the `Html` tag of a specified name with optional attributes.
   * @param name The name of `Html` tag to define.
   * @param attributes A rest parameter of array of string attribute-value pair.
   * @returns The return value is a new instance of `Html` with the given `name`.
   * @angularpackage
   */
  public static define<Name extends string, AttributeName extends string>(
    name: Name,
    ...attributes: [AttributeName, string][]
  ): Html<Name, AttributeName> {
    return new this(name, ...attributes);
  }

  /**
   * The static method checks if the value of any type is an instance of a `Html`.
   * @param value The value of any type to check against the instance of `Html`.
   * @param name Optional name of a generic type variable `Name`, as the tag name of a given value.
   * @returns The return value is a `boolean` type indicating whether the value is the `Html` instance of any or a given name.
   * @angularpackage
   */
  public static isHtml<Name extends string>(
    value: any,
    name?: Name
  ): value is Html<Name> {
    return typeof value === 'object' && value instanceof this
      ? name !== undefined
        ? value.name === name
        : true
      : false;
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new instance of `Html` with a given name and optional attributes.
   * ! Optional attributes aren't used to build immutable tag, but are used to build the opening tag.
   * @param name The html tag name of a generic type variable `Name`.
   * @param attributes A rest parameter of an array of string attribute-value pairs.
   * @angularpackage
   */
  constructor(name: Name, ...attributes: [AttributeName, string][]) {
    super(name, '<', '>', ...attributes);
  }
  //#endregion constructor.
}
