export const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const unicodeToAscii = (str?: string | null): string => {
  if (typeof str !== 'string') return '';

  // Define mappings of special characters to ASCII
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;';
  const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------';

  // Create a regular expression for special characters
  const p = new RegExp(a.split('').join('|'), 'g');

  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[áàảạãăắằẳẵặâấầẩẫậ]/gi, 'a')
    .replace(/[éèẻẽẹêếềểễệ]/gi, 'e')
    .replace(/[iíìỉĩị]/gi, 'i')
    .replace(/[óòỏõọôốồổỗộơớờởỡợ]/gi, 'o')
    .replace(/[úùủũụưứừửữự]/gi, 'u')
    .replace(/[ýỳỷỹỵ]/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(p, (c) => b.charAt(a.indexOf(c)));
};