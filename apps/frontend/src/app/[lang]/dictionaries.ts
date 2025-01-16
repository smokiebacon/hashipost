import 'server-only'
const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    zh : () => import('./dictionaries/zh.json').then((module) => module.default),
    ja : () => import('./dictionaries/ja.json').then((module) => module.default),

    // nl: () => import('./dictionaries/nl.json').then((module) => module.default),
}
export const getDictionary = async (lang: 'en' | 'zh' | 'ja') => {
    return dictionaries[lang]();
} 