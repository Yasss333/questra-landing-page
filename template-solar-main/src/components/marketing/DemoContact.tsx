"use client"

import { useState } from "react"
import { RiArrowRightUpLine, RiCheckLine, RiMailLine } from "@remixicon/react"
import { siteConfig } from "@/app/siteConfig"
import { prepareDemoEnquiry } from "@/lib/demo-enquiry"
import styles from "./Marketing.module.css"
import { BorderBeam } from "@/registry/magicui/border-beam"

export default function DemoContact({
  standalone = false,
}: {
  standalone?: boolean
}) {
  const [prepared, setPrepared] = useState(false)
  const [draft, setDraft] = useState("")
  const [errors, setErrors] = useState<string[]>([])
  function prepareEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const result = prepareDemoEnquiry(
      {
        name: String(values.get("name") || ""),
        email: String(values.get("email") || ""),
        mobile: String(values.get("mobile") || ""),
        institution: String(values.get("institution") || ""),
        institutionType: String(values.get("institutionType") || ""),
        scale: String(values.get("scale") || ""),
        role: String(values.get("role") || ""),
        examFocus: String(values.get("examFocus") || ""),
        preferredTime: String(values.get("preferredTime") || ""),
        message: String(values.get("message") || ""),
        consent: String(values.get("consent") || ""),
      },
      siteConfig.contactEmail,
    )
    setErrors(result.errors)
    if (result.errors.length) {
      setPrepared(false)
      setDraft("")
      return
    }
    setDraft(result.href)
    setPrepared(true)
  }
  return (
    <section
      id="demo"
      className={styles.demoSection}
      aria-labelledby="demo-heading"
    >
      <div className={styles.demoInner}>
        <div className={styles.demoCopy}>
          <span className={styles.kicker}>LET’S BRING IT TO YOUR CAMPUS</span>
          {standalone ? (
            <h1 id="demo-heading">See Questra in action.</h1>
          ) : (
            <h2 id="demo-heading">
              Better examinations
              <br />
              start with
              <br />
              <span>a conversation.</span>
            </h2>
          )}
          <p>
            See how Questra’s connected workflow fits your curriculum, your
            faculty, and your examination process.
          </p>
          <div className={styles.demoPromises}>
            <span>
              <RiCheckLine size={16} aria-hidden="true" /> A focused, 30-minute
              walkthrough
            </span>
            <span>
              <RiCheckLine size={16} aria-hidden="true" /> Your institution’s
              questions, answered
            </span>
            <span>
              <RiCheckLine size={16} aria-hidden="true" /> Examination platform
              and Student Portal overview
            </span>
          </div>
          <a
            className={styles.contactEmail}
            href={`mailto:${siteConfig.contactEmail}`}
          >
            <RiMailLine size={19} aria-hidden="true" />
            <span>
              <small>Prefer to write to us?</small>
              {siteConfig.contactEmail}
            </span>
            <RiArrowRightUpLine size={17} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.demoFormWrap}>
          <BorderBeam />
          <h3>Let’s find the right fit.</h3>
          <p>Tell us a little about your academic team.</p>
          <form
            className={styles.demoForm}
            onSubmit={prepareEmail}
            onChange={() => {
              setPrepared(false)
              setDraft("")
              setErrors([])
            }}
          >
            <div className={styles.formRow}>
              <label>
                Your name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder="Full name"
                  maxLength={100}
                />
              </label>
              <label>
                Work email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@institution.edu"
                  maxLength={160}
                />
              </label>
            </div>
            <label>
              Institution
              <input
                required
                name="institution"
                autoComplete="organization"
                placeholder="University or college name"
                maxLength={160}
              />
            </label>
            <label>
              Mobile number <span>(optional)</span>
              <input
                name="mobile"
                type="tel"
                autoComplete="tel"
                placeholder="Include your country code"
                maxLength={24}
              />
            </label>
            <div className={styles.formRow}>
              <label>
                Institution type <span>(optional)</span>
                <select name="institutionType" defaultValue="">
                  <option value="">Choose a type</option>
                  <option>University</option>
                  <option>Autonomous college</option>
                  <option>Affiliated college</option>
                  <option>Other institution</option>
                </select>
              </label>
              <label>
                Approximate scale <span>(optional)</span>
                <select name="scale" defaultValue="">
                  <option value="">Choose a range</option>
                  <option>1–5 departments</option>
                  <option>6–15 departments</option>
                  <option>16+ departments</option>
                  <option>Not sure yet</option>
                </select>
              </label>
            </div>
            <label>
              Your role
              <select required name="role" defaultValue="">
                <option value="" disabled>
                  Select your role
                </option>
                <option>Examination controller</option>
                <option>Faculty / Question setter</option>
                <option>Head of Department</option>
                <option>Principal / Management</option>
                <option>IQAC / OBE team</option>
                <option>IT / Administration</option>
                <option>Other</option>
              </select>
            </label>
            <div className={styles.formRow}>
              <label>
                Examination focus <span>(optional)</span>
                <select name="examFocus" defaultValue="">
                  <option value="">Choose an area</option>
                  <option>Question bank and AI drafting</option>
                  <option>Mid-term papers</option>
                  <option>End-semester papers</option>
                  <option>Review and approval workflows</option>
                  <option>Student Portal</option>
                  <option>Academic analytics</option>
                </select>
              </label>
              <label>
                Preferred date and time <span>(optional)</span>
                <input name="preferredTime" type="datetime-local" />
              </label>
            </div>
            <label>
              What would you like to explore? <span>(optional)</span>
              <textarea
                name="message"
                placeholder="Tell us about your examination workflow or student learning needs…"
                rows={3}
                maxLength={1500}
              />
            </label>
            <label className={styles.consentLabel}>
              <input required type="checkbox" name="consent" value="yes" />
              <span>
                I agree Questra may use these details to respond to my demo
                enquiry.
              </span>
            </label>
            <button type="submit" className={styles.button}>
              Prepare demo enquiry{" "}
              <RiArrowRightUpLine size={17} aria-hidden="true" />
            </button>
            <p className={styles.formNote}>
              This page prepares an email draft on your device; it does not send
              or store your details. Open the draft in your email app and send it
              to complete your request.
            </p>
            {errors.length > 0 && (
              <div className={styles.formStatus} role="alert">
                <p>{errors.join(" ")}</p>
              </div>
            )}
            {prepared && (
              <div className={styles.formStatus} role="status">
                <RiCheckLine size={17} aria-hidden="true" />
                <p>
                  Your enquiry is prepared.{" "}
                  <a href={draft}>Open the prepared email</a> and send it to
                  complete your request, or write to{" "}
                  <a href={`mailto:${siteConfig.contactEmail}`}>
                    {siteConfig.contactEmail}
                  </a>
                  .
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
