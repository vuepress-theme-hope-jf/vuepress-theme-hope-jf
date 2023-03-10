import { type UserConfig, defineUserConfig } from "@vuepress/cli";
import { type HeadConfig } from "@vuepress/core";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import { getDirname, path } from "@vuepress/utils";
import { removePWAPlugin } from "vuepress-plugin-remove-pwa";
import { addViteOptimizeDepsInclude } from "vuepress-shared/node";

const __dirname = getDirname(import.meta.url);

const IS_GITEE = "GITEE" in process.env;
const IS_NETLIFY = "NETLIFY" in process.env;
const IS_GITHUB = !IS_GITEE && !IS_NETLIFY;

export interface ConfigOptions {
  name: string;
  base?: string;
  indexName?: string | false;
  pwa?: boolean;
}

export const config = (
  {
    name,
    base = name.replace(/\d+$/, ""),
    indexName,
    pwa = false,
  }: ConfigOptions,
  { alias = {}, head = [], plugins = [], ...config }: UserConfig
): UserConfig => {
  const docsBase = IS_NETLIFY
    ? "/"
    : base
    ? <`/${string}/`>`/v2/${base}/`
    : "/v2/";
  const docsearchIndexName =
    indexName === false ? false : `vuepress-theme-hope-${indexName || name}`;

  return defineUserConfig({
    base: docsBase,

    dest: "./dist",

    head: [
      ...(pwa === false
        ? <HeadConfig[]>[
            [
              "link",
              {
                rel: "icon",
                href: `${docsBase}assets/icon/chrome-mask-512.png`,
                type: "image/png",
                sizes: "512x512",
              },
            ],
            [
              "link",
              {
                rel: "icon",
                href: `${docsBase}assets/icon/chrome-mask-192.png`,
                type: "image/png",
                sizes: "512x512",
              },
            ],
            [
              "link",
              {
                rel: "icon",
                href: `${docsBase}assets/icon/chrome-512.png`,
                type: "image/png",
                sizes: "192x192",
              },
            ],
            [
              "link",
              {
                rel: "icon",
                href: `${docsBase}assets/icon/chrome-192.png`,
                type: "image/png",
                sizes: "192x192",
              },
            ],
            ["meta", { name: "theme-color", content: "#46bd87" }],
            [
              "link",
              {
                rel: "apple-touch-icon",
                href: `${docsBase}assets/icon/apple-icon-152.png`,
              },
            ],
            [
              "meta",
              {
                name: "apple-mobile-web-app-status-bar-style",
                content: "black",
              },
            ],
          ]
        : []),
      ...head,
    ],
    markdown: {
      code: {
        lineNumbers: 10,
      },
    },

    plugins: [
      ...(docsearchIndexName
        ? [
            docsearchPlugin({
              appId: "VXIEHELDL1",
              apiKey: "595796f71b6ba14326719682c3738c0c",
              indexName: docsearchIndexName,
              indexBase: "/v2/",
              locales: {
                "/zh/": {
                  placeholder: "????????????",
                  translations: {
                    button: {
                      buttonText: "????????????",
                      buttonAriaLabel: "????????????",
                    },
                    modal: {
                      searchBox: {
                        resetButtonTitle: "??????????????????",
                        resetButtonAriaLabel: "??????????????????",
                        cancelButtonText: "??????",
                        cancelButtonAriaLabel: "??????",
                      },
                      startScreen: {
                        recentSearchesTitle: "????????????",
                        noRecentSearchesText: "??????????????????",
                        saveRecentSearchButtonTitle: "?????????????????????",
                        removeRecentSearchButtonTitle: "????????????????????????",
                        favoriteSearchesTitle: "??????",
                        removeFavoriteSearchButtonTitle: "??????????????????",
                      },
                      errorScreen: {
                        titleText: "??????????????????",
                        helpText: "???????????????????????????????????????",
                      },
                      footer: {
                        selectText: "??????",
                        navigateText: "??????",
                        closeText: "??????",
                        searchByText: "???????????????",
                      },
                      noResultsScreen: {
                        noResultsText: "????????????????????????",
                        suggestedQueryText: "?????????????????????",
                        reportMissingResultsText: "????????????????????????????????????",
                        reportMissingResultsLinkText: "????????????",
                      },
                    },
                  },
                },
              },
            }),
          ]
        : []),
      ...(pwa === false ? [removePWAPlugin()] : []),
      shikiPlugin({ theme: "one-dark-pro" }),

      ...plugins,
    ],

    alias: {
      "@NetlifyBadge": path.resolve(__dirname, "./components/NetlifyBadge.js"),
      "@theme-hope/components/HeroInfo": path.resolve(
        __dirname,
        "./components/HopeHero.js"
      ),
      "@theme-hope/components/NotFoundHint": path.resolve(
        __dirname,
        "./components/HopeNotFoundHint.js"
      ),
      ...alias,
    },

    define: () => ({ IS_GITEE, IS_GITHUB, IS_NETLIFY }),

    extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
      addViteOptimizeDepsInclude(bundlerOptions, app, [
        "three",
        "three/examples/jsm/controls/OrbitControls",
        "three/examples/jsm/loaders/STLLoader",
      ]);
    },

    ...(pwa ? { shouldPrefetch: false } : {}),

    clientConfigFile: path.resolve(__dirname, "./client.js"),

    ...config,
  });
};
