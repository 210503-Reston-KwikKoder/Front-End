import { DisplayCategoryPipe } from './display-category.pipe';

describe('DisplayCategoryPipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayCategoryPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    const pipe = new DisplayCategoryPipe();
    expect(pipe.transform(-1)).toBe('Quotes');
    expect(pipe.transform(32)).toBe('CSharp');
  });
  
  it('shouldnt transform weird stuff', () => 
  {
    const pipe = new DisplayCategoryPipe();
    expect(pipe.transform(200)).toBeFalsy();
  });
});
