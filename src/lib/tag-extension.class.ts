// Class.
import { Attribute } from '../attribute/src/attribute.class';
import { ClosingTag } from './closing-tag.class';
import { OpeningTag } from './opening-tag.class';
import { Tag } from './tag.class';
// Type.
import { TaggedText } from '../type/tagged-text.type';
/**
 * The `TagExtension` string object is an extension for `Tag` string object and is a middleware to create in an easy way `Html` and `BBCode`
 * tags with additional crucial features like `OpeningTag` and `ClosingTag`.
 */
export abstract class TagExtension<
  Name extends string,
  Opening extends string = string,
  Closing extends string = string,
  AttributeName extends string = string
> extends Tag<Name, Opening, Closing, AttributeName> {
  //#region instance public accessors.
  /**
   * The `get` accessor gets the closing tag.
   * @returns The return value is a tag closing of the `ClosingTag` instance.
   * @angularpackage
   */
  public get closingTag(): ClosingTag<Name, Opening, Closing> {
    return this.#closingTag;
  }

  /**
   * The `get` accessor gets the opening tag with optional attributes.
   * @returns The return value is an opening tag of a generic type `OpeningTag`.
   * @angularpackage
   */
  public get openingTag(): OpeningTag<Name, Opening, Closing, AttributeName> {
    return this.#openingTag;
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  /**
   * Private property of closing tag of a `ClosingTag` type.
   */
  #closingTag: ClosingTag<Name, Opening, Closing>;

  /**
   * Private property of opening tag of a `OpeningTag` type.
   */
  #openingTag: OpeningTag<Name, Opening, Closing, AttributeName>;
  //#endregion instance private properties.

  //#region constructor.
  /**
   * Creates a new `Tag` instance with the name and optional attributes wrapped by opening and closing chars.
   * @param name The tag name of a generic type variable `Name` placed between a given `opening` and `closing`.
   * @param opening The tag opening chars of a generic type variable `Opening` placed before the given `name`.
   * @param closing The tag closing chars of a generic type variable `Closing` placed after the given `name`, or after the given
   * `attributes`.
   * @param attributes A rest parameter of an array of attribute-value pairs as attributes for the opening tag to place after the given
   * `name`.
   */
  constructor(
    name: Name,
    opening: Opening,
    closing: Closing,
    ...attributes: [AttributeName, string][]
  ) {
    super(name, opening, closing);
    // Set opening tag.
    this.#openingTag = new OpeningTag(name, opening, closing, ...attributes);
    // Set closing tag.
    this.#closingTag = new ClosingTag(name, opening, closing);
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the attribute of a specified name.
   * @param name The attribute name to get.
   * @returns The return value is the attribute of an instance of `Attribute` if set, otherwise `undefined`.
   * @angularpackage
   */
  public getAttribute<AttrName extends AttributeName>(
    name: AttrName
  ): Attribute<AttrName> | undefined {
    return this.#openingTag.getAttribute(name);
  }

  /**
   * Gets the closing tag of a specified `Tag` object.
   * @returns The return value is the closing tag of a generic type `ClosingTag`.
   * @angularpackage
   */
  public getClosingTag(): ClosingTag<Name, Opening, Closing> {
    return this.#closingTag;
  }

  /**
   * Gets the opening tag with optional attributes of the specified `Tag` object.
   * @returns The return value is the opening tag of a generic type `OpeningTag`.
   * @angularpackage
   */
  public getOpeningTag(): OpeningTag<Name, Opening, Closing> {
    return this.#openingTag;
  }

  /**
   * The method replaces the closing tag of a specified `Tag` object with the provided `replaceValue` in the given `text` if both values are
   * strings.
   * ! The return type of a generic type variable `Text` returns the text with not replaced tags.
   * @param text The text in which to replace the closing tag of a specified object with a given `replaceValue`.
   * @param replaceValue The value to replace the closing tag of a specified object in the given `text`.
   * @returns The return value is the given `text` of a generic type variable `Text` with a replaced tag if both the `text` and
   * `replaceValue` are strings. If `replaceValue` is not a `string` returns not replaced `text`, and if both the `text` and `replaceValue`
   * are not strings returns an empty `string`.
   * @angularpackage
   */
  public replaceClosingTagIn<Text extends string>(
    text: Text,
    replaceValue: string
  ): Text {
    return typeof text === 'string'
      ? typeof replaceValue === 'string'
        ? // ? (text.split(this.closingTag.value).join(replaceValue) as Text)
          this.#closingTag.replaceTagIn(text, replaceValue)
        : text
      : ('' as Text);
  }

  /**
   * The method replaces the opening tag of a specified `Tag` object with the provided `replaceValue` in the given `text` if both values are
   * strings.
   * ! The return type of a generic type variable Text returns the text with not replaced tags.
   * @param text The text of a generic type variable `Text` in which to replace the opening tag of a specified object, with a given
   * `replaceValue`.
   * @param replaceValue The value of a `string` type to replace the opening tag of a specified object in the given `text`.
   * @returns The return value is the given `text` of a generic type variable `Text` with a replaced tag if both the `text` and
   * `replaceValue` are strings. If `replaceValue` is not a `string` returns not replaced `text`, and if both the `text` and `replaceValue`
   * are not strings returns an empty `string`.
   * @angularpackage
   */
  public replaceOpeningTagIn<Text extends string>(
    text: Text,
    replaceValue: string
  ): Text {
    return typeof text === 'string'
      ? typeof replaceValue === 'string'
        ? this.#openingTag.replaceTagIn(text, replaceValue)
        : text
      : ('' as Text);
  }

  /**
   * Returns the `Tagged` object of the provided text, tagged with the opening and closing tag.
   * @param text The text of a generic type variable `Text`, to tag with the opening and closing tag.
   * @returns The return value is a new `Tagged` instance with a tagged `text`.
   * @angularpackage
   */
  public tagOn<Text extends string>(
    text: Text
  ): TaggedText<Text, Name, Opening, Closing> {
    return `${this.#openingTag.valueOf()}${text}${this.#closingTag.valueOf()}`;
  }

  /**
   * Checks whether the text has a closing tag of a specified `Tag` object at the end of the text.
   * @param text The text of a generic type variable `Text` to check whether it contains a closing tag.
   * @returns The return value is a `boolean` indicating whether the given `text` has a closing tag.
   * @angularpackage
   */
  public isClosingTagIn<Text extends string>(text: Text): text is Text {
    return (
      this.#closingTag.isTagIn(text) &&
      text.slice(-this.closingTag.length) === this.closingTag.valueOf()
    );
  }

  /**
   * Checks whether a text has an opening tag of a specified `Tag` object at the beginning of the text.
   * @param text The text of a generic type variable `Text` to check whether it contains an opening tag.
   * @returns The return value is a `boolean` indicating whether the given `text` has an opening tag.
   * @angularpackage
   */
  public isOpeningTagIn<Text extends string>(text: Text): text is Text {
    return (
      this.#openingTag.isTagIn(text) &&
      text.slice(0, this.openingTag.length) === this.openingTag.valueOf()
    );
  }

  /**
   * Returns the untagged text, without the closing and opening tag of a specified `Tag` object.
   * @param text The text of a `string` type to untag.
   * @returns The return value is the text of a string type untagged from the opening and closing tag if tags are found, or the text.
   * @angularpackage
   */
  public removeTagIn(text: string): string {
    this.isClosingTagIn(text) &&
      (text = text.valueOf().slice(0, text.length - this.closingTag.length));
    this.isOpeningTagIn(text) &&
      (text = text.valueOf().slice(this.openingTag.length));
    return text;
  }
  //#endregion instance public methods.
}
