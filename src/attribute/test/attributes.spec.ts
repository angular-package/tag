import { Testing, TestingToBeMatchers } from '@angular-package/testing';
import { Attributes } from '../src/attributes.class';
import { Attribute } from '../src/attribute.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Attributes`, () => {
  const border = 'border';
  const borderValue = '1px solid #fff';

  const color = `color`;
  const colorValue = `red`;

  const fontSize = 'font-size';
  const fontSizeValue = '14em';

  const attributes = new Attributes(
    [border, borderValue],
    [color, colorValue],
    [fontSize, fontSizeValue]
  );

  testing

    .describe(`accessors`, () => {
      testing
        .it(`Attributes.prototype.attribute`, () => {
          expect(attributes.attribute).toEqual({
            [border]: borderValue,
            [color]: colorValue,
            [fontSize]: fontSizeValue,
          });
          expect(attributes.attribute.border).toEqual(borderValue);
          expect(attributes.attribute.color).toEqual(colorValue);
          expect(attributes.attribute['font-size']).toEqual(fontSizeValue);
          toBe.objectKeys(attributes.attribute, [border, color, fontSize]);
        })
        .it(`Attributes.prototype.attributes`, () => {
          expect(attributes.attributes[0]).toBeInstanceOf(Attribute);
          expect(attributes.attributes[1]).toBeInstanceOf(Attribute);
          expect(attributes.attributes[2]).toBeInstanceOf(Attribute);

          expect(attributes.attributes[0].name).toEqual(border);
          expect(attributes.attributes[1].name).toEqual(color);
          expect(attributes.attributes[2].name).toEqual(fontSize);

          expect(attributes.attributes[0].value).toEqual(borderValue);
          expect(attributes.attributes[1].value).toEqual(colorValue);
          expect(attributes.attributes[2].value).toEqual(fontSizeValue);

          toBe.array(attributes.attributes);
        })
        .it(`Attributes.prototype.value`, () => {
          expect(attributes.value).toEqual(` ${border}="${borderValue}" ${color}="${colorValue}" ${fontSize}="${fontSizeValue}"`);
        });
    })

    .describe(`instance methods`, () => {
      testing
        .it(`Attributes.prototype.get()`, () => {
          expect(attributes.get(border)).toBeInstanceOf(Attribute);
          expect(attributes.get(color)).toBeInstanceOf(Attribute);
          expect(attributes.get(fontSize)).toBeInstanceOf(Attribute);

          expect(attributes.get(border)?.name).toEqual(border);
          expect(attributes.get(color)?.name).toEqual(color);
          expect(attributes.get(fontSize)?.name).toEqual(fontSize);

          expect(attributes.get(border)?.value).toEqual(borderValue);
          expect(attributes.get(color)?.value).toEqual(colorValue);
          expect(attributes.get(fontSize)?.value).toEqual(fontSizeValue);
        })
        .it(`Attributes.prototype.getAll()`, () => {
          expect(attributes.getAll()[0]).toBeInstanceOf(Attribute);
          expect(attributes.getAll()[1]).toBeInstanceOf(Attribute);
          expect(attributes.getAll()[2]).toBeInstanceOf(Attribute);

          expect(attributes.getAll()[0].name).toEqual(border);
          expect(attributes.getAll()[1].name).toEqual(color);
          expect(attributes.getAll()[2].name).toEqual(fontSize);

          expect(attributes.getAll()[0].value).toEqual(borderValue);
          expect(attributes.getAll()[1].value).toEqual(colorValue);
          expect(attributes.getAll()[2].value).toEqual(fontSizeValue);

          toBe.array(attributes.getAll());
        })
        .it(`Attributes.prototype.getAttributes()`, () => {
          expect(attributes.getAttributes()[0]).toBeInstanceOf(Attribute);
          expect(attributes.getAttributes()[1]).toBeInstanceOf(Attribute);
          expect(attributes.getAttributes()[2]).toBeInstanceOf(Attribute);

          expect(attributes.getAttributes()[0].name).toEqual(border);
          expect(attributes.getAttributes()[1].name).toEqual(color);
          expect(attributes.getAttributes()[2].name).toEqual(fontSize);

          expect(attributes.getAttributes()[0].value).toEqual(borderValue);
          expect(attributes.getAttributes()[1].value).toEqual(colorValue);
          expect(attributes.getAttributes()[2].value).toEqual(fontSizeValue);

          toBe.array(attributes.getAttributes());
        })
        .it(`Attributes.prototype.has()`, () => {
          expect(attributes.has(border)).toBeTrue();
          expect(attributes.has(color)).toBeTrue();
          expect(attributes.has(fontSize)).toBeTrue();
          expect(attributes.has('no property' as any)).toBeFalse();
        })
        .it(`Attributes.prototype.toObject()`, () => {
          expect(attributes.toObject()).toEqual({
            [border]: borderValue,
            [color]: colorValue,
            [fontSize]: fontSizeValue,
          });
          expect(attributes.toObject().color).toEqual(colorValue);
          expect(attributes.toObject()['font-size']).toEqual(fontSizeValue);
          toBe.objectKeys(attributes.attribute, [border, color, fontSize]);
        })
        .it(`Attributes.prototype.toString()`, () => {
          expect(attributes.toString()).toEqual(` ${border}="${borderValue}" ${color}="${colorValue}" ${fontSize}="${fontSizeValue}"`);
        })
        .it(`Attributes.prototype.valueOf()`, () => {
          expect(attributes.valueOf()).toEqual(` ${border}="${borderValue}" ${color}="${colorValue}" ${fontSize}="${fontSizeValue}"`);
        })
    });
});
