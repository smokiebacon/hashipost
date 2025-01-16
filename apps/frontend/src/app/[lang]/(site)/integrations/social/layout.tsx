import { ReactNode } from 'react';
import { getDictionary } from '../../../dictionaries';

export default async function IntegrationLayout({
  children,
  params : { lang }
}: {
  children: ReactNode;
  params : { lang: 'en' | 'ja' | 'zh' }
}) {
  const dictionary =await getDictionary(lang)
  return (
    <div className="text-6xl text-center mt-[50px]">
      {dictionary.launches["Adding channel, Redirecting You"]}  {children}
    </div>
  );
}
