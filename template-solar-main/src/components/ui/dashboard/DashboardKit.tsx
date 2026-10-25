"use client"
import { useId, useState, type ReactNode } from "react"
import {
  RiArrowRightUpLine,
  RiBookOpenLine,
  RiCheckLine,
  RiFileList3Line,
  RiPieChartLine,
  RiShieldCheckLine,
} from "@remixicon/react"
import styles from "../DashboardPreview.module.css"
export { styles }
export const chartColors = [
  "#084db5",
  "#19a889",
  "#7b6bd6",
  "#e7ab3a",
  "#de7184",
  "#63a8d6",
]
export function Panel({
  title,
  children,
  action,
  note,
}: {
  title: string
  children: ReactNode
  action?: ReactNode
  note?: string
}) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeading}>
        <h4>{title}</h4>
        {action}
      </div>
      {children}
      {note && <p className={styles.coverageNote}>{note}</p>}
    </section>
  )
}
export function Metrics({
  items,
}: {
  items: {
    label: string
    value: string | number
    note: string
    color?: string
  }[]
}) {
  const icons = [
    RiBookOpenLine,
    RiShieldCheckLine,
    RiPieChartLine,
    RiFileList3Line,
  ]
  return (
    <div className={styles.metrics}>
      {items.map((item, i) => {
        const Icon = icons[i % icons.length]
        return (
          <div className={styles.metric} key={item.label}>
            <div>
              <span>{item.label}</span>
              <i
                data-color={
                  item.color || ["blue", "green", "purple", "orange"][i % 4]
                }
              >
                <Icon size={17} aria-hidden="true" />
              </i>
            </div>
            <strong>{item.value}</strong>
            <small>{item.note}</small>
          </div>
        )
      })}
    </div>
  )
}
export function Pill({
  children,
  tone,
}: {
  children: ReactNode
  tone?: string
}) {
  const label = typeof children === "string" ? children.toLowerCase() : ""
  const color =
    tone ||
    (/approved|verified|complete|mapped|active|good|released|passed|matched/.test(
      label,
    ) && !/incomplete|unmapped/.test(label)
      ? "green"
      : /missing|revision|gap|incomplete|unmapped|high/.test(label)
        ? "red"
        : /review|draft|medium|moderate|pending/.test(label)
          ? "amber"
          : "blue")
  return (
    <span className={styles.pill} data-tone={color}>
      {children}
    </span>
  )
}
export function Progress({
  value,
  tone = "blue",
}: {
  value: number
  tone?: string
}) {
  return (
    <span className={styles.progressRow}>
      <span className={styles.track}>
        <span
          data-tone={tone}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </span>
      <strong>{value}%</strong>
    </span>
  )
}
export function Action({
  children,
  onClick,
  primary,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  primary?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      className={primary ? styles.primaryAction : styles.secondaryAction}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
export function Table({
  headers,
  rows,
  label,
  empty = "No records match these filters.",
  pageSize = 5,
}: {
  headers: string[]
  rows: ReactNode[][]
  label: string
  empty?: string
  pageSize?: number
}) {
  const [page, setPage] = useState(0)
  const maxPage = Math.max(0, Math.ceil(rows.length / pageSize) - 1)
  const current = Math.min(page, maxPage)
  return (
    <>
      <div
        className={styles.tableScroll}
        tabIndex={0}
        role="region"
        aria-label={`${label} scrollable table`}
      >
        <table aria-label={label}>
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows
              .slice(current * pageSize, (current + 1) * pageSize)
              .map((row, i) => (
                <tr key={i}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {!rows.length ? (
        <p className={styles.empty}>{empty}</p>
      ) : (
        <div className={styles.tableFooter}>
          <span>
            Showing {current * pageSize + 1}–
            {Math.min((current + 1) * pageSize, rows.length)} of {rows.length}{" "}
            sample records
          </span>
          {rows.length > pageSize && (
            <span className={styles.pagination}>
              <button
                aria-label={`Previous page of ${label}`}
                disabled={!current}
                onClick={() => setPage(current - 1)}
              >
                ←
              </button>
              <span>
                {current + 1} / {maxPage + 1}
              </span>
              <button
                aria-label={`Next page of ${label}`}
                disabled={current === maxPage}
                onClick={() => setPage(current + 1)}
              >
                →
              </button>
            </span>
          )}
        </div>
      )}
    </>
  )
}
export function Donut({
  data,
  label,
}: {
  data: { label: string; value: number }[]
  label: string
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let offset = 0
  const stops = data
    .map((d, i) => {
      const start = offset
      offset += total ? (d.value / total) * 100 : 0
      return `${chartColors[i % 6]} ${start}% ${offset}%`
    })
    .join(", ")
  return (
    <div className={styles.donutLayout}>
      <div
        className={styles.donut}
        style={{ background: total ? `conic-gradient(${stops})` : "#edf1f5" }}
        role="img"
        aria-label={`${label}: ${data.map((d) => `${d.label} ${d.value}`).join(", ")}`}
      >
        <div>
          <strong>{total}</strong>
          <span>{label}</span>
        </div>
      </div>
      <div className={styles.legend}>
        {data.map((d, i) => (
          <div key={d.label}>
            <span style={{ background: chartColors[i % 6] }} />
            <span>{d.label}</span>
            <strong>
              {total ? Math.round((d.value / total) * 100) : 0}%{" "}
              <small>({d.value})</small>
            </strong>
          </div>
        ))}
      </div>
    </div>
  )
}
export function BarList({
  data,
  max,
}: {
  data: { label: string; value: number; target?: number; color?: string }[]
  max?: number
}) {
  const limit =
    max || Math.max(1, ...data.map((d) => Math.max(d.value, d.target || 0)))
  return (
    <div className={styles.barList}>
      {data.map((d, i) => (
        <div key={d.label}>
          <span>{d.label}</span>
          <div className={styles.barTrack}>
            <span
              style={{
                width: `${Math.min(100, ((d.target ?? limit) / limit) * 100)}%`,
              }}
            />
            <i
              style={{
                width: `${Math.min(100, (d.value / limit) * 100)}%`,
                background: d.color || chartColors[i % 6],
              }}
            />
          </div>
          <strong>
            {d.value}
            {d.target !== undefined && <small> / {d.target}</small>}
          </strong>
        </div>
      ))}
    </div>
  )
}
export function GrowthChart({
  total,
  dual = false,
}: {
  total: number
  dual?: boolean
}) {
  const [period, setPeriod] = useState("6 months")
  const [active, setActive] = useState<number | null>(null)
  const id = useId().replaceAll(":", "")
  const labels =
    period === "6 months"
      ? ["May", "Jun", "Jul", "Aug", "Sep", "Oct"]
      : ["01 Oct", "06 Oct", "11 Oct", "16 Oct", "21 Oct", "25 Oct"]
  const values = (
    period === "6 months"
      ? [0.28, 0.39, 0.52, 0.68, 0.82, 1]
      : [0.76, 0.8, 0.84, 0.89, 0.95, 1]
  ).map((r) => Math.round(total * r))
  const points = values.map((n, i) => ({
    x: 35 + i * 82,
    y: 158 - (n / Math.max(1, total)) * 120,
  }))
  const path = points.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ")
  return (
    <Panel
      title={dual ? "Question additions & approvals" : "Question bank growth"}
      action={
        <select
          aria-label="Chart date range"
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value)
            setActive(null)
          }}
        >
          <option>6 months</option>
          <option>30 days</option>
        </select>
      }
    >
      <div className={styles.chartTotal}>
        {total}
        <span>{dual ? "questions added" : "approved questions"}</span>
        <small>
          <RiArrowRightUpLine size={13} /> Illustrative activity across this
          selection
        </small>
      </div>
      <div className={styles.chart}>
        <svg
          viewBox="0 0 480 198"
          role="group"
          aria-label="Question activity chart"
        >
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#084db5" stopOpacity=".15" />
              <stop offset="1" stopColor="#084db5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[38, 78, 118, 158].map((y, i) => (
            <g key={y}>
              <line x1="35" x2="445" y1={y} y2={y} stroke="#e9eef5" />
              <text
                x="24"
                y={y + 3}
                textAnchor="end"
                fontSize="9"
                fill="#64748b"
              >
                {Math.round(total * (1 - i / 3))}
              </text>
            </g>
          ))}
          <path d={`${path} L445,158 L35,158 Z`} fill={`url(#${id})`} />
          <path
            d={path}
            fill="none"
            stroke="#084db5"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {dual && (
            <path
              d={points
                .map(
                  (p, i) => `${i ? "L" : "M"}${p.x},${p.y + (158 - p.y) * 0.3}`,
                )
                .join(" ")}
              fill="none"
              stroke="#19a889"
              strokeWidth="2"
            />
          )}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="white"
                stroke="#084db5"
                strokeWidth="2"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="15"
                fill="transparent"
                role="button"
                tabIndex={0}
                aria-label={`${labels[i]}: ${values[i]} questions`}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    setActive(i)
                  }
                }}
              />
              <text
                x={p.x}
                y="184"
                textAnchor="middle"
                fontSize="9"
                fill="#64748b"
              >
                {labels[i]}
              </text>
              {active === i && (
                <g pointerEvents="none">
                  <rect
                    x={Math.min(390, Math.max(5, p.x - 35))}
                    y={p.y - 27}
                    width="75"
                    height="20"
                    rx="4"
                    fill="#102442"
                  />
                  <text
                    x={Math.min(427, Math.max(42, p.x + 2))}
                    y={p.y - 13}
                    textAnchor="middle"
                    fontSize="9"
                    fill="white"
                  >
                    {values[i]} questions
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
        <span className={styles.chartHint}>
          {dual
            ? "Blue: added · Green: approved (illustrative trend)"
            : "Explore a point to see the question count"}
        </span>
      </div>
    </Panel>
  )
}
export function Notice({
  children,
  tone = "amber",
  action,
}: {
  children: ReactNode
  tone?: string
  action?: ReactNode
}) {
  return (
    <div className={styles.notice} data-tone={tone}>
      <span>{children}</span>
      {action}
    </div>
  )
}
export function Check({ children }: { children: ReactNode }) {
  return (
    <span className={styles.checkText}>
      <RiCheckLine size={14} />
      {children}
    </span>
  )
}
