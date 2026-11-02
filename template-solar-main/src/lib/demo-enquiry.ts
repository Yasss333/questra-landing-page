export type EnquiryValues = {
  name: string
  email: string
  mobile: string
  institution: string
  institutionType: string
  scale: string
  role: string
  examFocus: string
  preferredTime: string
  message: string
  consent: string
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
  if (
    clean.mobile &&
    (!/^[+\d][\d\s().-]{6,19}$/.test(clean.mobile) || clean.mobile.length > 24)
  )
    errors.push("Enter a valid mobile number or leave it blank.")
  if (!clean.institution || clean.institution.length > 160)
    errors.push("Enter your institution using 1–160 characters.")
  if (!clean.role) errors.push("Select your role.")
  if (clean.message.length > 1500)
    errors.push("Keep your message within 1,500 characters.")
  if (clean.consent !== "yes")
    errors.push("Confirm that Questra may use these details to respond.")
  if (errors.length) return { errors, href: "" }
  const body = `Hello Questra team,\n\nI would like a 30-minute live demonstration for our institution.\n\nName: ${clean.name}\nWork email: ${clean.email}\nMobile: ${clean.mobile || "Not provided"}\nInstitution: ${clean.institution}\nInstitution type: ${clean.institutionType || "Not specified"}\nDepartments / subjects: ${clean.scale || "Not specified"}\nRole: ${clean.role}\nExamination focus: ${clean.examFocus || "Not specified"}\nPreferred date and time: ${clean.preferredTime || "To be arranged"}\n\nWhat we would like to explore:\n${clean.message || "The Questra platform and Student Portal."}\n\nPlease contact me to arrange a suitable time.`
  return {
    errors,
    href: `mailto:${recipient}?subject=${encodeURIComponent(`Questra demo enquiry — ${clean.institution}`)}&body=${encodeURIComponent(body)}`,
  }
}
