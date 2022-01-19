import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { Tag } from '../lib/tag.class';
import { Tags } from '../lib/tags.class';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`Tags`, () => {

  const opening = `[`;
  const closing = `]`;

  const color = 'color';
  const colorValue = 'red';

  const size = 'size';
  const sizeValue = '14px';

  const border = 'border';
  const borderValue = '1px solid #000';

  const quote = 'quote';
  const fix = 'fix';
  const value = 'value';
  const problem = 'problem';

  /**
   * Simple tags.
   */
  const tags = new Tags(
    [quote, fix, value, problem],
    opening,
    closing,
    [color, colorValue], [border, borderValue]
  );

  /**
   * Attributed tags.
   */
  const tagsAttributed = new Tags(
    [quote, fix, value, problem, [size, [size, sizeValue]]],
    opening,
    closing,
    [color, colorValue], [border, borderValue]
  );


  testing
    .describe(`accessors`, () => {
      testing
        .it(`Tags.prototype.closing`, () => {
          expect(tags.closing).toEqual(closing);
        })
        .it(`Tags.prototype.opening`, () => {
          expect(tags.opening).toEqual(opening);
        })
        .it(`Tags.prototype.tags`, () => {
          expect(tags.tags.length).toEqual(4);
        });
    })

    .describe(`methods`, () => {
      testing
        .it(`Tags.prototype.delete()`, () => {
          expect(tags.delete('problem').has('problem')).toBeFalse();
          tags.set('problem');
        })

        .it(`Tags.prototype.forEach()`, () => {
          tags.forEach(tag => {
            expect(tag).toBeInstanceOf(Tag);
            toBe.instance(tag, Tag);
          });
        })

        .it(`Tags.prototype.get()`, () => {
          expect(tags.get(fix)).toBeInstanceOf(Tag);
          expect(tags.get(quote)).toBeInstanceOf(Tag);
          expect(tags.get(value)).toBeInstanceOf(Tag);

          expect(tags.get(fix).name).toEqual(fix);
          expect(tags.get(quote).name).toEqual(quote);
          expect(tags.get(value).name).toEqual(value);

          toBe
            .instance(tags.get(fix), Tag);

          expect(tagsAttributed.get(size).attribute?.border).toEqual(borderValue);
          expect(tagsAttributed.get(size).attribute?.color).toEqual(colorValue);
          expect(tagsAttributed.get(size).attribute?.size).toEqual(sizeValue);
        })

        .it(`Tags.prototype.getTags()`, () => {
          expect(tags.getTags().length).toEqual(4);
          tags.getTags().forEach(tag => {
            expect(tag).toBeInstanceOf(Tag);
            toBe.instance(tag, Tag);
          });
        })

        .it(`Tags.prototype.has()`, () => {
          expect(tags.has(fix)).toBeTrue();
          toBe.true(tags.has('value'));
          toBe.false(tags.has('no tag' as any));
        })

        .it(`Tags.prototype.set()`, () => {
          // Remove the tag and check.
          expect(tags.delete('problem').has('problem')).toBeFalse();
          expect(tags.get('problem')).not.toBeInstanceOf(Tag);

          // Set a new tag with attributes.
          tags.set('problem', [color, '#fff'], [border, '1px solid #fff']);
          expect(tags.get('problem')).toBeInstanceOf(Tag);
          expect(tags.get('problem').attribute?.border).toEqual('1px solid #fff');
          expect(tags.get('problem').attribute?.color).toEqual('#fff');

          // Set a new tag with no attributes.
          tags.set('problem');
          expect(tags.get('problem')).toBeInstanceOf(Tag);
          expect(tags.get('problem').attribute?.border).toBeUndefined();
          expect(tags.get('problem').attribute?.color).toBeUndefined();
        });
    });
});
