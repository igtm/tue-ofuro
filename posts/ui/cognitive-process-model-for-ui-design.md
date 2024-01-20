---
dateTime: "2022-06-18T09:00:00.000Z"
---

# 行動・認知プロセスモデルを知って、UI を的確に改善しよう

元ネタ：[行動・認知プロセスモデルを知って、UI を的確に改善しよう - YouTube](https://www.youtube.com/playlist?list=PL0F39yMmd95ggP6_HU3wuzeVAiqmws1EV)

## 概要

一般化した「人間」を対象にしたモデルを理解し、ユーザーインターフェースの改善に活用する。
ユーザーやシステムの特性を考慮する方法を理解し、機能の要不要や優先順位付けの判断に活用する。

## キーワード

- **インターフェースの二重接面性** （佐伯胖 1988）
  - 第一接面と第二接面の関係性が 1:1 で、かつ近いほど望ましい
  - 『融けるデザイン』
  - 道具の透明性
- **行為の 7 段階モデル** （D.A.ノーマン 1988）
  - 『誰のためのデザイン』
  - メンタルモデル
  - 実行の淵、評価の淵
  - 5 State of UI
- **ペルソナ** （アラン・クーパー 1999）
  - 『コンピュータは、むずかしすぎて使えない!』
- **SRK（Skill / Rule / Knowledge）モデル**（ J・ラスムッセン 1983）
- OOUI（オブジェクト指向 UI） （IBM 1989）
- モデルヒューマンプロセッサ （S・カード、T・P・モラン、A・ニューウェル 1983）
- パンデモニアムモデル （O・セルフリッジ 1959）

## 一般的な行動・認知プロセス

### 認知と、インターフェースの二重接面性

道具を使うにあたって、2 種類のインターフェースがある。

- 第一接面と第二接面
- 操作 IF と制御 IF
- 操作対象と関心対象
- 物理的側面と認知的側面

これは、認知＝知覚＋解釈という構造と重なっている。

**ポイント**

- **第一接面から第二接面を想定できるようにすることが、ユーザーの認知（判断）を助けることにつながる。**

### 行為の 7 段階モデル

第一接面から第二接面を想定する際の認知の仕組みを詳細化したモデル。
一瞬の行為であっても、無意識化で行われるとされている。

- 1. 目標をたてる（ゴール）（暗いけど本を読みたい）
- 2. 目標を達成する計画をたてる（意図）（部屋の照明をつけよう）
- 3. **計画を実行するための手順を詳細化する**（行動計画）（あのスイッチを ON にしたら照明がつきそう）
- 4. 実際に操作する
- 5. **システムの状況を知覚する**（照明がついた）
- 6. **システムの状況を解釈する**（明るくなった）
- 7. **目標を達成できたかどうか比較する**（十分に読める明るさだ）

2, 3, 4 を「実行の淵」、5, 6, 7 を「評価の淵」と表現するモデルもある。

#### ポイント

- **「こうすれば、こうなる」が想定できるか**
- **システムの反応を、知覚・解釈・評価できるか**

### 行為の 7 段階モデルに基づいたチェック項目

『誰のためのデザイン』に書かれているものらしい。

- **システムの状態を知覚できる**デザインになっているか？
- **知覚されたシステムの状態とユーザの解釈**の間に良い対応付けがなされているか？
- システムが期待通りの状態であると**ユーザが評価できる**デザインになっているか？
- 装置の**機能がすぐにわかる**デザインになっているか？
- **どの操作が可能かわかる**デザインになっているか？
- **ユーザの意図と実際の動作**に良い対応付けができるデザインか？
- 意図した行動を**実行できる**か？

## ユーザーの特性に最適化する方法

- ペルソナを用意して、提供側の自己言及的な設計を避ける
- SRK モデルを利用して、サービスを使うユーザーの特性に適した設計を施す

### SRK（Skill / Rule / Knowledge）モデル

- スキルベースのユーザー
  - 上級者
  - そのシステムに対する十分な経験があり、学習した仕様をもとに無意識に操作する
- ルールベースのユーザー
  - そのシステムの規則や手順があることを知っており、それに従って操作する
- ナレッジベースのユーザー
  - 初心者
  - そのシステムについて知らないため、経験や知識をもとにその都度判断をしながら操作する

### ヒューマンエラーの種類

- スリップ：慣れているがゆえのエラー
- ミステイク：過去の知識や経験が通用しなかったときのエラー

### SRK（Skill / Rule / Knowledge）モデルに基づいたチェック項目

- **スキルベースのユーザーが、スリップを引き起こさないか**
- ルールベースのユーザーに対して、サポートは十分か
- **ナレッジベースのユーザーが、ミステイクを引き起こさないか**

どのレベルのユーザーが多いのか、ユーザーの使用頻度はどれくらいなのかによって、設計時にフォーカスするレベルが明確になる。

## おまけ

- OOUI で人間の認知フローに沿った構造で設計する
- 表記ゆれは認知にかかる時間を増やす
- フォントの不統一・混在は文字パターン認知の負荷を高める