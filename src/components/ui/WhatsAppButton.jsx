import { whatsapp } from '../../data/whatsapp'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
      <path d="M16.04 3C9.4 3 4 8.38 4 15c0 2.12.56 4.19 1.62 6.01L4 29l8.2-1.58A12.06 12.06 0 0 0 16.04 27C22.66 27 28 21.62 28 15S22.66 3 16.04 3Zm0 21.9c-1.8 0-3.56-.48-5.1-1.4l-.37-.22-4.86.94.98-4.74-.24-.38A9.8 9.8 0 0 1 6.2 15c0-5.42 4.42-9.82 9.84-9.82 5.42 0 9.76 4.4 9.76 9.82 0 5.42-4.34 9.9-9.76 9.9Zm5.4-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const ready = whatsapp.number && !whatsapp.number.startsWith('[')
  if (!ready) return null

  const href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with An-Noor YWA on WhatsApp"
      className="wa-anim group fixed bottom-20 right-3 z-40 flex items-center gap-2 [animation:waIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)_1s_both] sm:bottom-24 sm:right-5"
    >
      <span className="pointer-events-none hidden rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-navy opacity-0 shadow-lg ring-1 ring-brand-gold/40 transition group-hover:opacity-100 sm:block">
        {whatsapp.label}
      </span>

      <span className="wa-anim relative block [animation:waFloat_3s_ease-in-out_1.6s_infinite]">
        <span
          aria-hidden
          className="wa-anim absolute inset-0 rounded-full border-2 border-[#25D366] [animation:waRipple_2.2s_ease-out_infinite]"
        />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition duration-300 group-hover:scale-110">
          <span className="block group-hover:[animation:waWiggle_0.6s_ease-in-out]">
            <WhatsAppIcon />
          </span>
        </span>
      </span>
    </a>
  )
}