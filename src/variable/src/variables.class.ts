// Class.
import { Variable } from './variable.class';
/**
 * The `Variables` object creates and stores multiple variables in original insertion order in the `Map`.
 */
export class Variables<Names extends string> {
  //#region instance public accessors.
  /**
   * The `get` accessor gets an `object` of set variables where the key is the variable name.
   * @returns The return value is a read-only object of variables built from the `Map` entries.
   * @angularpackage
   */
  public get variable(): Readonly<Record<Names, Variable<Names>>> {
    return Object.freeze(Object.fromEntries(this.#variables.entries())) as any;
  }

  /**
   * The `get` accessor gets an `array` of set variables.
   * @returns The return value is a read-only array of variables built from the `Map` values.
   * @angularpackage
   */
  public get variables(): readonly Variable<Names>[] {
    return Array.from(this.#variables.values());
  }

  /**
   * The property, with the help of `toStringTag`, changes the default tag to `'variables'` for an instance of `Variables`.
   * It can be read by the `typeOf()` function of `@angular-package/type`.
   */
  public get [Symbol.toStringTag](): string {
    return 'variables';
  }
  //#endregion instance public accessors.

  //#region instance private properties.
  /**
   * Private property of variables of a `Map` type to store `Variable` instances.
   */
  #variables: Map<Names, Variable<any>> = new Map();
  //#endregion instance private properties.

  //#region constructor.
  /**
   * Creates an instance of `Variables` with a specified name, or name, and value.
   * @param names A rest parameter of string names, or an array name-value pairs to create new `Variable` instances.
   * @angularpackage
   */
  constructor(...names: (Names | [Names, string])[]) {
    let name: Names, value: string;
    names.forEach((variable) =>
      typeof variable === 'string'
        ? this.#variables.set(variable, new Variable(variable))
        : (([name, value] = variable),
          this.#variables.set(name, new Variable(name, value)))
    );
  }
  //#endregion constructor.

  //#region instance public methods.
  /**
   * Removes the variable under the given name from the `Variables` storage.
   * @param name The variable name of a generic type variable `Name` to remove the `Variable` instance in the storage.
   * @param removed An optional callback function to get the status of the removal.
   * @returns The return value is an instance of `Variables`.
   * @angularpackage
   */
  public delete<Name extends Names>(
    name: Name,
    removed: (status: boolean) => void = () => {}
  ): this {
    removed(this.#variables.delete(name));
    return this;
  }

  /**
   * The method executes a provided `forEach` function once per each `Variable` in the `Variables` object.
   * @param forEach Function to execute for each entry in the `Variables`.
   * @returns The return value is an instance of `Variables`.
   * @angularpackage
   */
  public forEach(forEach: (variable: Variable<Names>) => void): this {
    this.#variables.forEach(forEach);
    return this;
  }

  /**
   * The method gets the variable of a specified name.
   * @param name The variable name of a generic type variable `Name` to retrieve an instance of `Variable`  from storage.
   * @returns The return value is the `Variable` instance of a specified name if set, otherwise `undefined`.
   * @angularpackage
   */
  public get<Name extends Names>(name: Name): Variable<Name> | undefined {
    return this.#variables.get(name);
  }

  /**
   * Gets an `array` of set variables.
   * @returns The return value is an array of variables built from the `Map` values.
   * @angularpackage
   */
  public getAll(): readonly Variable<Names>[] {
    return this.variables;
  }

  /**
   * Gets an `array` of set variables.
   * @returns The return value is a read-only array of variables built from the `Map` values.
   * @angularpackage
   */
  public getVariables(): readonly Variable<Names>[] {
    return this.variables;
  }

  /**
   * Checks whether the variable under the given name exists.
   * @param name The variable name of a generic type variable `Name` under which check existence of the `Variable` instance in the storage.
   * @returns The return value is a `boolean` indicating whether a variable of a specified name exists.
   * @angularpackage
   */
  public has<Name extends Names>(name: Name): boolean {
    return this.#variables.has(name);
  }

  /**
   * Defines a new variable under the given name, with an optional value.
   * @param name The name of a generic type variable `Name` to define a new variable.
   * @param value An optional value of a `string` type to set with a given name.
   * @returns The return value is an instance of `Variables`.
   * @angularpackage
   */
  public set<Name extends Names>(name: Name, value?: string): this {
    this.#variables.set(name, new Variable(name, value));
    return this;
  }
  //#endregion instance public methods.
}
