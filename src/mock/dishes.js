// 菜单示例数据，后续接后端接口时替换这里即可
export const categories = [
  { id: "hot", name: "热销" },
  { id: "staple", name: "主食" },
  { id: "dish", name: "小炒" },
  { id: "drink", name: "饮品" }
];

// 没有配图时使用的占位图
export const DEFAULT_DISH_IMAGE = "/static/dishes/placeholder.png";

export const dishes = [
  { id: 1, categoryId: "hot", name: "招牌红烧肉", desc: "肥而不腻，下饭首选", price: 38, tag: "招牌", image: "/static/dishes/hongshaorou.png" },
  { id: 2, categoryId: "hot", name: "宫保鸡丁", desc: "花生米酥脆，微辣", price: 28, tag: "热销", image: "/static/dishes/gongbaojiding.png" },
  { id: 3, categoryId: "hot", name: "麻婆豆腐", desc: "麻辣鲜香", price: 22, tag: "", image: "/static/dishes/mapodoufu.png" },
  { id: 4, categoryId: "staple", name: "扬州炒饭", desc: "粒粒分明", price: 18, tag: "", image: "/static/dishes/yangzhouchaofan.png" },
  { id: 5, categoryId: "staple", name: "牛肉拉面", desc: "手工拉制", price: 26, tag: "", image: "/static/dishes/niuroulamian.png" },
  { id: 6, categoryId: "staple", name: "白米饭", desc: "一碗好饭", price: 3, tag: "", image: "/static/dishes/baimifan.png" },
  { id: 7, categoryId: "dish", name: "清炒时蔬", desc: "当季新鲜蔬菜", price: 16, tag: "", image: "/static/dishes/qingchaoshishu.png" },
  { id: 8, categoryId: "dish", name: "干锅花菜", desc: "锅气十足", price: 24, tag: "", image: "/static/dishes/ganguohuacai.png" },
  { id: 9, categoryId: "dish", name: "酸辣土豆丝", desc: "爽脆开胃", price: 14, tag: "", image: "/static/dishes/suanlatudousi.png" },
  { id: 10, categoryId: "drink", name: "柠檬水", desc: "冰镇解腻", price: 8, tag: "", image: "/static/dishes/ningmengshui.png" },
  { id: 11, categoryId: "drink", name: "酸梅汤", desc: "自家熬制", price: 10, tag: "", image: "/static/dishes/suanmeitang.png" },
  { id: 12, categoryId: "drink", name: "鲜榨橙汁", desc: "现榨无添加", price: 15, tag: "", image: "/static/dishes/xianzhaichengzhi.png" }
];

export function getDishesByCategory(categoryId) {
  return dishes.filter(item => item.categoryId === categoryId);
}
