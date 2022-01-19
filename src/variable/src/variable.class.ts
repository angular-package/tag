// Class.
import { Tag } from '../../lib/tag.class';
/**
 * The `Variable` is an extension of the `Tag` string object and represents an immutable variable in the form of name between curly brackets
 * e.g. `{variable name}` with the ability to set its value.
 */
export class Variable<
  Name extends string,
  Value extends string = string
> extends Tag<Name, `{`, `}`> {
  //#region instance public accessors.
  /**
   * The `get` accessor returns the value from a private `#value` property of a specified `Variable` object.
   * @returns The return value is the value of a generic type variable `Value` if set, otherwise `undefined`.
   * @angularpackage
   */
  public get value(): Value | undefined {
    return this.#value;
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'variable'` for an instance of `Variable`. It can be read by
   * the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'variable';
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  /**
   * Private property of the value of a generic type variable `Value`.
   */
  #value?: Value;
  //#endregion instance private properties.

  //#region static public methods.
  /**
   * The static method defines the `Variable` of a specified name with an optional value.
   * @param name The variable name of a generic type variable `Name` to define.
   * @param value Optional variable value of a generic type variable `Value`.
   * @returns The return value is a new instance of `Variable` with the given `name` and an optional value.
   * @angularpackage
   */
  public static define<Name extends string, Value extends string>(
    name: Name,
    value?: Value
  ): Variable<Name, Value> {
    return new this(name, value);
  }

  /**
   * The static method checks whether the value of any type is an instance of a `Variable`.
   * @param value The value of any type to check against the instance of `Variable`.
   * @param name Optional name of a generic type variable `Name`, as the variable name of a given value.
   * @param variableValue The optional variable value of a generic type variable `Value` to check if the given value contains.
   * @returns The return value is a `boolean` type indicating whether the value is the `Variable` instance of any or a given name.
   * @angularpackage
   */
  public static isVariable<Name extends string, Value extends string>(
    value: any,
    name?: Name,
    variableValue?: Value
  ): value is Variable<Name, Value> {
    return typeof value === 'object' && value instanceof this
      ? (typeof name === 'string' ? value.name === name : true) &&
        (typeof variableValue === 'string' ? value.getValue() === variableValue : true)
      : false;
  }
  //#endregion static public methods.

  //#region constructor.
  /**
   * Creates a new instance of `Variable` with a specified name and optional value.
   * @param name The variable name in form {name} of a generic type variable `Name` to create.
   * @param value An optional variable value of a generic type variable `Value`.
   * @angularpackage
   */
  constructor(name: Name, value?: Value) {
    super(name, '{', '}');
    typeof value === 'string' && (this.#value = String(value) as Value);
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Gets the value of the variable by returning the private `#value`  property of a specified `Variable` object.
   * @returns The return value is the value of a generic type variable `Value` if set, otherwise `undefined`.
   * @angularpackage
   */
  public getValue(): Value | undefined {
    return this.#value;
  }

  /**
   * Replaces variable in the format `{variable name}` with the value of a specified `Variable` object or with a provided `replaceValue`, in
   * a given `text`.
   * ! If `replaceValue` is not provided, ​private `#value` property is used, and if the `#value` is `undefined` an empty string` is used.
   * @param text The text of a `string` type in which replace the variable with the value from the private `#value` property or a given
   * `replaceValue`.
   * @param replaceValue Optional value of a generic type variable `ReplaceValue` to replace the variable in the form `{variable name}` in a
   * given `text`.
   * @returns The return value is the text of a `string` type with a replaced variable by value.
   * @angularpackage
   */
  public replaceVariableIn<ReplaceValue extends Value>(
    text: string,
    replaceValue?: ReplaceValue
  ): string {
    return this.replaceTagIn(text, replaceValue || this.#value || '');
  }

  /**
   * Returns converted variable to a read-only `array` where the first element is the name, and the second is the value if set, otherwise
   * `undefined`.
   * @returns The return value is a read-only `array` of the variable name and value.
   * @angularpackage
   */
  public toArray(): readonly [Name, Value | undefined] {
    return [this.name, this.#value];
  }

  /**
   * Returns converted variable to a read-only `object` where the key is the variable name.
   * @returns The return value is a read-only `object` where the property name is the variable name, and the property value is equal to the
   * variable value.
   * @angularpackage
   */
  public toObject(): Readonly<{ [K in Name]: Value | undefined }> {
    return Object.freeze({ [this.name]: this.#value }) as {
      [K in Name]: Value | undefined;
    };
  }

  /**
   * Returns the variable in form `{name}`, a primitive value of the specified `Variable` object.
   * @returns The return value is the variable of a generic type variable `Name` on the template `{${Name}}`.
   * @angularpackage
   */
  public toString(): `{${Name}}` {
    return super.toString();
  }

  /**
   * Returns the variable in form `{name}`, a primitive value of the specified `Variable` object.
   * @returns The return value is the variable of a generic type variable `Name` on the template `{${Name}}`.
   * @angularpackage
   */
  public valueOf(): `{${Name}}` {
    return super.valueOf();
  }
  //#endregion instance public methods.
}
