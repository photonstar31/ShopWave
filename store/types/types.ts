export type StoredDataType = {
  img: StaticImageData;
  title: string;
  price: number;
  orignalPrice: number;
  text: string;
  type: string[];
  category: string[];
  categoryLink: string[];
  sale: boolean;
  rating: number;
  id: number;
};

export type ProductPageData = {
  img: StaticImageData;
  title: string;
  price: number;
  orignalPrice: number;
  id: number;
  type: string[];
};
