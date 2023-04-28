
function sum(a: number, b: number): number {
  return a + b;
}

// Just a basic test to make sure Jest is working
describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
