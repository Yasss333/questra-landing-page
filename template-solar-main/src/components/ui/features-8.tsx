import {
  BookOpen, ShieldCheck, Layers, Workflow, Users, ScanLine,
  CalendarDays, Network, Building2, Upload, FileText, Target,
  ChartNoAxesCombined, SlidersHorizontal, ListChecks, Sparkles,
  History, Search, Library, Tags, CopyCheck, Send, GraduationCap,
  LockKeyhole, Settings2, Download, GitCompareArrows, DatabaseBackup,
  Plug, UserRoundCheck, Split, ClipboardCheck, Landmark,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "./card"
import styles from "./feature-showcase.module.css"

type FeatureCard = readonly [string, string]

const defaultIcons = [BookOpen, Layers, ShieldCheck, Workflow, Users, ScanLine, Target, ChartNoAxesCombined, FileText, Settings2, CalendarDays, ListChecks]
const routeIcons: Record<string, readonly LucideIcon[]> = {
  "/academic-setup": [Settings2, Network, Upload, FileText, Users, ClipboardCheck],
  "/examination-calendar": [CalendarDays, ListChecks, Layers, FileText, History, Target],
  "/quality-validation": [ListChecks, FileText, CopyCheck, Target, GitCompareArrows, ShieldCheck, Settings2, History],
  "/faculty-portal": [GraduationCap, ListChecks, BookOpen, GitCompareArrows, Workflow, LockKeyhole],
  "/syllabus-intelligence": [CalendarDays, Network, Building2, Users, Upload, FileText, Target, ChartNoAxesCombined],
  "/academic-analytics": [Target, SlidersHorizontal, ListChecks],
  "/about": [BookOpen, Sparkles, History, ClipboardCheck],
  "/ai-question-studio": [Library, History, BookOpen, SlidersHorizontal, GitCompareArrows, FileText, ShieldCheck, Send],
  "/question-bank": [History, ListChecks, Tags, Search, CopyCheck, FileText, GraduationCap],
  "/bulk-paper-generation": [GitCompareArrows, LockKeyhole, Settings2, Target, Library, CopyCheck, ClipboardCheck, Download],
  "/security-governance": [DatabaseBackup, Plug, UserRoundCheck, Split, History, LockKeyhole, Workflow, Settings2],
  "/solutions": [Landmark, Building2, ClipboardCheck, GraduationCap],
}

export function Features({ cards, path }: { cards: readonly FeatureCard[]; path: string }) {
  const icons = routeIcons[path] ?? defaultIcons

  return (
    <div className={styles.grid} data-count={cards.length}>
      {cards.map(([title, description], index) => {
        const Icon = icons[index] ?? FileText
        return (
          <Card role="article" className={styles.card} key={title}>
            <CardContent className={styles.copy}>
              <span className={styles.icon} aria-hidden="true">
                <Icon size={26} strokeWidth={1.6} />
              </span>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
