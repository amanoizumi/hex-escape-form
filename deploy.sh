# 發生錯誤時終止
set -e

# 打包編譯
npm run build

# 加入你的 dist 資料夾，避免 .gitignore 忽略它
git add dist -f

git commit -m 'adding dist'

git subtree push --prefix dist origin gh-pages

cd -