# ionic + Reactアプリ

## 環境構築
### データクローン

```
$ git clone https://github.com/dai-570415/ionic-react-app.git
$ cd ionic-react-app
$ npm i
$ ionic serve
```

### モックサーバーの構築

```
# ターミナルをもう1つ開いて以下をインストールして起動する
$ npm install -g json-server
$ json-server --watch db.json --port 3001
```
- 基本KissPRESS APIの仕様です
- 位置情報の値だけ拡張しています(latitude, longitude)


### KissPRESSのAPIで動作確認する場合

`src/hooks/useKpArticles.ts`
1. 以下のようにコメントアウト切り替える
2. APIのURL

```ts
import { kpApi } from '../utils/kpApi';
// 省略
const fetchArticles = async () => {
    setIsLoading(true);
    try {
        const res = await axios.get(kpApi());
        setArticles(res.data.data);
        // const res = await axios.get('http://localhost:3001/data');
        // setArticles(res.data);
    } catch (error) {
        console.log(error);
    }
    setIsLoading(false);
}
// 省略
```

詳細ページの画像パスを変更
`src/components/KpContainer/KpDetail.tsx`

```tsx
{/* KissPRESS API */}
<img src={`http://api.kisspress.jp/${data.image.file_path.xl}`} alt="" />

{/* ローカルサーバー */}
{/* <img src={`${process.env.PUBLIC_URL}/assets/img/articles/${data.image.file_path.xl}`} alt="" /> */}
```

### MapBox APIの取得
1. MapBoxでアカウント作成
2. APIキーを取得
3. `.env.local`をルートに作成
4. YOUR API KEYに2で取得したキーを入れる

```
REACT_APP_MAPBOX_ACCESS_TOKEN=YOUR API KEY
```
これで一旦表示できるはずです。
- Google Map APIはGCPを登録する際クレカ登録が必要なため使用してません

## ドキュメントまとめ

### ネイティブプラットフォームで動作確認
```
最初にプロジェクトにCapacitorを追加
$ ionic integrations enable capacitor

次に、プロジェクトをビルドしてから利用するプラットフォームを選択
$ ionic build
$ ionic cap add ios
$ ionic cap add android

iOSとAndroidのプロジェクトを開く
$ ionic cap open ios
$ onic cap open android

各プラットフォームでビルドすればシュミレーター（Android Studioはエミュレーター）が開きデバッグできる
iOS…X Code
Android…Android Studio
```

### 静的画像表示
- Reactの作法通り使用可
- [Reactで静的ファイルを読み込ませる方法](https://webbibouroku.com/Blog/Article/react-public-folder)
#### ①importで読み込む
```tsx
import Image from './img/xxx.jpg'; // Imageは任意の名称
<img src={Image} alt="" />
```
#### ②publicフォルダから参照する
```tsx
<img src={`${process.env.PUBLIC_URL}/img/xxx.jpg`} alt="" />
```

### global cssの読み込み
- Reactの作法通り使用可
- global cssとはプロジェクト全体でスタイルを当てる際に使用するスタイル
- ionicでデフォルトで入っているスタイル `import './theme/variables.css';`以外は消さずそのままにしておいた方がいい。
消してしまうとスタイルが崩れる。
- ファイル名　xxx.css

```tsx
// App.tsxで読み込み
import './css/xxx.css';

<div className="container"></div>
```

### cssモジュールの読み込み
- Reactの作法通り使用可
- cssモジュールとは、各コンポーネント単位でインポートして読み込ませるスタイル。
- 各コンポーネントごとにインポートするので他のコンポーネントとスタイルが折衝しません。
- ファイル名　xxx.module.css ※moduleをつける

```tsx
// components/xxx/xxx.tsx
import Styles from './css/xxx.module.css';

<div className={Styles.container}></div>
```
※原則、compornetsに切り出したファイルはcssモジュールにすることをおすすめする

### IonIcon（アイコン）
- ionicフレームワーク内で使用できるアイコンライブラリ
- [https://ionic.io/ionicons](https://ionic.io/ionicons)
- Reactで使用する場合はキャメル記法で使う必要がある点は注意
- VS Codeだと補完機能が効くので、それを利用してインポートするのがおすすめ
- ① `@ionic/react` から `IonIcon` をインポート
- ② `ionicons/icons` から各アイコンをインポート
- ③ ビューで展開

```tsx
import { IonButton, IonContent, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';

export const IconExample: React.FC = () => {
  <IonContent>
    <IonButton>
      <IonIcon icon={camera} />
      Take Picture
    </IonButton>
  </IonContent>;
};
```

### ライフサイクルメソッド
- Ionicは、アプリで利用できるいくつかのライフサイクルメソッドを提供

| Event Name | Description |
| --- | --- |
| ionViewWillEnter | コンポーネントが表示されるアニメーションがはじまる時に発火します。 |
| ionViewDidEnter | コンポーネントが表示されるアニメーションが終了した時に発火します。 |
| ionViewWillLeave | コンポーネントを離脱するアニメーションがはじまる時に発火します。 |
| ionViewDidLeave | コンポーネントを離脱するアニメーションが終了した時に発火します。 |

```tsx
import {
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';

const HomePage: React.FC = () => {
  useIonViewDidEnter(() => {
    console.log('ionViewDidEnter event fired');
  });
  useIonViewDidLeave(() => {
    console.log('ionViewDidLeave event fired');
  });
  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
  });
  useIonViewWillLeave(() => {
    console.log('ionViewWillLeave event fired');
  });
  return (
    <IonContent>
        省略
    </IonContent>
  );
};
```

### props受け渡し
- Reactの作法通り使用可
- Reactでは親コンポーネントから子コンポーネントへ宣言的に値を渡すことが可能。
- 注意事項として複数のコンポーネントで値を使いたい時やバケツリレーしすぎるとデータが煩雑になるので、そういう場合はuseContextやReduxなどでグローバルで状態管理することを検討した方がいい

```tsx
// pages/Index.tsx (親コンポーネント)
<ExploreContainer title="Props" lead="This is a contents." />
```
※ExploreContainer は呼び出すコンポーネントで title や lead などのキーで値を渡すことが可能。キーは任意の名前で設定可能。

```tsx
//　conponents/ExploreContainer.tsx (子コンポーネント)
// TypeScriptであるため、必ず型定義する
// 本来はtypesフォルダのように型定義フォルダを共通で作ってコンポーネントでインポートするのが一般的
type ContainerProps = {
  title: string;
  lead: string;
}

export const ExploreContainer: React.FC<ContainerProps> = ({ title, lead }) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{lead}</p>
    </section>
  );
};
```
※以下でもOK。どちらの書き方がいいかはプロジェクトチームの規約による。

```tsx
export const ExploreContainer: React.FC<ContainerProps> = (props) => {
  return (
    <section>
      <h2>{props.title}</h2>
      <p>{props.lead}</p>
    </section>
  );
};
```

### 一覧、詳細のルーティング
- `App.tsx` にてルーティングの設定をする

```tsx
<Route exact path="/user"><UserListPage /></Route>
<Route exact path="/user/:id" component={UserDetailPage} />
```

- `:id` はgetパラメーター
- ボトムタブナビゲーションに入れたい場合は下記追加

```tsx
<IonTabButton tab="user" href="/user">
    <IonIcon aria-hidden="true" icon={personSharp} />
    <IonLabel>User</IonLabel>
</IonTabButton>
```

#### 一覧ページ

```tsx
const UserListPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonList>
                    <IonItem routerLink="/user/1">
                        <IonLabel>User 1</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default UserListPage;
```

#### 詳細ページ

```tsx
// 型定義
interface UserDetailPageProps
  extends RouteComponentProps<{ id: string;}> {}

const UserDetailPage: React.FC<UserDetailPageProps> = ({match}) => {
    return (
        <IonPage>
            <IonContent fullscreen>
                User: {match.params.id}<br />
            </IonContent>
        </IonPage>
    );
}

export default UserDetailPage;
```


### APIをグローバルでフェッチし展開させる方法
【学べること】
- useState, useEffectの使い方
- createContext, useContextでグローバルにデータを取り扱えるようになる
- axiosでのフェッチ
- カスタムフックの作り方
- 型定義

#### ①カスタムフックを実装する
- 【前提】Hooksは慣習的に`useKpArticles.ts`のように`use`からファイル名をつける
##### ①-1 必要なモジュールを読み込む

```ts
// hooks/useKpArticles.ts
import { useState, useEffect, createContext } from 'react';
import axios from 'axios'; // $ npm install axios でインストール
```

##### ①-2 型を定義し、読み込む
APIをフェッチさせてくるのでAPIスキーマに合わせて型を定義する。
場合によるが、基本は`types.ts`のように別ファイルに切り出しておくと管理しやすい。

```ts
// types/types.ts
export type KpArticleTypes = {
  id: string,
  title_s: string,
  image: {
    caption: string,
    file_path: {
      xl: string
    }
  },
  sentence1: string,
  event_term: string,
  release_datetime: string,
  latitude: number,
  longitude: number,
}
```

```ts
// hooks/useKpArticles.ts
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { KpArticleTypes } from '../types/types'; // 読み込み
```

##### ①-3 フェッチさせる関数を実装
【流れ】
- ①useStateでAPIの情報を格納する箱を作る
- ②useEffectでマウント時にフェッチ関数を発火
- ③APIをフェッチしたらその配列に情報を格納
- ④配列をreturnしてコンポーネントから展開できるようにする

```ts
// import { kpApi } from '../utils/kpApi'; // APIの関数データ

export const useKpArticles = () => {
    // ①
    const [articles, setArticles] = useState([/* 初期値は空配列 */]);

    // ②
    useEffect(() => {
        fetchArticles();
    }, []);

    // ③
    const fetchArticles = async () => {
        try {
            // const res = await axios.get(kpApi());
            // setArticles(res.data.data);
            const res = await axios.get('http://localhost:3001/data'); // APIのURLを入れる
            setArticles(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // ④
    return { articles };
}
```

##### ①-4 フェッチしてきた情報を格納するための箱を用意する

```ts
export const ArticlesContext = createContext<KpArticleTypes[]>([]);
```
※createContextで情報を格納するための箱を用意する際`KpArticleTypes`の型を指定する

##### カスタムフック全文

```ts
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { KpArticleTypes } from '../types/types';

export const useKpArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await axios.get('http://localhost:3001/data');
            setArticles(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return { articles };
}

export const ArticlesContext = createContext<KpArticleTypes[]>([]);
```

#### ②App.tsxでグローバルで情報を扱えるように設定する

```tsx
// カスタムフック読み込み
import { useKpArticles, ArticlesContext } from './hooks/useKpArticles';

const App: React.FC = () => {
  const { articles } = useKpArticles(); // フェッチデータ

  return (
    <IonApp>
      <IonReactRouter>
        {/* 作成したcreateContextでProviderを作る */}
        {/* value属性にフェッチデータの変数を入れる */}
        <ArticlesContext.Provider value={articles}>
          {/* この中に各種ルーティング */}
          {/* ArticlesContext.Providerで括ると各コンポーネントでグローバルにデータを取り出すことができる */}
        </ArticlesContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
}
```
※他のコードは割愛しています

####　③最後にコンポーネントファイルで展開する

```tsx
import { useContext } from 'react';
import { ArticlesContext } from '../../hooks/useKpArticles';

export const KpAllList = () => {
  const articles = useContext(ArticlesContext); // Contextデータ

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          { article.title_s }
        </li>
      ))}
    </ul>
  );
}
```