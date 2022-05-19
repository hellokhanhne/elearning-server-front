interface INewsCategory {
  news_category_id: number;
  news_category_name: string;
}

interface INews {
  news_title: string;
  news_desc: string;
  news_content: string;
  news_category: INewsCategory;
  news_image: string;
  news_id: number;
}

interface INewsCreate {
  news_title: string;
  news_desc: string;
  news_content: string;
  news_category_id: number;
  image: File;
  news_image: string;
}

export type { INews, INewsCreate, INewsCategory };
