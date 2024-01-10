export interface Product {
  id: { type: String };
  title: { type: String; required: true };
  description: { type: String; required: true };
  price: { type: Number; required: true };
  category: { type: String; required: true };
  unity: { type: String; required: true };
  isPromotion: { type: Boolean };
  promoPrice: { type: Number };
  nameImage: { type: String };
  size: { type: Number };
  key: { type: String };
  url: { type: String };
  createdAt: {
    type: Date;
  };
}
