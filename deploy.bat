cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:ChristopherJennings/unsplash-element.git master:gh-pages

cd ../