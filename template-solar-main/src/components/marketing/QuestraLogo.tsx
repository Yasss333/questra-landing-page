import Image from "next/image"
export default function QuestraLogo({ width = 156 }: { width?: number }) {
  return (
    <Image
      src="/brand/questra-logo.png"
      alt="Questra — Intelligence behind every Question"
      width={789}
      height={206}
      style={{ width, height: "auto" }}
      priority
    />
  )
}
