// import { ReactNode } from 'react';
// import { RouteComponentProps } from 'react-router-dom';

export type ArticleTypes = {
  id: string,
  title: string,
  area: string,
  man: {
    isShow: boolean,
    sauna: string,
    water: string,
    outside: string,
    louryu: string
  },
  female: {
    isShow: boolean,
    sauna: string,
    water: string,
    outside: string,
    louryu: string
  },
  price: string,
  time: {
    isShow: boolean,
    start: string,
    end: string
  },
  image: {
    caption: string,
    dir: string,
    file_path: {
      xl: string
    }
  },
  release_datetime: string,
  exclusive: string,
  created: string,
  modified: string,
  latitude: number,
  longitude: number,
  site_url: string,
}

// 天気予報
export type WeatherTypes = {
  location: {
      city: string;
  };
  forecasts: {
      date: string;
      telop: string;
      temperature: {
          max: {
              celsius: string;
          };
      };
      chanceOfRain?: {
          day: string;
      };
      image: {
          title: string;
          url: string;
      }
  }[];
}

// export interface KpDetailPageProps
//   extends RouteComponentProps<{ id: string;}> {}

// export type Children = {
//   children: ReactNode,
// }