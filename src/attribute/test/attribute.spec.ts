import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { Attribute } from '../src/attribute.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Attribute`, () => {

  const name = `color`;
  const value = `red`;
  const attribute = new Attribute(name, value);

  testing
    .describe(`accessors`, () => {
      testing

        .it(`Attribute.prototype.attribute`, () => {
          expect(attribute.attribute).toEqual(`${name}="${value}"`);
          toBe.stringIncludes(attribute.attribute, [name, value]);
        })

        .it(`Attribute.prototype.get`, () => {
          expect(attribute.get).toEqual(`${name}="${value}"`);
          toBe.stringIncludes(attribute.get, [name, value]);
        })

        .it(`Attribute.prototype.name`, () => {
          expect(attribute.name).toEqual(name);
          toBe.stringIncludes(attribute.name, [name]);
        })

        .it(`Attribute.prototype.value`, () => {
          expect(attribute.value).toEqual(value);
          toBe.stringIncludes(attribute.value, [value]);
        });

    })

    .describe(`static methods`, () => {
      testing

        .it(`Attribute.isAttribute()`, () => {
          expect(Attribute.isAttribute(attribute, name, value)).toBeTrue();
        });

    })

    .describe(`instance methods`, () => {
      testing

        .it(`Attribute.toArray()`, () => {
          expect(attribute.toArray()).toEqual([name, value]);
          toBe.array(attribute.toArray());
        })

        .it(`Attribute.toObject()`, () => {
          expect(attribute.toObject()).toEqual({ [name]: value });
          toBe
            .object(attribute.toObject())
            .objectKey(attribute.toObject(), name);
        })

        .it(`Attribute.toString()`, () => {
          expect(attribute.toString()).toEqual(`${name}="${value}"`);
          toBe.stringIncludes(attribute.toString(), [name, value]);
        })

        .it(`Attribute.valueOf()`, () => {
          expect(attribute.valueOf()).toEqual(`${name}="${value}"`);
          toBe.stringIncludes(attribute.valueOf(), [name, value]);
        });

    });
});
