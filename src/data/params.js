export const types = [
  { id: "chara", name: "角色" },
  { id: "dragon", name: "龙" },
  { id: "weapon", name: "武器" },
  { id: "amulet", name: "龙辉护符" },
];

export const idSubTable = {
  19900001: "19850400",
  19900002: "19150400",
  19900005: "19150300",
};

export const filterType = {
  chara: [
    { id: "chara_rarity", name: "原生稀有度" },
    { id: "chara_weapon_type", name: "武器种类" },
    { id: "chara_element", name: "属性" },
  ],
  dragon: [
    { id: "dragon_rarity", name: "稀有度" },
    { id: "dragon_element", name: "属性" },
  ],
  weapon: [
    { id: "weapon_rarity", name: "稀有度" },
    { id: "weapon_type", name: "武器种类" },
    { id: "weapon_element", name: "属性" },
  ],
  amulet: [{ id: "amulet_rarity", name: "稀有度" }],
};

export const filterParam = {
  chara_rarity: [
    { id: 0, name: "无", color: "#b5b5b5" },
    { id: 3, name: "三星", color: "#a67419" },
    { id: 4, name: "四星", color: "#b5b5b5" },
    { id: 5, name: "五星", color: "#fcc256" },
  ],
  chara_weapon_type: [
    { id: 0, name: "无", color: "#b5b5b5" },
    { id: 1, name: "剑", color: "#0051c9" },
    { id: 2, name: "刀", color: "#0051c9" },
    { id: 3, name: "短剑", color: "#0051c9" },
    { id: 4, name: "斧", color: "#0051c9" },
    { id: 5, name: "枪", color: "#0051c9" },
    { id: 6, name: "弓", color: "#0051c9" },
    { id: 7, name: "魔杖", color: "#0051c9" },
    { id: 8, name: "法杖", color: "#0051c9" },
    { id: 9, name: "铳", color: "#0051c9" },
  ],
  chara_element: [
    { id: 0, name: "无", color: "#b5b5b5" },
    { id: 1, name: "火", color: "#c92626" },
    { id: 2, name: "水", color: "#47b8de" },
    { id: 3, name: "风", color: "#00a331" },
    { id: 4, name: "光", color: "#fcc256" },
    { id: 5, name: "暗", color: "#520099" },
  ],
  dragon_rarity: [
    { id: 0, name: "无", color: "#b5b5b5" },
    { id: 3, name: "三星", color: "#a67419" },
    { id: 4, name: "四星", color: "#b5b5b5" },
    { id: 5, name: "五星", color: "#fcc256" },
  ],
  dragon_element: [
    { id: 0, name: "无", color: "#b5b5b5" },
    { id: 1, name: "火", color: "#c92626" },
    { id: 2, name: "水", color: "#47b8de" },
    { id: 3, name: "风", color: "#00a331" },
    { id: 4, name: "光", color: "#fcc256" },
    { id: 5, name: "暗", color: "#520099" },
  ],
  weapon_rarity: [
    { id: 1, name: "一星", color: "#a8b8a5" },
    { id: 2, name: "二星", color: "#5a8700" },
    { id: 3, name: "三星", color: "#a67419" },
    { id: 4, name: "四星", color: "#b5b5b5" },
    { id: 5, name: "五星", color: "#fcc256" },
    { id: 6, name: "六星", color: "#660099" },
  ],
  weapon_type: [
    { id: 1, name: "剑", color: "#0051c9" },
    { id: 2, name: "刀", color: "#0051c9" },
    { id: 3, name: "短剑", color: "#0051c9" },
    { id: 4, name: "斧", color: "#0051c9" },
    { id: 5, name: "枪", color: "#0051c9" },
    { id: 6, name: "弓", color: "#0051c9" },
    { id: 7, name: "魔杖", color: "#0051c9" },
    { id: 8, name: "法杖", color: "#0051c9" },
    { id: 9, name: "铳", color: "#0051c9" },
  ],
  weapon_element: [
    { id: 1, name: "火", color: "#c92626" },
    { id: 2, name: "水", color: "#47b8de" },
    { id: 3, name: "风", color: "#00a331" },
    { id: 4, name: "光", color: "#fcc256" },
    { id: 5, name: "暗", color: "#520099" },
    { id: 9, name: "无", color: "#b5b5b5" },
  ],
  amulet_rarity: [
    { id: 3, name: "三星", color: "#a67419" },
    { id: 4, name: "四星", color: "#b5b5b5" },
    { id: 5, name: "五星", color: "#fcc256" },
    { id: 9, name: "天魔", color: "#06c4b1" },
  ],
};
