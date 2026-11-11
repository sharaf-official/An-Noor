// True when a text still contains [PLACEHOLDER] / [Name] style brackets
export const isDraft = (t = '') => /\[[^\]]*\]/.test(String(t))

const digits = (t = '') => String(t).replace(/\D/g, '')

// WhatsApp link. number must include country code, e.g. 94771234567. '' when not set yet.
export const waLink = (num, text = '') =>
  isDraft(num) || !digits(num)
    ? ''
    : `https://wa.me/${digits(num)}${text ? `?text=${encodeURIComponent(text)}` : ''}`

// tel: link. '' when not set yet.
export const telLink = (num) =>
  isDraft(num) || !digits(num) ? '' : `tel:${String(num).replace(/[^\d+]/g, '')}`