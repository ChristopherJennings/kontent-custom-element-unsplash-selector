originUrl=`git config --get remote.origin.url`
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f $originUrl master:gh-pages
cd ../