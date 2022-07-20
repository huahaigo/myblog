#!/usr/bin/env sh
###
 # @Author: huahai
 # @Date: 2022-07-19 11:16:34
 # @LastEditors: huahai
 # @LastEditTime: 2022-07-19 16:27:28
 # @FilePath: \vuepress-starter\deploy.sh
 # @Description: 自动构建上传github脚本
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m '更新Vue3.2 文章'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:huahaigo/myblog.git master:gh-pages

cd -