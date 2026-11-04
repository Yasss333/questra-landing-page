import {
  BookOpen,
  ShieldCheck,
  Layers,
  Workflow,
  Users,
  ScanLine,
  ArrowRight,
  Check,
} from "lucide-react"
import { CardSpotlight } from "./card-spotlight"
import { Card, CardContent } from "./card"
import { FeaturesArt } from "./features-8-art"
import styles from "./feature-showcase.module.css"
type Card = readonly [string, string]
const icons = [BookOpen, Layers, ShieldCheck, Workflow, Users, ScanLine]
function Illustration({ kind, index }: { kind: string; index: number }) {
  const Icon = icons[index % icons.length]
  return (
    <div className={styles.art} aria-hidden="true">
      {kind === "intelligence" ? (
        <div className={styles.mapping}>
          <span>
            <BookOpen size={23} />
          </span>
          <i />
          <span>
            <Layers size={23} />
          </span>
          <i />
          <span>
            <ScanLine size={23} />
          </span>
        </div>
      ) : kind === "people" ? (
        <div className={styles.people}>
          {[0, 1, 2].map((n) => (
            <span key={n}>
              <Users size={20} />
              <i />
            </span>
          ))}
        </div>
      ) : kind === "governance" ? (
        <div className={styles.sourceArt}>
          <FeaturesArt variant={1} />
          <span className={styles.sourceBadge}>
            <ShieldCheck size={18} />
            <Check size={15} />
          </span>
        </div>
      ) : kind === "papers" ? (
        <div className={styles.sourceArt}>
          <FeaturesArt variant={index % 2 === 0 ? 2 : 3} />
        </div>
      ) : (
        <div className={styles.layers}>
          <span />
          <span />
          <span>
            <Icon size={34} />
          </span>
        </div>
      )}
    </div>
  )
}
export function Features({
  cards,
  path,
}: {
  cards: readonly Card[]
  path: string
}) {
  const plain = path === "/security-governance" || path === "/quality-validation"
  const kind = /analytics|syllabus/.test(path)
    ? "intelligence"
    : /faculty|solutions|about/.test(path)
      ? "people"
      : /security|validation/.test(path)
        ? "governance"
        : /paper|question-bank|question-studio/.test(path)
          ? "papers"
          : "setup"
  return (
    <div className={`${styles.grid} ${plain ? styles.plain : styles[kind]}`}>
      {cards.map(([title, description], index) =>
        plain ? (
          <CardSpotlight role="article" className={styles.card} key={title}>
            <CardContent className={styles.copy}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
            </CardContent>
          </CardSpotlight>
        ) : (
          <Card role="article" className={styles.card} key={title}>
            {!plain && <Illustration kind={kind} index={index} />}
            <CardContent className={styles.copy}>
              <span className={styles.index}>
                {String(index + 1).padStart(2, "0")}{" "}
                {!plain && <ArrowRight size={14} />}
              </span>
              <h3>{title}</h3>
              {description && <p>{description}</p>}
            </CardContent>
          </Card>
        ),
      )}
    </div>
  )
}
