import { DisplayDatePipe } from './display-date.pipe';

describe('DisplayDatePipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayDatePipe();
    expect(pipe).toBeTruthy();
  });
  
});
describe('Transform Pipe', () => {
  it('should transform dates', () => {
    const pipe = new DisplayDatePipe();
    expect(pipe.transform(Date.parse('1/1/2021'))).toBeTruthy();
  });
});
