#!/usr/bin/env sh

git submodule foreach git checkout -b wip
git submodule foreach git add .
git submodule foreach git commit -m "wip"
git submodule foreach git push origin wip
git submodule foreach git checkout master
git submodule foreach git branch -D wip

git checkout -b wip
git add .
git commit -m "wip"
git push origin wip
git checkout master
git branch -D wip
