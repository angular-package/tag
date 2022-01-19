// Type.
import { ClosingTag } from './closing-tag.type';
import { OpeningTag } from './opening-tag.type';
/**
 * The generic type `TaggedText` indicates the type of tagged text, with the opening tag and closing tag of the text.
 */
export type TaggedText<
  Text extends string,
  Name extends string,
  Opening extends string,
  Closing extends string
> = `${OpeningTag<Name, Opening, Closing>}${Text}${ClosingTag<
  Name,
  Opening,
  Closing
>}`;
