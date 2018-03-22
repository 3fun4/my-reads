# MyReads 项目

这是 Udacity 的 React 基础课程最终评估项目的初始模板。 此模板的目标是通过提供可能使用的 CSS 和 HTML 标记的静态示例来节省你的时间，但没有任何完成项目所需的 React 代码。 如果你选择从此模板开始，你的工作将是通过重构此模板中的静态代码为应用程序添加交互。

当然，如果你愿意，你可以从头开始这个项目！ 只需确保使用[Create React App](https://github.com/facebookincubator/create-react-app)来引导项目。

## TL;DR

立即开始:

- 使用 `npm install` 安装所有项目依赖项
- 使用 `npm start` 启动开发服务器

## 你会看到

```bash
├── README.md - 该文件。
├── SEARCH_TERMS.md # 可用于搜索字词的白名单简短集合，可以和你的应用程序一起使用。
├── package.json # 你不太可能需要修改 npm 包管理器文件。
├── public
│   ├── favicon.ico # 如果你愿意，可以随意修改 React 图标。
│   └── index.html # 不用修改
└── src
    ├── App.css # 请随意为你的 APP 定制个性化风格.
    ├── App.js # 这是你的应用程序的根。现在包含静态HTML。
    ├── App.test.js # 用于测试。提供 Create React 应用程序。鼓励测试，但不是强制要求。

    ├── BooksAPI.js # 提供的Udacity后端的JavaScript API。 方法说明如下。
    ├── icons # 你的应用程序的有用图片. 请酌情使用.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # 通用风格。你可能不需要作出任何更改。
    └── index.js # 你不需要修改此文件。 它仅用于DOM渲染。
```

请记住，良好的 React 设计实践是为每个组件创建新的 JS 文件，并使用 import / require 语句将它们包含在需要的位置。

## 后台服务器

为了简化开发过程，我们提供了一个后台服务器供你开发。 提供的文件[`BooksAPI.js`](src/BooksAPI.js) 包含你需要在后端执行必要操作的方法：

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

方法签名:

```js
getAll()
```

- 返回一个 Promise，它解析成一个包含 book 对象集合的 JSON 对象。
- 此集合代表了你的应用程序中书架中的图书。

### `更新`

方法签名:

```js
update(book, shelf)
```

- 书: `<Object>` 包含至少一个 `id` 属性
- 书架: `<String>` 包含 ["wantToRead", "currentlyReading", "read"] 其中之一
- 返回一个Promise，它解析为包含POST请求的响应数据的JSON对象

### `搜索`

方法签名:

```js
search(query, maxResults)
```

- query: `<String>`
- maxResults: `<Integer>` 由于后端服务器的性质，即使设置了较高数值，搜索结果的上限也为20。
- 返回一个Promise，它解析成一个包含book对象集合的JSON对象。
- 这些书不知道他们的书架。 它们只是原始结果。 在搜索页面上，你需要确保书籍具备正确的状态。

## 重要提示

后端 API 使用一组固定的缓存搜索结果，仅限于一组特定的搜索字词，可以在[SEARCH_TERMS.md](SEARCH_TERMS.md)中找到。 这个术语列表是与后端一起使用的_only_术语，所以如果你对“Basket Weaving”或“Bubble Wrap”的搜索没有任何结果返回，请不用惊讶。

## 构建 React 应用程序

该项目由 [Create React App](https://github.com/facebookincubator/create-react-app) 引导. 你可以在 [在这里](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)找到有关如何执行常见任务的更多信息。