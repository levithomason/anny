#!/usr/bin/env bash

#
# configure git
#
git config --global user.email "dev-coop-bot@gmail.com"
git config --global user.name "dev-coop-bot"

#
# build
#
$(npm bin)/gulp build

#
# generate changelog
#
gem install github_changelog_generator
github_changelog_generator $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME

#
# push to master and gh-pages
#

# only add ignored production files
git add -f app/bower app/dist CHANGELOG.md dist docs/dist docs/index.html

if [[ -n $(git status --porcelain) ]]; then
  echo "starting deploy, repo is dirty after build"
  git commit -n -m "deploy commit by $CIRCLE_USERNAME"
  git push origin master
  git push -f origin master:gh-pages
else
  echo "skipping deploy, repo is clean after build"
fi
