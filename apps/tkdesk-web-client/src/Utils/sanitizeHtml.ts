import DOMPurify from 'dompurify'

const DEFAULT_ALLOWED_TAGS = [
  'br',
  'strong',
  'em',
  'b',
  'i',
  'u',
  'ul',
  'ol',
  'li',
  'p',
  'span',
  'sup',
  'sub',
]

export const sanitizeHtml = (value: unknown): string => {
  if (value === null || value === undefined) {
    return ''
  }

  return DOMPurify.sanitize(String(value), {
    ALLOWED_TAGS: DEFAULT_ALLOWED_TAGS,
    ALLOWED_ATTR: [],
  })
}
