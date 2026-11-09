"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { Locale } from "./artworks"

const dictionary = {
  en: {
    nav: { works: "Works", exhibitions: "Exhibitions", about: "About", contact: "Contact" },
    menu: "Menu",
    close: "Close",
    role: "Contemporary Artist",
    statement: ["Exploring", "the fluid boundaries", "of reality"],
    viewWorks: "View works",
    viewAllWorks: "View all works",
    viewAll: "View all",
    readMore: "Read more",
    inquire: "Inquire",
    featured: "Featured work",
    works: "Works",
    worksIntro:
      "Original paintings and works on paper, 2017 — 2023. Select a work to view it in detail.",
    filters: { all: "All", painting: "Paintings", drawing: "Drawings" },
    category: { painting: "Painting", drawing: "Work on paper" },
    worksCount: (n: number) => `${n} ${n === 1 ? "work" : "works"}`,
    detail: {
      year: "Year",
      category: "Category",
      dimensions: "Dimensions",
      onRequest: "Details on request",
      back: "All works",
      prev: "Previous work",
      next: "Next work",
      enlarge: "View full size",
      inquireAbout: "Inquire about this work",
      inquireText:
        "For acquisition, pricing and availability, please contact the studio directly.",
    },
    about: {
      title: "About",
      based: "Moscow | Dubai",
      p1: "Anastasia Evdokimova is a contemporary artist working between Moscow and Dubai.",
      p2: "Her works explore the fluid boundaries between reality and imagination, questioning the stability of time, space and human perception.",
      p3: "Through layered compositions, organic forms and shifting perspectives, she creates visual environments where multiple states of existence coexist.",
      philosophyTitle: "Artistic philosophy",
      philosophy:
        "Vision beyond time — every canvas is a threshold. Figures dissolve into ornament, ornament into landscape, and the viewer is invited to linger in the space between what is seen and what is felt.",
      backgroundTitle: "Creative background",
      background:
        "Her practice draws on the vivid ornamental traditions of Russian folk art — Khokhloma, Gzhel and the patterned kerchief — reimagined through a contemporary, abstract language of colour and movement.",
      portraitAlt: "Anastasia Evdokimova standing beside one of her paintings on an easel",
    },
    exhibitions: {
      title: "Exhibitions",
      intro: "A chronology of solo and group exhibitions.",
      solo: "Solo exhibitions",
      group: "Group exhibitions",
      soloShort: "Solo",
      groupShort: "Group",
      timeline: "Timeline",
    },
    contact: {
      title: "Contact",
      intro: "For inquiries, exhibitions and acquisition requests, please contact:",
      email: "Email",
      phone: "Phone",
      location: "Location",
      locationValue: "Dubai, UAE",
      instagram: "Instagram",
      formTitle: "Send an inquiry",
      name: "Name",
      emailField: "Email",
      subject: "Subject",
      subjects: {
        acquisition: "Acquisition",
        exhibition: "Exhibition",
        commission: "Commission",
        other: "Other",
      },
      artwork: "Artwork (optional)",
      message: "Message",
      send: "Send inquiry",
      sent: "Your email app has opened with the prepared message. Thank you for reaching out.",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        message: "Please write a message of at least 10 characters.",
      },
    },
    footer: { rights: "All rights reserved.", backTop: "Back to top" },
  },
  ru: {
    nav: { works: "Работы", exhibitions: "Выставки", about: "О художнике", contact: "Контакты" },
    menu: "Меню",
    close: "Закрыть",
    role: "Современный художник",
    statement: ["Исследуя", "текучие границы", "реальности"],
    viewWorks: "Смотреть работы",
    viewAllWorks: "Все работы",
    viewAll: "Все",
    readMore: "Подробнее",
    inquire: "Запрос",
    featured: "Избранная работа",
    works: "Работы",
    worksIntro:
      "Оригинальная живопись и работы на бумаге, 2017 — 2023. Выберите работу, чтобы рассмотреть её подробнее.",
    filters: { all: "Все", painting: "Живопись", drawing: "Графика" },
    category: { painting: "Живопись", drawing: "Работа на бумаге" },
    worksCount: (n: number) => {
      const m10 = n % 10
      const m100 = n % 100
      const word =
        m10 === 1 && m100 !== 11
          ? "работа"
          : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)
            ? "работы"
            : "работ"
      return `${n} ${word}`
    },
    detail: {
      year: "Год",
      category: "Категория",
      dimensions: "Размер",
      onRequest: "Подробности по запросу",
      back: "Все работы",
      prev: "Предыдущая работа",
      next: "Следующая работа",
      enlarge: "Открыть в полном размере",
      inquireAbout: "Запросить информацию",
      inquireText:
        "По вопросам приобретения, стоимости и наличия, пожалуйста, свяжитесь со студией напрямую.",
    },
    about: {
      title: "О художнике",
      based: "Москва | Дубай",
      p1: "Анастасия Евдокимова — современный художник, работающий между Москвой и Дубаем.",
      p2: "Её работы исследуют текучие границы между реальностью и воображением, ставя под вопрос устойчивость времени, пространства и человеческого восприятия.",
      p3: "Через многослойные композиции, органические формы и смещающиеся перспективы она создаёт визуальные пространства, где сосуществуют множественные состояния бытия.",
      philosophyTitle: "Художественная философия",
      philosophy:
        "Взгляд за пределы времени — каждое полотно становится порогом. Фигуры растворяются в орнаменте, орнамент — в пейзаже, а зритель приглашён задержаться в пространстве между видимым и прочувствованным.",
      backgroundTitle: "Творческие истоки",
      background:
        "Её практика опирается на яркие орнаментальные традиции русского народного искусства — хохлому, гжель и узорный платок, — переосмысленные на современном абстрактном языке цвета и движения.",
      portraitAlt: "Анастасия Евдокимова рядом со своей картиной на мольберте",
    },
    exhibitions: {
      title: "Выставки",
      intro: "Хронология персональных и групповых выставок.",
      solo: "Персональные выставки",
      group: "Групповые выставки",
      soloShort: "Персональная",
      groupShort: "Групповая",
      timeline: "Хронология",
    },
    contact: {
      title: "Контакты",
      intro: "По вопросам сотрудничества, выставок и приобретения работ:",
      email: "Почта",
      phone: "Телефон",
      location: "Локация",
      locationValue: "Дубай, ОАЭ",
      instagram: "Instagram",
      formTitle: "Отправить запрос",
      name: "Имя",
      emailField: "Email",
      subject: "Тема",
      subjects: {
        acquisition: "Приобретение",
        exhibition: "Выставка",
        commission: "Заказ",
        other: "Другое",
      },
      artwork: "Работа (необязательно)",
      message: "Сообщение",
      send: "Отправить",
      sent: "Почтовое приложение открыто с подготовленным письмом. Спасибо за обращение.",
      errors: {
        name: "Пожалуйста, укажите имя.",
        email: "Пожалуйста, укажите корректный email.",
        message: "Сообщение должно содержать не менее 10 символов.",
      },
    },
    footer: { rights: "Все права защищены.", backTop: "Наверх" },
  },
}

export type Dictionary = (typeof dictionary)["en"]

type LanguageContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = "ae-locale"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "en" || stored === "ru") setLocaleState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionary[locale] as Dictionary }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
