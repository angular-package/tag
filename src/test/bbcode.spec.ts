import { Testing, TestingToBeMatchers } from '@angular-package/testing';

import { BBCode } from '../lib/bbcode.class';
import { Wrapper } from '@angular-package/wrapper';

const testing = new Testing(true, true);
const toBe = new TestingToBeMatchers();

testing.describe(`BBCode`, () => {
  const border = '1px solid #000';
  const closing = ']';
  const color = '#333';
  const name = 'quote';
  const opening = '[';

  const bbCodeSize14 = new BBCode('size', ['', '14px']);
  const bbCodeQuote = new BBCode(name, ['color', color], ['border', border]);

  const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`;
  const taggedText = bbCodeQuote.tagOn(text);
  const taggedSizeText = bbCodeSize14.tagOn(text);

  testing
    .describe(`accessors`, () => {
      testing

        .it(`BBcode.prototype.closingTag`, () => {
          toBe.stringIncludes(bbCodeSize14.closingTag, [closing]);
          expect(bbCodeSize14.closingTag).toContain(closing);
          // expect(
          //   new Wrapper(opening, closing).textHasClosing(bbCodeSize14.closingTag.valueOf())
          // ).toBeTrue();

          toBe.stringIncludes(bbCodeQuote.closingTag, [closing]);
          expect(bbCodeQuote.closingTag).toContain(closing);
          // expect(
          //   new Wrapper(opening, closing).textHasClosing(bbCodeQuote.closingTag.valueOf())
          // ).toBeTrue();
        })

        .it(`BBcode.prototype.name`, () => {
          expect(bbCodeQuote.name).toEqual(name);
          toBe.stringIncludes(bbCodeQuote.name, [name]);

          expect(bbCodeSize14.name).toEqual('size');
          toBe.stringIncludes(bbCodeSize14.name, ['size']);
        });
    })

    .describe(`methods`, () => {
      testing

        .it(`BBcode.prototype.getAttribute()`, () => {
          expect(bbCodeQuote.getAttribute('border')?.value).toEqual(border);
          expect(bbCodeQuote.getAttribute('color')?.value).toEqual(color);
        })

        .it(`BBcode.prototype.getClosingTag()`, () => {
          expect(bbCodeQuote.getClosingTag()).toContain(closing);
          // expect(
          //   new Wrapper(opening, closing).textHasClosing(bbCodeQuote.getClosingTag().valueOf())
          // ).toBeTrue();
        })

        .it(`BBcode.prototype.getName()`, () => {
          expect(bbCodeQuote.getName()).toEqual(name);
          toBe.stringIncludes(bbCodeQuote.getName(), [name]);
        })

        .it(`BBcode.prototype.getOpeningTag()`, () => {
          expect(bbCodeQuote.getOpeningTag()).toContain(opening);
          // expect(new Wrapper(opening, closing).textHasOpening(bbCodeQuote.getOpeningTag().valueOf())).toBeTrue();
        })

        .it(`BBcode.prototype.replaceClosingTagIn()`, () => {
          expect(bbCodeQuote.replaceClosingTagIn(taggedText, `ClosingTag`)).toContain(
            `ClosingTag`
          );
        })
        .it(`BBcode.prototype.replaceOpeningTagIn()`, () => {
          expect(bbCodeQuote.replaceOpeningTagIn(taggedText, `OpeningTag`)).toContain(
            `OpeningTag`
          );
        })

        .it(`BBcode.prototype.replaceTagIn()`, () => {
          expect(
            bbCodeQuote.replaceTagIn(`[quote]no quote [quote] and the quote`, 'There is ')
          ).toEqual('There is no quote There is  and the quote');
        })

        .it(`BBcode.prototype.tagOn()`, () => {
          expect(bbCodeQuote.tagOn(text)).toContain(text);
          expect(bbCodeQuote.tagOn(text)).toContain(bbCodeQuote.closingTag.valueOf());
          expect(bbCodeQuote.tagOn(text)).toContain(bbCodeQuote.openingTag.valueOf());
        })

        .it(`BBcode.prototype.isClosingTagIn()`, () => {
          expect(bbCodeQuote.isClosingTagIn(taggedText)).toBeTrue();
          expect(bbCodeSize14.isClosingTagIn(taggedSizeText)).toBeTrue();
        })

        .it(`BBcode.prototype.isOpeningTagIn()`, () => {
          expect(bbCodeQuote.isOpeningTagIn(taggedText)).toBeTrue();
          expect(bbCodeSize14.isOpeningTagIn(taggedSizeText)).toBeTrue();
        })

        .it(`BBcode.prototype.removeTagIn()`, () => {
          expect(bbCodeQuote.removeTagIn(taggedText)).toEqual(text);
          expect(bbCodeSize14.removeTagIn(taggedSizeText)).toEqual(text);
        })

        .it(`BBcode.prototype.valueOf()`, () => {
          expect(bbCodeQuote.valueOf()).toEqual(`${opening}${name}${closing}`);
          expect(bbCodeSize14.valueOf()).toEqual(`${opening}${'size'}${closing}`);
        });
    });
});
