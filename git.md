# 常用的 git 指令

【我们在工作区开发】

git init 初始化仓库
git add. 将文件添加到暂存区
git commit -m "xxx" 将文件提交到本地仓库
git push 将提交推送到远程仓库

git pull 远程仓库拉取代码，和工作区代码快速合并

【git fork也有拉取的意思，但相当于在自己的远程仓库里复制了一份别人的仓库，

此时进行的add、commit等操作是修改自己远程仓库里的代码】

# 对GitFlow的理解

一种工作流

主要分支：master、develop

辅助分支：feature、release、hotfix

- master核心分支
  
  master分支每个版本都要配合打tag
  
  不能直接在master上提交代码，只接受其他分支合并

- develop开发分支
  
  feature分支完成了新功能就会合并到develop分支

- feature分支：用于开发新功能，开发完后合并到develop分支

- release分支：用于准备发布，在release上进行最后的测试

- hotfix分支：用于紧急修复生产版本的bug

工作流程：

- 仓库创建时，就创建了master分支，之后创建develop分支

- 在develop分支上创建feature分支进行新特性开发，feature分支可能还有子分支

- 完成新特性开发后再将feature分支合并回develop分支

- 在准备发布时，在develop分支上创建release分支

- 在release分支上进行测试，完成之后合并回master和develop分支

- 线上发现紧急错误，在master分支上创建hotfix分支，修改完之后合并回master和develop分支

# 提交时发生冲突，如何发生的冲突？怎么解决？

修改同一个公共文件，别人提交了我再提交就可能会报冲突

手动在文件中解决，接受本次修改/接受传入修改/手动合并

然后继续上传

# 什么是 git？为什么要使用 git？

git 是一个版本控制系统
为了记录所有的文件内容变化，以便之后查特定版本的修改情况，不用担心文件丢失

# git 和 svn 的区别

git 是分布式，svn 是集中式

分布式：每个开发者都拥有完整的代码仓库的副本

集中式：开发者依赖中间仓库来操作

# git 的分支命令

查看分支：git branch
创建分支：git branch 分支名
切换分支：git checkout 分支名
创建并切换： git checkout -b 分支名
合并分支：git merge 合并分支名

# git pull 和 git fetch 的区别

git fetch 只是从远程仓库拉取最新的更新，但不会自动合并更新到当前分支
git pull 会从远程仓库获取到最新的版本并 merge 到本地

git pull = git fetch + git merge

# git merge 分支名

将该分支合并到当前分支

# 暂存

git stash 用来临时保存没提交的更改，比如临时需要切换分支来进行其他操作，当前的更改就不会丢失

修改完之后再切换回当前分支，然后git stash list可以查看存储堆栈中所有的保存

如果只有一个保存，git stash pop将其取出并删除

如果有多个保存，git stash apply

# git撤销

- 未commit
  
  - 未add
    
    `git restore <file>`撤销工作区中的修改
  
  - 已add
    
    `git restore --staged <file>`将文件从暂存区拉回来

- 已commit(默认回到上一个提交HEAD^，这里省略HEAD^，上上个就要加HEAD^^)
  
  - 撤回最后一次提交，回退到暂存区
    
    `git reset --soft`
  
  - 直接丢弃上一次提交，不留下提交记录
    
    `git reset --hard`
  
  - 直接丢弃上一次提交，留下提交记录
    
    `git revert`
  
  - 修改commit message
    
    `git commit --amend -m 'new msg'`
