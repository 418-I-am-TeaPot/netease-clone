## 如何协作开发

### 初始化

1. 将该项目 Fork 到自己的代码仓库
2. 将你仓库中的代码 Clone 到本地

**Source Control**

如果使用 VS Code，可以使用 Source Control 中的「Clone Repository」，然后输入你代码仓库的 URL 即可，比较方便

**命令行**

或者直接使用命令行把代码拉下来。你需要把这段脚本中的用户名和仓库名替换成自己的：

```bash
git clone https://github.com/your-username/the-repo-name.git
cd the-repo-name
code .
```

## 运行项目

在成功克隆代码之后，可以开始尝试在你本地的环境运行项目。

### 编译项目

首先，在 terminal 中运行该指令：

```bash
npm run dev:weapp
```

> 可能出现的报错：如果文件夹权限是只读，可能会出现报错；要给文件夹赋予可执行权限。

如果编译成功，项目文件夹下会生成一个 dist 文件夹。

### 启动模拟器

在微信开发者工具中，选择【导入】项目，打开项目的 dist 文件夹。

如果能正常打开的话，就能够在编写代码的时候实时预览界面；同时能在 Console 中进行调试。
