export type Locale = "en" | "ru"
export type Localized = Record<Locale, string>
export type ArtworkCategory = "painting" | "drawing"

export type ArtworkImage = {
  src: string
  width: number
  height: number
}

export type Artwork = {
  slug: string
  title: Localized
  year: number
  category: ArtworkCategory
  image: ArtworkImage
  views?: (ArtworkImage & { caption: Localized })[]
  dimensions?: string
  description?: Localized
}

export const artworks: Artwork[] = [
  {
    slug: "regression",
    title: { en: "Regression", ru: "Регрессия" },
    year: 2017,
    category: "painting",
    image: { src: "/works/regression.jpg", width: 624, height: 825 },
    description: {
      en: "A study of inner transformation, where the boundaries between human form, nature and imagination blur into a fluid reality.",
      ru: "Исследование внутренней трансформации, где границы между человеческой формой, природой и воображением растворяются в текучей реальности.",
    },
  },
  {
    slug: "dream-pulse",
    title: { en: "Dream Pulse", ru: "Пульс сна" },
    year: 2018,
    category: "painting",
    image: { src: "/works/dream-pulse.jpg", width: 627, height: 751 },
    description: {
      en: "A composition of shifting forms and vibrant contrasts, exploring the rhythm of perception and the instability of reality.",
      ru: "Композиция из смещающихся форм и ярких контрастов, исследующая ритм восприятия и неустойчивость реальности.",
    },
  },
  {
    slug: "the-eternal-passage",
    title: { en: "The Eternal Passage", ru: "Вечный переход" },
    year: 2023,
    category: "painting",
    image: { src: "/works/the-eternal-passage.jpg", width: 671, height: 983 },
  },
  {
    slug: "evanesense",
    title: { en: "Evanesense", ru: "Эванесенс" },
    year: 2020,
    category: "painting",
    image: { src: "/works/evanesense.jpg", width: 599, height: 749 },
  },
  {
    slug: "entropy",
    title: { en: "Entropy", ru: "Энтропия" },
    year: 2020,
    category: "painting",
    dimensions: "250 × 140 cm",
    image: { src: "/works/entropy.jpg", width: 1241, height: 691 },
  },
  {
    slug: "khokhloma-dawn",
    title: { en: "Khokhloma Dawn", ru: "Хохломской рассвет" },
    year: 2021,
    category: "painting",
    image: { src: "/works/khokhloma-dawn.jpg", width: 656, height: 438 },
  },
  {
    slug: "the-russian-feminine",
    title: { en: "The Russian Feminine", ru: "Русское женское" },
    year: 2021,
    category: "painting",
    image: { src: "/works/the-russian-feminine.jpg", width: 953, height: 439 },
  },
  {
    slug: "the-riders-echo",
    title: { en: "The Riders Echo", ru: "Эхо всадников" },
    year: 2019,
    category: "painting",
    image: { src: "/works/the-riders-echo-1.jpg", width: 519, height: 631 },
    views: [
      {
        src: "/works/the-riders-echo-2.jpg",
        width: 572,
        height: 705,
        caption: { en: "Second panel", ru: "Вторая часть" },
      },
    ],
  },
  {
    slug: "the-hidden-self",
    title: { en: "The Hidden Self", ru: "Скрытое «я»" },
    year: 2018,
    category: "drawing",
    image: { src: "/works/the-hidden-self.jpg", width: 427, height: 533 },
  },
  {
    slug: "kiss-of-souls",
    title: { en: "Kiss of Souls", ru: "Поцелуй душ" },
    year: 2018,
    category: "drawing",
    image: { src: "/works/kiss-of-souls.jpg", width: 434, height: 532 },
  },
  {
    slug: "fleeting-lights",
    title: { en: "Fleeting Lights", ru: "Мимолётные огни" },
    year: 2020,
    category: "drawing",
    image: { src: "/works/fleeting-lights.jpg", width: 421, height: 532 },
  },
  {
    slug: "gzhel-blossom",
    title: { en: "Gzhel Blossom", ru: "Гжельский цвет" },
    year: 2021,
    category: "painting",
    image: { src: "/works/gzhel-blossom.jpg", width: 433, height: 619 },
  },
  {
    slug: "red-kerchief",
    title: { en: "Red Kerchief", ru: "Красный платок" },
    year: 2021,
    category: "painting",
    image: { src: "/works/red-kerchief.jpg", width: 431, height: 618 },
  },
  {
    slug: "whispers-of-eternity",
    title: { en: "Whispers of Eternity", ru: "Шёпот вечности" },
    year: 2022,
    category: "painting",
    image: { src: "/works/whispers-of-eternity.jpg", width: 1354, height: 1229 },
  },
  {
    slug: "vision-beyond-time",
    title: { en: "Vision Beyond Time", ru: "Взгляд за пределы времени" },
    year: 2022,
    category: "painting",
    image: { src: "/works/vision-beyond-time.jpg", width: 922, height: 886 },
  },
  {
    slug: "prey",
    title: { en: "Prey", ru: "Добыча" },
    year: 2021,
    category: "painting",
    image: { src: "/works/prey.jpg", width: 723, height: 1044 },
  },
  {
    slug: "tropical-flame",
    title: { en: "Tropical Flame", ru: "Тропическое пламя" },
    year: 2023,
    category: "painting",
    image: { src: "/works/tropical-flame.jpg", width: 799, height: 1044 },
  },
  {
    slug: "savannas-heart",
    title: { en: "Savanna’s Heart", ru: "Сердце саванны" },
    year: 2019,
    category: "painting",
    image: { src: "/works/savannas-heart.jpg", width: 741, height: 945 },
  },
  {
    slug: "dusk-and-dawn",
    title: { en: "Dusk & Dawn", ru: "Закат и рассвет" },
    year: 2019,
    category: "painting",
    image: { src: "/works/dusk-and-dawn.jpg", width: 750, height: 947 },
  },
]

export const featuredSlugs = [
  "regression",
  "dream-pulse",
  "the-eternal-passage",
  "entropy",
  "gzhel-blossom",
  "tropical-flame",
]

export function getArtwork(slug: string) {
  return artworks.find((a) => a.slug === slug)
}

export function getNeighbours(slug: string) {
  const index = artworks.findIndex((a) => a.slug === slug)
  const total = artworks.length
  return {
    index,
    total,
    prev: artworks[(index - 1 + total) % total],
    next: artworks[(index + 1) % total],
  }
}

export type Exhibition = {
  year: number
  type: "solo" | "group"
  title: Localized
  location: Localized
}

export const exhibitions: Exhibition[] = [
  {
    year: 2024,
    type: "solo",
    title: { en: "Solo Exhibition", ru: "Персональная выставка" },
    location: { en: "Dubai, UAE", ru: "Дубай, ОАЭ" },
  },
  {
    year: 2023,
    type: "group",
    title: { en: "Group Exhibition", ru: "Групповая выставка" },
    location: { en: "Saint Petersburg, Russia", ru: "Санкт-Петербург, Россия" },
  },
  {
    year: 2020,
    type: "group",
    title: { en: "Group Exhibition", ru: "Групповая выставка" },
    location: { en: "Moscow, Russia", ru: "Москва, Россия" },
  },
  {
    year: 2018,
    type: "group",
    title: { en: "Group Exhibition", ru: "Групповая выставка" },
    location: { en: "Moscow, Russia", ru: "Москва, Россия" },
  },
  {
    year: 2016,
    type: "group",
    title: { en: "Group Exhibition", ru: "Групповая выставка" },
    location: { en: "Moscow, Russia", ru: "Москва, Россия" },
  },
]

export const site = {
  name: "Anastasia Evdokimova",
  email: "evdokimovasia@gmail.com",
  phone: "+7 925 042 00 85",
  instagram: "",
}
