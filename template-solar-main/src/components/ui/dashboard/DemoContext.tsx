"use client"
import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"
import type {
  DemoReport,
  Paper,
  Question,
  Scope,
  Staff,
  Student,
  Subject,
  View,
} from "./demo-data"
export type DemoContextValue = {
  reportHistory: { report: DemoReport; at: string }[]
  setReportHistory: Dispatch<
    SetStateAction<{ report: DemoReport; at: string }[]>
  >
  view: View
  navigate: (view: View) => void
  search: string
  setSearch: (text: string) => void
  scope: Scope
  subjects: Subject[]
  setSubjects: Dispatch<SetStateAction<Subject[]>>
  scopedSubjects: Subject[]
  questions: Question[]
  setQuestions: Dispatch<SetStateAction<Question[]>>
  scopedQuestions: Question[]
  papers: Paper[]
  setPapers: Dispatch<SetStateAction<Paper[]>>
  scopedPapers: Paper[]
  staff: Staff[]
  setStaff: Dispatch<SetStateAction<Staff[]>>
  students: Student[]
  setStudents: Dispatch<SetStateAction<Student[]>>
  showDialog: (title: string, body: ReactNode, subtitle?: string) => void
  closeDialog: () => void
  notify: (text: string) => void
}
export const DemoContext = createContext<DemoContextValue | null>(null)
export function useDemo() {
  const value = useContext(DemoContext)
  if (!value) throw new Error("Dashboard context missing")
  return value
}
