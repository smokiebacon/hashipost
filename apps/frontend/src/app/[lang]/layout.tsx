import DictionaryProvider from "@gitroom/frontend/components/layout/lang.context"
import { getDictionary } from "./dictionaries"

export async function generateStaticParams() {
    return [{ lang: 'en-US' }, { lang: 'zh' }]
  }
//    async
  export default async function RootLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode
    params: { lang: 'en' | 'zh' | 'ja' }
  }>) {
    // console.log('lang',params)
    const dictionary = await getDictionary(params.lang)
    // console.log('dictionary',dictionary)
    return (
      <html lang={params.lang}>
        <DictionaryProvider dictionary={dictionary}>
        <body>{children}</body>
        </DictionaryProvider>
      </html>
    )
  }