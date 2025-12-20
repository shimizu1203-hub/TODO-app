# TODO App（Next.js + Supabase）

シンプルな TODO 管理アプリです。  
ログイン / サインアップ機能付きで、タスクの作成・編集・削除ができます。

🔗 **デモURL（Vercel）**  
https://todo-app-bay-five-19.vercel.app/login

---

## ✨ 主な機能

- ユーザー認証（ログイン / サインアップ）
- TODO一覧表示
- TODO作成・編集・削除
- TODO詳細ページ
- 認証エラーの日本語表示
- ログイン状態に応じた画面遷移

---

## 🛠 使用技術

### Frontend
- Next.js（App Router）
- TypeScript
- Tailwind CSS

### Backend / Auth
- Supabase

### Hosting
- Vercel

### Version Control
- Git / GitHub

---

## 📱 画面構成

| 画面 | URL |
|---|---|
| ログイン | `/login` |
| サインアップ | `/signup` |
| TODO一覧 | `/todos` |
| TODO詳細 | `/todos/[id]` |
| TODO編集 | `/todos/[id]/edit` |

---

## 🔑 テスト用アカウント

- **メールアドレス**: test@111  
- **パスワード**: 123456

---

## 🚀 ローカル起動方法

```bash
git clone https://github.com/shimizu1203-hub/TODO-app.git
cd TODO-app
npm install
npm run dev

⚙️ 環境変数

.env.local に以下を設定してください。
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

💡 工夫した点
	•	ログイン失敗時のエラーメッセージを日本語化
	•	ログイン中はボタンを無効化して多重送信を防止
	•	ログイン / サインアップ画面を分離し、UXを改善
	•	コンポーネント単位で責務を分離（Auth / Todo）

🔮 今後の改善予定
	•	ログイン済みユーザーのガード処理
	•	TODOの期限・優先度追加
	•	コメント機能の拡張
	•	UIアニメーション追加
