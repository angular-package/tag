import { Testing, TestingToBeMatchers } from '@angular-package/testing';
import { Variable } from '../src/variable.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Variable`, () => {
  const fix = 'fix';
  const problem = 'problem';
  const value = 'There is a problem';

  const variableProblem = new Variable(problem, value);
  const variableFix = new Variable(fix);

  const text = '{id} {problem} with my {fix} and we cannot repair it.';

  testing
    .describe(`accessors`, () => {
      testing

        .it(`Variable.prototype.value`, () => {
          expect(variableProblem.value).toEqual(value);
          toBe.stringIncludes(variableProblem.value, [value]);

          expect(variableFix.value).toBeUndefined();
          toBe.undefined(variableFix.value);
        });

    })

    .describe(`static methods`, () => {
      testing

        .it(`Variable.define()`, () => {
          expect(Variable.define(problem, value).valueOf()).toEqual(`{${problem}}`);
          expect(Variable.define(problem, value).value).toEqual(value);

          expect(Variable.define(fix).valueOf()).toEqual(`{${fix}}`);
          expect(Variable.define(fix).getValue()).toBeUndefined();
          expect(Variable.define(fix).value).toBeUndefined();
        })

        .it(`Variable.isVariable()`, () => {
          expect(Variable.isVariable(variableProblem, problem, value)).toBeTrue();
          expect(Variable.isVariable(variableProblem, problem, fix)).toBeFalse();

          expect(Variable.isVariable(variableFix, fix)).toBeTrue();
          expect(Variable.isVariable(variableFix, fix, value)).toBeFalse();
          expect(Variable.isVariable(variableFix, problem)).toBeFalse();
          expect(Variable.isVariable(variableFix)).toBeTrue();
        });
    })

    .describe(`instance methods`, () => {
      testing

        .it(`Variable.prototype.getValue()`, () => {
          expect(variableProblem.getValue()).toEqual(value);
          toBe.stringIncludes(variableProblem.getValue(), [value]);

          expect(variableFix.getValue()).toBeUndefined();
          toBe.undefined(variableFix.getValue());
        })

        .it(`Variable.prototype.replaceVariable()`, () => {
          expect(variableProblem.replaceVariableIn(text))
            .toEqual('{id} There is a problem with my {fix} and we cannot repair it.');
          expect(variableProblem.replaceVariableIn(text, 'Custom text' as any))
            .toEqual('{id} Custom text with my {fix} and we cannot repair it.');
          expect(new Variable('problem').replaceVariableIn(text, 'There is not a problem'))
            .toEqual('{id} There is not a problem with my {fix} and we cannot repair it.');

          expect(variableFix.replaceVariableIn(text))
            .toEqual('{id} {problem} with my  and we cannot repair it.');
          expect(variableFix.replaceVariableIn(text, 'fix ooouuch'))
            .toEqual('{id} {problem} with my fix ooouuch and we cannot repair it.');
        })

        .it(`Variable.prototype.toArray()`, () => {
          expect(variableProblem.toArray()).toEqual([problem, value]);
          expect(variableFix.toArray()).toEqual([fix, undefined]);
        })

        .it(`Variable.prototype.toObject()`, () => {
          expect(variableProblem.toObject()).toEqual({[problem]: value});
          expect(variableFix.toObject()).toEqual({[fix]: undefined});
        })

        .it(`Variable.prototype.toString()`, () => {
          expect(variableProblem.toString()).toEqual(`{${problem}}`);
          toBe.stringIncludes(variableProblem.toString(), [`{${problem}}`, problem]);

          expect(variableFix.toString()).toEqual(`{${fix}}`);
          toBe.stringIncludes(variableFix.toString(), [`{${fix}}`, fix]);
        })

        .it(`Variable.prototype.valueOf()`, () => {
          expect(variableProblem.valueOf()).toEqual(`{${problem}}`);
          toBe.stringIncludes(variableProblem.valueOf(), [`{${problem}}`, problem]);

          expect(variableFix.valueOf()).toEqual(`{${fix}}`);
          toBe.stringIncludes(variableFix.valueOf(), [`{${fix}}`, fix]);
        });

      });
});
