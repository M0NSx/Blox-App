import { useTranslations } from "next-intl"

export default function Home() {

  const t = useTranslations("Home")

  return (
    <main>
      <h1>{t("h1")}</h1>
    </main>
  )
}
