// @angular-package.
import { Wrapper } from '@angular-package/wrapper';
// Class.
import { Attribute } from '../attribute/src/attribute.class';
import { Attributes } from '../attribute/src/attributes.class';
/**
 * The `Tag` string object represents the immutable tag consisting of a name with optional attributes wrapped by the opening and closing
 * chars.
 */
export class Tag<
  Name extends string,
  Opening extends string = string,
  Closing extends string = string,
  AttributeName extends string = string
> extends String {
  //#region instance public accessors.
  /**
   * The `get` accessor gets the tag attributes.
   * @returns The return value is the tag attributes of an object type.
   * @angularpackage
   */
  public get attribute():
    | Readonly<{ [K in AttributeName]: string }>
    | undefined {
    return this.#attributes?.attribute;
  }

  /**
   * The `get` accessor returns the tag attributes if set, otherwise `undefined`.
   * @returns The return value is the tag attributes of an `Attributes` if set, or `undefined`.
   * @angularpackage
   */
  public get attributes(): Attributes<AttributeName> | undefined {
    return this.#attributes;
  }

  /**
   * The `get` accessor gets the closing chars of the tag from the private property `#wrap`.
   * @angularpackage
   */
  public get closing(): Closing {
    return this.#wrapper.closing;
  }

  /**
   * The `get` accessor gets the tag name without the wrap from the private property `#name`.
   * @returns The return value is a tag name of a generic type variables `Name`.
   * @angularpackage
   */
  public get name(): Name {
    return this.#wrapper.text;
  }

  /**
   * The `get` accessor gets the opening chars of the tag from the private property `#wrap`.
   * @angularpackage
   */
  public get opening(): Opening {
    return this.#wrapper.opening;
  }

  /**
   * The `get` accessor gets the wrapper of the tag from the private property `#wrapper`.
   * @angularpackage
   */
  public get wrapper(): Wrapper<Opening, Name, Closing> {
    return this.#wrapper;
  }

  /**
   * The `get` accessor, with the help of `toStringTag`, changes the default tag to `'tag'` for an instance of `Tag`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'tag';
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  /**
   * Optional private attributes of `Attributes` of a specified `Tag` object.
   */
  #attributes?: Attributes<AttributeName>;

  /**
   * Private wrap of a specified `Tag` object.
   */
  #wrapper: Wrapper<Opening, Name, Closing>;
  //#endregion instance private properties.

  //#region static public methods.
  /**
   * The static method checks whether the value of any type is the `Tag` instance of any or given tag name, the opening, and closing. It has
   * an optional ability to check tag name, opening, and closing.
   * @param value The value of any type to test against the `Tag` instance.
   * @param name An optional tag name of a generic type variable `Name` to test against existence in the given `value`.
   * @param opening An optional wrap opening of a generic type variable `Opening` to check if the given `value` contains.
   * @param closing An optional wrap closing of a generic type variable `Closing` to check if the given `value` contains.
   * @returns The return value is a `boolean` indicating whether the value is the `Tag` instance of any or given tag name, opening, and
   * closing.
   * @angularpackage
   */
  public static isTag<
    Name extends string,
    Opening extends string = string,
    Closing extends string = string
  >(
    value: any,
    name?: Name,
    opening?: Opening,
    closing?: Closing
  ): value is Tag<Name, Opening, Closing> {
    return typeof value === 'object' && value instanceof this
      ? (typeof name === 'string' ? value.name === name : true) &&
          (typeof opening === 'string' ? value.opening === opening : true) &&
          (typeof closing === 'string' ? value.closing === closing : true)
      : false;
  }

  /**
   * The static "tag" method builds from the given parameters the tag of a string type on the template. With the added string before the
   * expressions, it returns a tag with a prefix before the name.
   * @param strings -
   * @param values A rest parameter of expressions, where the first element is the name, the second opening, and the third is the closing of
   * the wrap. Last element is tag attributes.
   * @returns The return value is the tag of a `string` type.
   * @angularpackage
   */
  protected static template<
    Name extends string,
    Opening extends string,
    Closing extends string,
    AttributeName extends string
  >(
    strings: TemplateStringsArray,
    ...values: [Name, Opening, Closing, [AttributeName, string][]]
  ): `${Opening}${string}${Closing}` {
    let attributes: [AttributeName, string][],
      closing: Closing,
      name: Name,
      opening: Opening;
    return (
      ([name, opening, closing, attributes] = values),
      new Wrapper(
        opening,
        closing,
        name + new Attributes(...attributes)
      ).valueOf()
    );
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new `Tag` instance with the name and optional attributes wrapped by opening and closing chars.
   * @param name The tag name of a generic type variable `Name` placed between a given `opening` and `closing`.
   * @param opening The tag opening chars of a generic type variable `Opening` placed before the given `name`.
   * @param closing The tag closing chars of a generic type variable `Closing` placed after the given `name`, or after the given
   * `attributes`.
   * @param attributes A rest parameter of an array of attribute-value pairs as tag attributes to place after the given `name`.
   * @angularpackage
   */
  constructor(
    name: Name,
    opening: Opening,
    closing: Closing,
    ...attributes: [AttributeName, string][]
  ) {
    super(Tag.template`${name}${opening}${closing}${attributes}`);
    // Set wrap.
    this.#wrapper = new Wrapper(opening, closing, name);
    // Set attributes.
    Array.isArray(attributes) &&
      attributes.length > 0 &&
      (this.#attributes = new Attributes(...attributes));
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the attribute value of the specified name.
   * @param name The name of a generic type variable `AttrName` to get attribute.
   * @returns The return value is an attribute of `Attribute` instance if set, or `undefined`.
   * @angularpackage
   */
  public getAttribute<AttrName extends AttributeName>(
    name: AttrName
  ): Attribute<AttrName> | undefined {
    return this.#attributes?.get(name);
  }

  /**
   * Gets the closing chars of the tag.
   * @returns The return value is the tag closing chars of a generic type variable `Closing`.
   * @angularpackage
   */
  public getClosing(): Closing {
    return this.#wrapper.closing;
  }

  /**
   * Gets the tag name without the wrap opening and closing.
   * @returns The return value is a tag name of a generic type variable `Name`.
   * @angularpackage
   */
  public getName(): Name {
    return this.#wrapper.text;
  }

  /**
   * Gets the opening chars of the tag.
   * @returns The return value is the tag opening chars of a generic type variable `Opening`.
   * @angularpackage
   */
  public getOpening(): Opening {
    return this.#wrapper.opening;
  }

  /**
   * Checks whether the tag has an attribute of a specified name.
   * @param name The attribute name of a generic type variable `AttrName` to check whether the tag has.
   * @returns The return value is a `boolean` indicating whether the tag has an attribute of a specified name.
   * @angularpackage
   */
  public hasAttribute<AttrName extends AttributeName>(
    name: AttrName
  ): boolean | undefined {
    return this.#attributes?.has(name);
  }

  /**
   * The method replaces the tag of a specified `Tag` object with the provided `replaceValue` in the given `text` if both values are
   * strings.
   * ! The return type of a generic type variable `Text` returns the text with not replaced tags.
   * @param text The text of a generic type variable `Text` in which to replace a tag of a specified object with a given `replaceValue`.
   * @param replaceValue The value of a `string` type to replace a tag of a specified object in the given `text`.
   * @returns The return value is the given `text` of a generic type variable `Text` with a replaced tag if both the `text` and
   * `replaceValue` are strings. If `replaceValue` is not a `string` returns not replaced `text`, and if both the `text` and `replaceValue`
   * are not strings returns an empty `string`.
   * @angularpackage
   */
  public replaceTagIn<Text extends string>(
    text: Text,
    replaceValue: string
  ): Text {
    return typeof text === 'string'
      ? typeof replaceValue === 'string'
        ? (text.split(this.valueOf()).join(replaceValue) as Text)
        : text
      : ('' as Text);
  }

  /**
   * Checks whether a text has a tag of a specified `Tag` object.
   * @param text The text of a generic type variable `Text` to check whether it contains the tag.
   * @returns The return value is a `boolean` indicating whether the text contains the tag.
   * @angularpackage
   */
  public isTagIn<Text extends string>(text: Text): text is Text {
    return typeof text === 'string' && text.includes(this.valueOf());
  }

  /**
   * Returns the tag, a primitive value of the specified `Tag` object.
   * @returns The return value is a tag name of a generic type variables in order `Opening`, `Name` and `Closing` on the template.
   * @angularpackage
   */
  public toString(): `${Opening}${Name}${Closing}` {
    return this.valueOf();
  }

  /**
   * Returns the tag, a primitive value of the specified `Tag` object.
   * @returns The return value is a tag name of a generic type variables in order `Opening`, `Name` and `Closing` on the template.
   * @angularpackage
   */
  public valueOf(): `${Opening}${Name}${Closing}` {
    return super.valueOf() as `${Opening}${Name}${Closing}`;
  }
  //#endregion instance public methods.
}
