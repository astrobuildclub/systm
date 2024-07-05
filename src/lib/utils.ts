/**
 * Get the standardized class size based on the input size.
 * @param {string} size - The input size to be normalized and mapped.
 * @returns {string | undefined} - The standardized class size or undefined if not found.
 */
export function getSizeClass(size: string): string | undefined {
  // Normalize the input size to lowercase for easier comparison
  const normalizedSize = size.toLowerCase();

  // Map of various inputs to standardized class sizes
  const sizeMap: { [key: string]: string } = {
    "xs": "xs",
    "x-small": "xs",
    "extra small": "xs",
    "small": "sm",
    "s": "sm",
    "sm": "sm",
    "medium": "md",
    "m": "md",
    "md": "md",
    "large": "lg",
    "l": "lg",
    "lg": "lg",
    "extra large": "xl",
    "x-large": "xl",
    "xl": "xl",
    "2xl": "2xl",
    "xxl": "2xl",
    "3xl": "3xl",
    "xxxl": "3xl",
    "4xl": "4xl",
    "xxxxl": "4xl"
  };

  // Return the standardized class size or undefined if not found
  return sizeMap[normalizedSize];
}

/**
 * Combine an array of class names into a single string.
 * @param {(string | undefined)[]} classes - The array of class names to be combined.
 * @returns {string} - A single string with all class names joined by a space.
 */
export function combineClasses(classes: (string | undefined)[]): string {
  // Filter out any undefined or empty strings
  const filteredClassList = classes.filter(Boolean);

  // Join the classes into a single string
  return filteredClassList.join(' ');
}

/**
 * Validate if a given href is a valid URL or internal path.
 * @param {string} href - The href to be validated.
 * @returns {boolean} - True if the href is valid, false otherwise.
 */
export function isValidHref(href: string): boolean {
  // Regular expression to validate URLs and internal paths
  const urlPattern = /^(https?:\/\/)?([^\s$.?#].[^\s]*)?$|^\/[\w\-\/?=&]+$/i;

  // Check if the href matches the URL or internal path pattern
  if (urlPattern.test(href)) {
    try {
      // Attempt to create a new URL object for absolute URLs
      if (href.startsWith('http')) {
        new URL(href);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  return false;
}
