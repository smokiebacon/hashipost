'use client'

// import { getDictionary } from '@gitroom/frontend/app/[lang]/(site)/dictionaries';
import { getDictionary } from '@gitroom/frontend/app/[lang]/dictionaries';
import React from 'react';


export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
const DictionaryContext = React.createContext<Dictionary | null>(null)
// export const LangContext= createContext<>()


export default function DictionaryProvider({
    dictionary,
    children,
  }: {
    dictionary: Dictionary
    children: React.ReactNode
  }) {
    return (
      <DictionaryContext.Provider value={dictionary}>
        {children}
      </DictionaryContext.Provider>
    )
  }
  
export function useDictionary(screenName  = 'launches'): any {
    const dictionary = React.useContext(DictionaryContext)
    if (dictionary === null) {
      throw new Error('useDictionary hook must be used within DictionaryProvider')
    }
    return dictionary[screenName as keyof Dictionary]
}