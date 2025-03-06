import { TruncateNamePipe } from './truncate-name.pipe';

describe('TruncateNamePipe', () => {
  let pipe: TruncateNamePipe;

  beforeEach(() => {
    pipe = new TruncateNamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same string if it is shorter than maxLength', () => {
    expect(pipe.transform('Short string', 16)).toBe('Short string');
  });

  it('should truncate a string longer than maxLength and append "..." by default', () => {
    expect(pipe.transform('123456789101112', 10)).toBe('1234567891...');
  });

  it('should truncate a string longer than maxLength and append a custom ellipsis', () => {
    expect(pipe.transform('123456789101112', 10, '. . .')).toBe('1234567891. . .');
  });

  it('should return an empty string if value is null', () => {
    expect(pipe.transform(null, 10)).toBe('');
  });

  it('should return an empty string if value is undefined', () => {
    expect(pipe.transform(undefined, 10)).toBe('');
  });

  it('should return an empty string if value is an empty string', () => {
    expect(pipe.transform('', 10)).toBe('');
  });

  it('should correctly truncate with default maxLength (16)', () => {
    expect(pipe.transform('12345678910111213141516')).toBe('1234567891011121...');
  });

  it('should handle cases where maxLength is equal to string length', () => {
    expect(pipe.transform('1234567891012131', 16)).toBe('1234567891012131');
  });
});
