---
title: Контент проекта
icon: file
order: 4
category:
  - Учебник с примерами
  - Руководство
  - Начало работы
tag:
  - Контент проекта
---

В этом руководстве вы узнаете, как писать контент в проекте VuePress.

<!-- more -->

## Создание страниц

VuePress ориентирован на уценку. Каждый файл Markdown внутри вашего проекта представляет собой отдельную страницу.

По умолчанию путь маршрута страницы определяется относительным путем вашего файла Markdown.

В предыдущей главе каталог `docs` использовался как папка проекта VuePress. Итак, если у вас есть следующая структура пути:

Предполагая, что это структура каталогов ваших файлов Markdown:

```
└─ docs
   ├─ guide
   │  ├─ ...
   │  └─ page.md
   │  └─ markdown.md
   │  └─ README.md
   ├─ ...
   ├─ slide.md
   └─ README.md
```

Путь маршрута ваших файлов Markdown:

| Относительный путь | Путь маршрута       |
| ------------------ | ------------------- |
| `/README.md`       | `/`                 |
| `/slide.md`        | `/slide.html`       |
| `/guide/README.md` | `/guide/`           |
| `/guide/slide.md`  | `/guide/slide.html` |
| `/guide/page.md`   | `/guide/page.html`  |

::: tip README.md

`README.md` — это особый случай. В Markdown по соглашению он будет использоваться как домашняя страница папки, в которой он находится. Поэтому, когда он отображается как веб-страница, его соответствующий путь является путем домашней страницы `index.html` на веб-странице.

Это должно быть легко понять.

:::

## Frontmatter

Frontmatter — очень важная концепция в VuePress, она используется для переноса конфигурации файлов Markdown. Файлы Markdown могут содержать Frontmatter [YAML](https://yaml.org/).

Frontmatter должен быть в верхней части файла Markdown, окруженный парой тройных дефисов. Вот простой пример:

```md
---
lang: en-US
title: the title of the page
description: the description of the page
---

<!-- Here is Markdown Content -->

...
```

Вы, должно быть, заметили, что поля в Frontmatter очень похожи на файлы конфигурации VuePress. Вы можете переопределить `lang`, `title`, `description` и другие свойства текущей страницы через Frontmatter. Таким образом, вы можете думать о Frontmatter как о конфигурации области на уровне страницы, которая обычно имеет наивысший приоритет, и конфигурация действует только на текущей странице.

## Markdown

Каждый файл Markdown будет обрабатываться VuePress Theme Hope для отображения содержимого файла как веб-контента.

::: tip Синтаксис Markdown

Если вы еще не знакомы с Markdown, ознакомьтесь с [Учебником по Markdown](../markdown/README.md).

Примерно через пятнадцать минут вы сможете научиться писать на Markdown, не забудьте вернуться после прочтения!

:::

Вы можете попробовать отредактировать файл Markdown самостоятельно, чтобы изменить содержимое шаблона. Если вы запустили сервер разработки, измененные результаты будут синхронизированы с сервером разработки в режиме реального времени.

::: info Расширение Markdown

- Сам VuePress расширяет некоторый синтаксис Markdown. Подробнее смотрите [VuePress → Markdown](../vuepress/markdown.md).

- Тема дополнительно включает некоторые расширения синтаксиса через `vuepress-plugin-md-enhance`, смотрите [Руководство → Markdown](../../guide/get-started/markdown.md).

:::
