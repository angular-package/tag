/**
 * The `Attribute` string object is the immutable attribute of name equal to the value in a from name="value".
 */
export class Attribute<
  Name extends string = string,
  Value extends string = string
> extends String {
  /**
   * The `get` accessor returns the attribute, the primitive value of a specified object.
   * @returns The return value is the attribute of a generic type variables `Name` and `Value` on the template `${Name}="${Value}"`.
   * @angularpackage
   */
  public get attribute(): `${Name}="${Value}"` {
    return this.valueOf();
  }

  /**
   * The `get` accessor returns the name of the attribute.
   * @returns The return value is the attribute name of a generic type variable `Name`.
   * @angularpackage
   */
  public get name(): Name {
    return this.#name;
  }

  /**
   * The `get` accessor returns the attribute value of a specified object.
   * @returns The return value is the attribute value of a generic type variable `Value`.
   * @angularpackage
   */
  public get value(): Value {
    return this.#value;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'attribute'` for an instance of `Attribute`. It can be read
   * by the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'attribute';
  }

  /**
   * The private property represents the attribute name of a generic type variable `Name`.
   */
  #name: Name;

  /**
   * The private property represents the attribute value of a generic type variable `Value`.
   */
  #value: Value;

  /**
   * Checks if the value is an instance of `Attribute` of any or given name, and value.
   * @param value The value of any type to check against the `Attribute` instance.
   * @param name An optional attribute name of a generic type variable `Name` to check if the given `value` contains.
   * @param val An optional attribute value of a generic type variable `Value` to check if the given `value` contains.
   * @returns The return value is a `boolean` indicating whether the provided `value` is an instance of `Attribute`.
   * @angularpackage
   */
  public static isAttribute<Name extends string, Value extends string>(
    value: any,
    name?: Name,
    val?: Value
  ): value is Attribute<Name, Value> {
    return typeof value === 'object' && value instanceof this
      ? (typeof name === 'string' ? value.name === name : true) &&
          (typeof val === 'string' ? value.value === val : true)
      : false;
  }

  /**
   * The static "tag" method builds from the given parameters attribute of a `string` type on the template. With the added `string` before
   * the expressions, it returns a prefixed attribute name.
   * @param template An array of string values where the first element is a prefix of an attribute name.
   * @param values A rest parameter of expressions, where the first element is the name and the second is the value.
   * @returns The return value is the attribute of a `string` type indicating the attribute name is equal to the value.
   * @angularpackage
   */
  protected static template(
    template: TemplateStringsArray,
    ...values: any[]
  ): string {
    let name: string, value: string;
    return ([name, value] = values), `${template[0]}${name}="${value}"`;
  }

  /**
   * Creates a new instance of `Attribute` with the name and value.
   * @param name The attribute name of a generic type variable `Name`.
   * @param value The attribute value of a generic type variable `Value`.
   * @angularpackage
   */
  constructor(name: Name, value: Value) {
    super(Attribute.template`${name}${value}`);
    this.#name = String(name) as Name;
    this.#value = String(value) as Value;
  }

  /**
   * Returns attribute primitive value converted to the array where the first element is the name, and the second is the value.
   * @returns The return value is the attribute of a read-only array.
   * @angularpackage
   */
  public toArray(): readonly [Name, Value] {
    return [this.#name, this.#value];
  }

  /**
   * Returns attribute primitive value converted to the object where the key is the attribute name.
   * @returns The return value is the attribute of a read-only object.
   * @angularpackage
   */
  public toObject(): Readonly<{ [key in Name]: Value }> {
    return Object.freeze({
      [this.#name]: this.#value,
    }) as { [key in Name]: Value };
  }

  /**
   * Returns attribute, the primitive value of a specified object.
   * @returns The return value is the attribute of generic type variables `Name` and `Value` on the template `${Name}="${Value}"`.
   * @angularpackage
   */
  public toString(): `${Name}="${Value}"` {
    return this.valueOf();
  }

  /**
   * Returns attribute, the primitive value of a specified object.
   * @returns The return value is the attribute of generic type variables `Name` and `Value` on the template `${Name}="${Value}"`.
   * @angularpackage
   */
  public valueOf(): `${Name}="${Value}"` {
    return super.valueOf() as any;
  }
}
