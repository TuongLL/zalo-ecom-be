export function stringToSlug(str: string): string {
  // Convert the string to lowercase
  str = str.toLowerCase();

  // Remove accents and diacritics
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Replace non-alphanumeric characters with hyphens
  str = str.replace(/[^a-z0-9]+/g, '-');

  // Remove leading and trailing hyphens
  str = str.replace(/^-+|-+$/g, '');

  // Return the slug
  return str;
}

