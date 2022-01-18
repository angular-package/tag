import { Testing, TestingToBeMatchers } from '@angular-package/testing';
import { Variables } from '../src/variables.class';
import { Variable } from '../src/variable.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Variables`, () => {

  const color = `color`;
  const colorValue = `red`;

  const fix = 'fix';
  const fixValue = 'solution not found';

  const problem = 'problem';
  const problemValue = 'The problem is';

  const variables = new Variables([color, colorValue], [fix, fixValue], [problem, problemValue]);
  const variablesEmptyValues = new Variables(color, fix, problem);

  testing
    .describe(`accessors`, () => {
      testing

        .it(`Variables.prototype.variable`, () => {
          expect(variables.variable.color).toBeInstanceOf(Variable);
          expect(variables.variable.fix).toBeInstanceOf(Variable);
          expect(variables.variable.problem).toBeInstanceOf(Variable);

          expect(variables.variable.color.value).toEqual(colorValue);
          expect(variables.variable.fix.value).toEqual(fixValue);
          expect(variables.variable.problem.value).toEqual(problemValue);

          expect(variables.variable.color.valueOf()).toEqual(`{${color}}`);
          expect(variables.variable.fix.valueOf()).toEqual(`{${fix}}`);
          expect(variables.variable.problem.valueOf()).toEqual(`{${problem}}`);

          expect(variablesEmptyValues.variable.color.value).toBeUndefined();
          expect(variablesEmptyValues.variable.fix.value).toBeUndefined();
          expect(variablesEmptyValues.variable.problem.value).toBeUndefined();

          expect(variablesEmptyValues.variable.color).toBeInstanceOf(Variable);
          expect(variablesEmptyValues.variable.fix).toBeInstanceOf(Variable);
          expect(variablesEmptyValues.variable.problem).toBeInstanceOf(Variable);

          toBe
            .undefined(variablesEmptyValues.variable.color.value)
            .undefined(variablesEmptyValues.variable.fix.value)
            .undefined(variablesEmptyValues.variable.problem.value)

            .instance(variables.variable.color, Variable)
            .instance(variables.variable.fix, Variable)
            .instance(variables.variable.problem, Variable)

            .instance(variablesEmptyValues.variable.color, Variable)
            .instance(variablesEmptyValues.variable.fix, Variable)
            .instance(variablesEmptyValues.variable.problem, Variable);
        })

        .it(`Variables.prototype.variables`, () => {
          expect(variables.variables[0].value).toEqual(colorValue);
          expect(variables.variables[1].value).toEqual(fixValue);
          expect(variables.variables[2].value).toEqual(problemValue);
          toBe.array(variables.variables);
        });
    })

    .describe(`instance methods`, () => {
      testing
        .it(`Variables.prototype.delete()`, () => {
          variablesEmptyValues.delete('color');
          expect(variablesEmptyValues.has(color)).toBeFalse();
          toBe.false(variablesEmptyValues.has(color));

          variablesEmptyValues.set(color, colorValue);
          expect(variablesEmptyValues.get(color)?.value).toEqual(colorValue);

          variablesEmptyValues.set(color);
        })

        .it(`Variables.prototype.forEach()`, () => {
          variablesEmptyValues.forEach(variable => {
            expect(variable).toBeInstanceOf(Variable);
            toBe.instance(variable, Variable);
            toBe.stringIncludesSome(variable.name, [color, fix, problem]);
          });

          variables.forEach(variable => {
            expect(variable).toBeInstanceOf(Variable);
            toBe.instance(variable, Variable);
            toBe.stringIncludesSome(variable.value, [colorValue, fixValue, problemValue]);
          });
        })

        .it(`Variables.prototype.get()`, () => {
          expect(variables.get(color)?.name).toEqual(color);
          expect(variables.get(fix)?.name).toEqual(fix);
          expect(variables.get(problem)?.name).toEqual(problem);
        })

        .it(`Variables.prototype.getAll()`, () => {
          expect(variables.getAll()[0].value).toEqual(colorValue);
          expect(variables.getAll()[1].value).toEqual(fixValue);
          expect(variables.getAll()[2].value).toEqual(problemValue);
          toBe.array(variables.getAll());

          expect(variablesEmptyValues.getAll()[0].value).toBeUndefined();
          expect(variablesEmptyValues.getAll()[1].value).toBeUndefined();
          expect(variablesEmptyValues.getAll()[2].value).toBeUndefined();
          toBe.array(variablesEmptyValues.getAll());
        })

        .it(`Variables.prototype.has()`, () => {
          expect(variables.has(color)).toBeTrue();
          expect(variables.has(fix)).toBeTrue();
          expect(variables.has(problem)).toBeTrue();
          expect(variables.has('not have' as any)).toBeFalse();

          expect(variablesEmptyValues.has(color)).toBeTrue();
          expect(variablesEmptyValues.has(fix)).toBeTrue();
          expect(variablesEmptyValues.has(problem)).toBeTrue();
          expect(variablesEmptyValues.has('not have' as any)).toBeFalse();
        })

        .it(`Variables.prototype.set()`, () => {
          variables.set(problem, fixValue);
          expect(variables.variable.problem.value).toEqual(fixValue);

          variables.set('new' as any, 'newValue');
          expect(variables.get('new' as any)?.value).toEqual('newValue');
          variables.delete('new' as any);

          variables.set(problem, problemValue);
        });
    });
});
