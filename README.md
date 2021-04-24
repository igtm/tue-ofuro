# 火曜日のおフロ

## 概要

@igtm, @t-gyo, @ymdarake が、ゆるーくフロントエンド周りの気になった記事を紹介しながらお届けします。

おフロは「フロントエンド」から来てます。

毎週土曜日更新。

## メンバー

### @igtm

### @t-gyo

### @ymdarake

## アーカイブ

## ブログ

- 開設しました🎉

## 占い

Comming Soon

## ゲーム

Comming Soon


# 1回目
- podcast 一覧・詳細
  - データの fetch

# 2回目
- <Header /> を作っていく
 - 担当
 - @igtm <Header.Logo>
 - @ymdarake <Header.Nav>
 - @gyo <Header> style

```
<Header />
<Main>
  - pages (dynamic)
  - sidemenu
<Footer>
```

# 3回目(今日やること)
- ロゴ作る(figma)

# 4回目
- vercel デプロイ時の.env直す


# 5回目(今日やること)
- @ymdarake: 一覧キレイにする
- @t-gyo: 詳細キレイにする
- @igtm: Youtubeの動画も一覧に入れる



# 6回目(今日やること)
- 一覧: 下に再生エリア作る
  - <FloatingPlayArea />
    - Play/Pause
    - Skip
    - SeekBar
    - Title
    - RemainingTime
  - 表示非表示、ページ間で共有: Recoil? or Context
    - PodcastEpisode? 型
- @ymdarake: 一覧キレイにする
- @t-gyo: 詳細キレイにする
- @igtm: Youtubeの動画も一覧に入れる


# 7回目
- 一覧下の再生バーを実装する


# 8回目(今日やること)
- 一覧下の再生バーを実装する



# TODO
- podcastではなく,「アーカイブ」にして Youtubeの動画もlistに入れる
- list画面で 再生ボタン付ける
- 矢印キーでn秒早送り
- spaceキーで停止
- 連続再生
- content-visibility: auto
- now on air 機能



# 研究課題
- 真ん中寄せ(max-width指定)Websiteとフルフル横幅どっちがいいの? (note.com vs medium.com)

ポッドキャスト一覧
- 日時、タイトル、時間を表示する順序、場所
- 時間の表示形式

再生機能と詳細へ遷移する機能を"適切"にする
- 再生する領域
- 詳細へ遷移する領域
- 全体のクリックを再生として、詳細への遷移ボタンをつける
- 全体のクリックを詳細へ遷移として、再生ボタンをつける
- 再生アイコンを表示するタイミング
- focus, hover 時の表現

リンク要素の表現
- 色、下線
- 外部リンク

本文width
- note.com: 620px
- medium.com: 680px
