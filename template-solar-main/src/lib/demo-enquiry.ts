export type EnquiryValues = {
  name: string
  email: string
  institution: string
  role: string
  message: string
}
export function prepareDemoEnquiry(values: EnquiryValues, recipient: string) {
  const clean = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()]),
  ) as EnquiryValues
  const errors: string[] = []
  if (!clean.name || clean.name.length > 100)
    errors.push("Enter your name using 1–100 characters.")
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) ||
    clean.email.length > 160
  )
    errors.push("Enter a valid work email address.")
  if (!clean.institution || clean.institution.length > 160)
    errors.push("Enter your institution using 1–160 characters.")
  if (!clean.role) errors.push("Select your role.")
  if (clean.message.length > 1500)
    errors.push("Keep your message within 1,500 characters.")
  if (errors.length) return { errors, href: "" }
  const body = `Hello Questra team,\n\nI would like a live demonstration for our institution.\n\nName: ${clean.name}\nWork email: ${clean.email}\nInstitution: ${clean.institution}\nRole: ${clean.role}\n\nWhat we would like to explore:\n${clean.message || "The Questra platform and Student Portal."}\n\nPlease contact me to arrange a suitable time.`
  return {
    errors,
    href: `mailto:${recipient}?subject=${encodeURIComponent(`Questra demo enquiry — ${clean.institution}`)}&body=${encodeURIComponent(body)}`,
  }
}
