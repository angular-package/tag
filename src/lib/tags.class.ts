// Interface.
import { Tag } from './tag.class';
/**
 * The `tags` object creates and stores multiple tags of the same opening and closing chars, and common optional attributes.
 */
export class Tags<
  Names extends string,
  Opening extends string,
  Closing extends string,
  Attributes extends string = string
> {
  //#region instance public accessors.
  /**
   * The `get` accessor returns the closing chars common for the tags.
   * @returns The return value is the tag closing chars of a generic type variable `Closing`.
   * @angularpackage
   */
  public get closing(): Closing {
    return this.#closing;
  }

  /**
   * The `get` accessor returns the opening chars common for the tags.
   * @returns The return value is the tag opening chars of a generic type variable `Opening`.
   * @angularpackage
   */
  public get opening(): Opening {
    return this.#opening;
  }

  /**
   * The `get` accessor gets an `array` of set tags.
   * @returns The return value is an array of tags.
   * @angularpackage
   */
  public get tags(): Tag<Names, Opening, Closing, Attributes>[] {
    return Array.from(this.#tags.values());
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'tags'` for an instance of `Tags`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'tags';
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  /**
   * Private property of the closing chars placed after the name.
   */
  #closing: Closing;

  /**
   * Private property of the opening chars placed before the name.
   */
  #opening: Opening;

  /**
   * Private property of tags of a `Map` type.
   */
  #tags: Map<Names, Tag<any, any, any, any>> = new Map();
  //#endregion instance private properties.

  //#region static public methods.
  /**
   * The method checks if the value of any type is an instance of `Tags`.
   * @param value The value of any type to test against the `Tags` instance.
   * @returns The return value is a `boolean` indicating whether the value is an instance of `Tags`.
   */
  public static isTags<
    Names extends string,
    Opening extends string = string,
    Closing extends string = string
  >(value: any): value is Tags<Names, Opening, Closing> {
    return typeof value === 'object' && value instanceof this;
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new instance of `Tags` by specifying names, or name-attributes with common opening and closing, and common optional
   * attributes.
   * @param names An array of tag names or an array of name-attributes of an array to define a new tags.
   * @param opening Common opening chars for given tag names of a generic type variable `Opening` to set before each of the given names.
   * @param closing Common closing chars for given tag names of a generic type variable `Closing` to set after each of the given names.
   * @param attributes A rest parameter of an array attribute-value pairs to set after each of the given names.
   * @angularpackage
   */
  constructor(
    names: (Names | [Names, ...[Attributes, string][]])[],
    opening: Opening,
    closing: Closing,
    ...attributes: [Attributes, string][]
  ) {
    // Prepare variables.
    let customAttributes: [Attributes, string][], name: Names;
    // Define a new tag under the given name.
    names.forEach((tag) => {
      typeof tag === 'string'
        ? this.#tags.set(tag, new Tag(tag, opening, closing, ...attributes))
        : (([name, ...customAttributes] = tag),
          this.#tags.set(
            name,
            new Tag(
              name,
              opening,
              closing,
              ...customAttributes.concat(attributes)
            )
          ));
    });
    this.#closing = closing;
    this.#opening = opening;
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Removes the tag under the given name from the `Tags` storage.
   * @param name The tag name to remove.
   * @param removed An optional callback function to get the status of the removal.
   * @returns The return value is an instance of `Tags`.
   * @angularpackage
   */
  public delete<Name extends Names>(
    name: Name,
    removed: (status: boolean) => void = () => {}
  ): this {
    removed(this.#tags.delete(name));
    return this;
  }

  /**
   * The method executes a provided `forEach` function once per each tag in the `Tags` object.
   * @param forEach Function to execute for each entry in the `Tags`.
   * @returns The return value is an instance of `Tags`.
   * @angularpackage
   */
  public forEach(forEach: (tag: Tag<Names, Opening, Closing>) => void): this {
    this.#tags.forEach(forEach);
    return this;
  }

  /**
   * Gets the tag of a specified name.
   * @param name The tag name of a generic type variable `Name` to get.
   * @param attributes A rest parameter of an array attributes names to indicate `Attribute` return type.
   * @returns The return value is the tag of an instance of `Tag`.
   * @angularpackage
   */
  public get<Name extends Names, Attribute extends Attributes>(
    name: Name,
    ...attributes: Attribute[]
  ): Tag<Name, Opening, Closing, Attribute> {
    return this.#tags.get(name) as Tag<Name, Opening, Closing, Attribute>;
  }

  /**
   * Gets an `array` of tags.
   * @returns The return value is an `array` of tags.
   * @angularpackage
   */
  public getTags(): Tag<Names, Opening, Closing, Attributes>[] {
    return Array.from(this.#tags.values());
  }

  /**
   * Checks whether the tag of a specified name exists.
   * @param name The tag name of a generic type variable `Name` to check.
   * @returns The return value is a `boolean` indicating whether the tag of a specified name exists.
   * @angularpackage
   */
  public has<Name extends Names>(name: Name): boolean {
    return this.#tags.has(name);
  }

  /**
   * Defines a new tag of a specified name with the opening, closing, and optional attributes of a `Tags` instance.
   * @param name The tag name of a generic type variable `Name`.
   * @param attributes A rest parameter of an array attribute-value pairs.
   * @returns The return value is an instance of `Tags`.
   * @angularpackage
   */
  public set<Name extends Names, AttrName extends Attributes>(
    name: Name,
    ...attributes: [AttrName, string][]
  ): this {
    this.#tags.set(
      name,
      new Tag(name, this.#opening, this.#closing, ...attributes)
    );
    return this;
  }
  //#endregion instance public methods.
}
