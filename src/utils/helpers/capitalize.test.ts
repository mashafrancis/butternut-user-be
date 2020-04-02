import capitalize from './capitalize';

describe('The capitalize function', () => {
  it('should capitalize a paragraph', () => {
    const paragraph = 'success. users has Been given FULL access.';
    const capitalizedParagraph = capitalize(paragraph);

    expect(capitalizedParagraph).toEqual('Success. User has been given full access.');
  });
});
