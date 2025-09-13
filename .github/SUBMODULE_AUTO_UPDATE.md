# Submodule Auto Update Setup

このリポジトリでは、`game-src` submoduleの自動更新機能を実装しています。

## 機能

- **定期チェック**: 毎時間、submoduleの更新をチェック
- **即座更新**: 手動でワークフローを実行可能
- **自動PR作成**: 更新があった場合、自動でPull Requestを作成
- **詳細情報**: コミットメッセージと変更内容を含む

## 設定されたトリガー

### 1. 定期実行（cron）
```yaml
schedule:
  - cron: '0 * * * *'  # 毎時間実行
```

### 2. 手動実行
GitHub ActionsのUIから「Run workflow」で手動実行可能

### 3. Repository Dispatch（オプション）
外部からwebhookで実行可能:
```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/USERNAME/REPO/dispatches \
  -d '{"event_type":"submodule-updated"}'
```

## ワークフローの動作

1. **チェックアウト**: リポジトリとsubmoduleを取得
2. **更新チェック**: `git submodule update --remote --merge`
3. **変更検知**: 変更があるかチェック
4. **PR作成**: 変更があれば自動でPRを作成
5. **自動承認**: （オプション）PRを自動承認

## 作成されるPRの内容

- **タイトル**: "Update game-src submodule"
- **ブランチ**: `update-submodule-{commit-hash}`
- **内容**: 
  - 最新コミットのメッセージ
  - コミットハッシュ
  - 変更内容の説明

## submoduleリポジトリ側の設定（オプション）

即座に更新をトリガーしたい場合は、submoduleリポジトリに以下のワークフローを追加:

```yaml
# game-src リポジトリの .github/workflows/notify-parent.yml
name: Notify Parent Repository

on:
  push:
    branches: [ main ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger parent repository update
        run: |
          curl -X POST \
            -H "Accept: application/vnd.github.v3+json" \
            -H "Authorization: token ${{ secrets.PARENT_REPO_TOKEN }}" \
            https://api.github.com/repos/USERNAME/tue-ofuro/dispatches \
            -d '{"event_type":"submodule-updated"}'
```

## 注意事項

- PRは自動作成されますが、マージは手動で行ってください
- 大きな変更がある場合は、PRの内容を十分確認してからマージしてください
- 必要に応じてcronの頻度を調整できます

## トラブルシューティング

### ワークフローが実行されない
- GitHub Actionsが有効になっているか確認
- リポジトリのSettingsでActionsの権限を確認

### PRが作成されない
- `GITHUB_TOKEN`の権限を確認
- ブランチ保護ルールを確認

### submoduleが更新されない
- submoduleのリポジトリが公開されているか確認
- `.gitmodules`のURLが正しいか確認