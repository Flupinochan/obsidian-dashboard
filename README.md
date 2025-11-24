## Pluginクラス

以下のライフサイクルを定義
- `onload()`: プラグインが読み込まれたときに呼び出されます。初期化コードをここに記述します。
- `onunload()`: プラグインがアンロードされるときに呼び出されます。クリーンアップコードをここに記述します。

```js
import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    console.log('loading plugin')
  }
  async onunload() {
    console.log('unloading plugin')
  }
}
```

## Dev Tool

`Ctrl + Shift + I`

## Pluginのホットリロード

[Hot-Reload](https://github.com/pjeby/hot-reload) プラグインを利用する

## mobile, node.js, electron

- [モバイルアプリ](https://docs.obsidian.md/Plugins/Getting+started/Mobile+development) 用のプラグイン開発も可能
- PCプラグインはnode.jsやelectron apiが利用可能
- [React](https://docs.obsidian.md/Plugins/Getting+started/Use+React+in+your+plugin) は利用可能


## Reactの利用

- `main.ts` は `main.tsx` にリネーム
- `esbuild.config.mjs` において `entryPoints: ["main.tsx"]` に変更
- `main.js` はRoot直下に出力する必要があるため注意


### めも

作成日時
ファイルサイズ
文字数
リンク数
バックリンク数
タグ数

## テスト用Vault

https://github.com/s-blu/obsidian_dataview_example_vault?tab=readme-ov-file

配下のファイル作成日時をランダムに変更

```powershell
Get-ChildItem -Path "." -Recurse -File | ForEach-Object {
    $randomDays = Get-Random -Minimum -730 -Maximum 730
    $randomDate = (Get-Date).AddDays($randomDays)
    Set-ItemProperty -Path $_.FullName -Name CreationTime -Value $randomDate
    Set-ItemProperty -Path $_.FullName -Name LastWriteTime -Value $randomDate
}

Get-ChildItem -Path "." -Recurse -File | Select-Object Name, CreationTime, LastWriteTime
```
