# 常用的 git 指令

git init 初始化仓库
git add. 将文件添加到暂存区
git commit -m "xxx" 将文件提交到本地仓库
git push 将提交推送到远程仓库

# 提交时发生冲突，如何发生的冲突？怎么解决？

修改同一个公共文件，别人提交了我再提交就可能会报冲突

解决：
发现冲突之后，报错
先暂存本地代码，保存在栈区 git stash
再拉取远程分支上的代码合并到本地分支 git pull
把保存在栈区的修改部分合并到最新的工作空间 git stash pop

# 什么是 git？为什么要使用 git？

git 是一个版本控制系统
为了记录所有的文件内容变化，以便之后查特定版本的修改情况，不用担心文件丢失

# git 和 svn 的区别

git 是分布式，svn 是集中式
集中式：客户端连接中央服务器提交更新，如果中央服务器发生故障，故障期间所有人都无法提交更新
分布式：客户端会把代码仓库完整地镜像下来，这样即使服务器发生故障，也可以用镜像出来的本地仓库恢复

# git 的分支命令

查看分支：git branch
创建分支：git branch 分支名
切换分支：git checkout 分支名
创建并切换： git checkout -b 分支名
合并分支：git merge 合并分支名

# git pull 和 git fetch 的区别

git fetch 只是将远程仓库的最新版本下载到本地，但工作区的文件并没有更新
git pull 会从远程仓库获取到最新的版本并 merge 到本地

git pull origin 分支 = git fetch origin 分支 + git merge origin/分支

# git merge 分支名

将该分支合并到当前分支

# 回退

- git add 回退
  从暂存区回退到工作区
  git reset HEAD
- git commit 回退
  git reset --soft HEAD~1 回退一次 commit，回退到暂存区
  git reset --mixed HEAD~1 回退到工作区，不删除工作区改动代码
  git reset --hard HEAD~1 回退到工作区，删除工作区改动代码
