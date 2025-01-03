
export const navigation = [
    { name: "صفحه اصلی", href: "/", current: false },
    { name: "گردنبند وآویز", href: "/categories/necklace", current: false },
    { name: "انگشتر", href: "/categories/ring", current: false },
    { name: "ست ونیم ست", href: "/categories/set", current: false },
    { name: "دستبند", href: "/categories/bracelet", current: false },
    { name: "گوشواره", href: "/categories/earring", current: false },
  ];
  
  export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  