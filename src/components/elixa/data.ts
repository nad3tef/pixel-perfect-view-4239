export type NeedId = "hydration" | "antioxidant" | "tone";

export type Plant = {
  id: string;
  ar: string;
  en: string;
  compoundAr: string;
  compound: string;
  need: NeedId;
  productAr: string;
  product: string;
  noteAr: string;
  note: string;
  accent: string;
  leaf: {
    from: string;
    mid: string;
    to: string;
    glow: string;
    variant: "broad" | "succulent" | "serrated" | "narrow" | "lobed";
  };
};

export const needs: { id: NeedId; ar: string; en: string; descAr: string; desc: string }[] = [
  {
    id: "hydration",
    ar: "ترطيب البشرة",
    en: "Hydration",
    descAr: "بشرة ناشفة وشادّة ومحتاجة مياه",
    desc: "Dry, tight skin that needs water",
  },
  {
    id: "antioxidant",
    ar: "حماية مضادة للأكسدة",
    en: "Antioxidant protection",
    descAr: "حماية من الإجهاد التأكسدي",
    desc: "Defence against oxidative stress",
  },
  {
    id: "tone",
    ar: "توحيد لون البشرة",
    en: "Even tone",
    descAr: "مظهر البقع الداكنة أوضح من اللازم",
    desc: "The look of dark spots and unevenness",
  },
];

export const plants: Plant[] = [
  {
    id: "guava",
    ar: "الجوافة",
    en: "Guava",
    compoundAr: "فيتامين سي",
    compound: "Vitamin C (Ascorbic acid)",
    need: "tone",
    productAr: "سيروم فيتامين سي",
    product: "Vitamin C serum",
    noteAr:
      "فيتامين سي مضاد أكسدة، ولما يتصاغ صح في مستحضر ثابت ممكن يحسّن مظهر البقع الداكنة مع الوقت.",
    note: "Vitamin C is an antioxidant; in a well-formulated, stable product it may improve the appearance of hyperpigmentation over time.",
    accent: "#ffd76a",
    leaf: { from: "#bff36a", mid: "#57c46a", to: "#1d7a4f", glow: "#c9ff8a", variant: "broad" },
  },
  {
    id: "aloe",
    ar: "الألوفيرا",
    en: "Aloe vera",
    compoundAr: "سكريات متعددة (أسيمانان)",
    compound: "Polysaccharides (Acemannan)",
    need: "hydration",
    productAr: "چل مرطّب خفيف",
    product: "Lightweight hydrating gel",
    noteAr: "السكريات المتعددة بتشتغل كمرطّبات جاذبة للمياه وبتساعد على تهدئة الإحساس بالشد.",
    note: "Polysaccharides act as water-binding humectants and help soothe the feeling of tightness.",
    accent: "#7ef0d0",
    leaf: { from: "#a8f5cf", mid: "#3fc9a2", to: "#127a68", glow: "#8ff7de", variant: "succulent" },
  },
  {
    id: "greentea",
    ar: "الشاي الأخضر",
    en: "Green tea",
    compoundAr: "إبيجالوكاتيشين جالات",
    compound: "EGCG (Polyphenol)",
    need: "antioxidant",
    productAr: "إسنس مضاد للأكسدة",
    product: "Antioxidant essence",
    noteAr: "البوليفينولات زي EGCG مضادات أكسدة بتساعد في تقليل أثر الجذور الحرة على سطح الجلد.",
    note: "Polyphenols such as EGCG are antioxidants that help limit free-radical damage at the skin surface.",
    accent: "#8ef07a",
    leaf: { from: "#d7f58c", mid: "#6bc24b", to: "#245c2a", glow: "#a8f58a", variant: "serrated" },
  },
  {
    id: "argan",
    ar: "الأركان",
    en: "Argan",
    compoundAr: "فيتامين E وأحماض دهنية",
    compound: "Vitamin E & fatty acids",
    need: "hydration",
    productAr: "زيت مغذّي للوجه",
    product: "Nourishing face oil",
    noteAr: "الأحماض الدهنية بتدعم حاجز البشرة وبتقلل فقدان المياه، وفيتامين E بيحمي الزيت نفسه.",
    note: "Fatty acids support the skin barrier and reduce water loss; vitamin E also protects the oil itself.",
    accent: "#ffcf87",
    leaf: { from: "#e6f2a0", mid: "#9ec45a", to: "#5c6b23", glow: "#f0e39a", variant: "narrow" },
  },
  {
    id: "hibiscus",
    ar: "الكركديه",
    en: "Hibiscus",
    compoundAr: "أحماض ألفا هيدروكسي",
    compound: "AHAs (Citric & malic acid)",
    need: "tone",
    productAr: "تونر تقشير لطيف",
    product: "Gentle exfoliating toner",
    noteAr: "أحماض ألفا هيدروكسي بتساعد على تقشير سطحي لطيف، فبيبان الجلد أنعم وأكثر تجانسًا.",
    note: "AHAs provide gentle surface exfoliation, so skin can look smoother and more even.",
    accent: "#ff86c4",
    leaf: { from: "#ffb3d9", mid: "#e0468f", to: "#7a1245", glow: "#ff9ad0", variant: "lobed" },
  },
];
