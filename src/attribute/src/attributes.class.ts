// Class.
import { Attribute } from './attribute.class';
/**
 * The `Attributes` string object builds an immutable list of attributes in original insertion order where attribute comes in form
 * `name="value"`.
 */
export class Attributes<Names extends string = string> extends String {
  /**
   * The `get` accessor `attribute` gets the attributes in an `object` form, where the key is the attribute name.
   * @returns The return value is a read-only `object` of attributes.
   * @angularpackage
   */
  public get attribute(): Readonly<{ [K in Names]: string }> {
    const attributes: any = {};
    this.#attributes &&
      this.#attributes.forEach((attr: Attribute) =>
        Object.assign(attributes, attr.toObject())
      );
    return Object.freeze(attributes);
  }

  /**
   * The `get` accessor returns the attributes in an `array` form.
   * @returns The return value is a read-only `array` of attributes.
   * @angularpackage
   */
  public get attributes(): readonly Attribute<Names>[] {
    return Array.from(this.#attributes.values());
  }

  /**
   * The `get` accessor gets the attribute list, the primitive value of a specified `Attributes` object.
   * @returns The return value is a list of attributes of a `string` type built from `attribute="value"` separated by space.
   * @angularpackage
   */
  public get value(): string {
    return this.toString();
  }

  /**
   * Private attributes of a Map.
   */
  #attributes: Map<Names, Attribute<any>> = new Map();

  /**
   * The "tag" static method builds the attribute list.
   * @param strings -
   * @param values A rest parameter of attribute-value pairs of an `array`.
   * @returns The return value is the attribute list of a `string` type.
   * @angularpackage
   */
  protected static template<Name extends string>(
    strings: TemplateStringsArray,
    ...values: [Name, string][][]
  ): string {
    let attributes: [Name, string][];
    const names = new Set();
    return (
      ([attributes] = values),
      (attributes.length > 0 ? (attributes[0][0].length > 0 ? ` ` : ``) : ``) +
        attributes
          .map((attribute) =>
            names.has(attribute[0]) === false
              ? (names.add(attribute[0]),
                new Attribute(attribute[0], attribute[1]))
              : undefined
          )
          .filter((element) => element !== undefined)
          .join(' ')
    );
  }

  //#region constructor.
  /**
   * Creates an instance of `Attributes` by specifying name-value pairs.
   * @param attributes A rest parameter of an `array` name-value pairs.
   * @angularpackage
   */
  constructor(...attributes: [Names, string][]) {
    super(Attributes.template`${attributes}`);
    // Add unique attributes.
    let name: Names, value: string;
    attributes.forEach(
      (attribute) => (
        ([name, value] = attribute),
        this.#attributes.has(name) === false &&
          this.#attributes.set(name, new Attribute(name, value))
      )
    );
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the attribute of a specified name.
   * @param name The name of an attribute to get the `Attribute` instance.
   * @returns The return value is the attribute of the `Attribute` instance.
   * @angularpackage
   */
  public get<Name extends Names>(name: Name): Attribute<Name> | undefined {
    return this.#attributes.get(name);
  }

  /**
   * Gets the attributes in an `array` form.
   * @returns The return value is a read-only `array` of attributes.
   * @angularpackage
   */
  public getAll(): readonly Attribute<Names>[] {
    return this.attributes;
  }

  /**
   * Gets the attributes in an `array` form.
   * @returns The return value is a read-only `array` of attributes.
   * @angularpackage
   */
  public getAttributes(): readonly Attribute<Names>[] {
    return this.attributes;
  }

  /**
   * Checks whether the attribute of a specified name exists in an `Attributes` object.
   * @param name The name of attribute to check its existence.
   * @returns The return value is the attribute of the `Attribute` instance.
   * @angularpackage
   */
  public has<Name extends Names>(name: Name): boolean {
    return this.#attributes.has(name);
  }

  /**
   * Gets the attributes in an `object` form, where the key is the attribute name.
   * @returns The return value is a read-only `object` of attributes.
   * @angularpackage
   */
  public toObject(): Readonly<{ [K in Names]: string }> {
    return this.attribute;
  }

  /**
   * Gets the attribute list, the primitive value of a specified `Attributes` object.
   * @returns The return value is a list of attributes of a `string` type built from `attribute="value""` separated by space.
   * @angularpackage
   */
  public toString(): string {
    return super.valueOf();
  }

  /**
   * Gets the attribute list, the primitive value of a specified `Attributes` object.
   * @returns The return value is a list of attributes of a `string` type built from `attribute="value""` separated by space.
   * @angularpackage
   */
  public valueOf(): string {
    return super.valueOf() as any;
  }
  //#endregion instance public methods.
}
