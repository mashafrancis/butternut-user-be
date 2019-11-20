/**
 * This function capitalizes a paragraph
 *
 * A new sentence in this context is a sentence that exists in a paragraph
 * and comes after the symbols: . ? !
 *
 * An uncapitalized sentence is a sentence whose first letter is in lowercase
 *
 * @param {string} paragraph e.g. `success. users has been given Full access.`
 *
 * @returns {string} e.g. `Success. User has been given full access.`
 */
const capitalize = (paragraph: any) => {
  const lowerCaseParagraph = paragraph.toLowerCase();
  const uncapitalizedNewSentencePattern = /([!?.]\s+)([a-z])/g; // eg . r
  const paragraphWithCapitalizedSentence = lowerCaseParagraph.replace(
    uncapitalizedNewSentencePattern,
    // @ts-ignore
    (match, symbolWithSpace, firstLetter) => (symbolWithSpace + firstLetter.toUpperCase())
  );
  return paragraphWithCapitalizedSentence.charAt(0).toUpperCase() + paragraphWithCapitalizedSentence.substring(1);
};

export default capitalize;
