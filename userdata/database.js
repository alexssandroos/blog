/* DO NOT CHANGE THE GLOBAL VARIABLE NAME */

window.VUELOG_DATABASE = {
  config: {
    // The name of your site, will be displayed in browser tab and site header.
    brand: {
      'en-US': 'BI Cearense',
      'pt-BR': 'BI Cearense'
    },

    // Put the site brand behind current page in `document.title`.
    brandTrailing: false,

    // The image displayed in site header right beside the brand.
    logo: './static/images.png',

    // Path to the domain root that serves your site, starts and ends with slash (`/`).
    // Set to `'/'` if your site is under domain root.
    base: '/',

    // The path to route to when you visit `/`.
    // Set to `/home`, `/blog` or a valid path at your need.
    homePath: '/blog',

    // Whether footer is visible on `homePath` or not.
    homeFooter: false,

    // Vuelog interface language. Currently supports 'en-US', 'zh-CN', 'de-DE', 'pt-BR' and 'es-MX'.
    defaultLang: 'pt-BR',

    // Allow/disallow visitors to switch interface language.
    switchLang: true,

    // Available languages for switching. Must be a subset of supported languages, or leave empty.
    selectedLangs: [],

    // Number of posts listed in a blog/category view.
    postsCount: 3,

    // Fill in the shortname to integrate Disqus with your blog.
    disqusShortname: 'bicearense',

    // Fill in the uid to integrate LiveRe with your blog.
    livereUid: '',

    // Options for marked, see https://github.com/chjj/marked#options-1 for detail
    markedOptions: {}
  },

  navigation: [

    {
      label: {
        'en-US': 'About',
        'pt-BR': 'Sobre'
      },
      type: 'page',
      path: '/page/about'
    },
    {
      label: {
        'en-US': 'Articles',
        'pt-BR': 'Artigos'
      },
      type: 'category',
      path: '/blog/pentaho'
    },
    {
      label: {
        'en-US': 'Archive',
        'pt-BR': 'Arquivo'
      },
      type: 'archive',
      path: '/archive'
    },
    {
      label: {
        'en-US': 'Links',
        'pt-BR': 'Links'
      },
      type: 'dropdown',
      path: '', // (OPTIONAL) dropdown can be routable too if you set a valid route path
      children: [
        {
          label: { 'en-US': 'Who am I ', 'pt-BR': 'Quem sou eu' },
          type: 'outgoing',
          link: 'http://about.me/alexssandroos'
        },
        {
          label: 'GitHub',
          type: 'outgoing',
          link: 'https://github.com/alexssandroos'
        }
      ]
    }
  ],

  pages: [
    {
      title: {
        'en-US': 'About me',
        'pt-BR': 'Quem sou eu'
              },
      slug: 'about'
    }
  ],

  categories: [
    {
      title: {
        'en-US': 'Linux/Unix',
        'pt-BR': 'Linux/Unix'
      },
      slug: 'linux'
    },
    {
      title: {
        'en-US': 'Pentaho',
        'pt-BR': 'Pentaho'
      },
      slug: 'pentaho'
    },
    {
      title: {
        'en-US': 'Trilha Pentaho Init',
        'pt-BR': 'Trilha Pentaho Init'
      },
      slug: 'trilha-pentaho-init'
    }

  ],

  posts: [
    {
      title: {
        'en-US': 'Import/Export others files on BI-SERVER (Like Saiku)',
        'pt-BR': 'Import/Export de arquivos diversos no BI-SERVER (Like Saiku)'
      },
      slug: 'import-export-files-on-biserver',
      category: 'pentaho',
      date: '2018-04-20'
    },
    {
      title: {
        'en-US': 'Install JRE/JDK Oracle on Unix Systems',
        'pt-BR': 'Instalando JRE/JDK em sistemas Unix'
      },
      slug: 'install-jdk-jre-oracle',
      category: 'linux',
      date: '2018-04-12'
    },
    {
      title: {
        'en-US': 'Pentaho Init - Introdução ',
        'pt-BR': 'Pentaho Init - Introdução '
      },
      slug: 'trilha-1-intro',
      category: 'trilha-pentaho-init',
      date: '2018-06-16'
    },
    {
      title: {
        'en-US': 'Migrando repositorio Pentaho para Postgresql ',
        'pt-BR': 'Migrate Pentaho Repository to Postgresql'
      },
      slug: 'migrate-pentaho-repository-to-pg',
      category: 'pentaho',
      date: '2018-06-19'
    },
    {
      title: {
        'en-US': 'Pentaho Init - Preparando o ambiente ',
        'pt-BR': 'Pentaho Init - Preparando o ambiente '
      },
      slug: 'trilha-1-overview-prepare',
      category: 'trilha-pentaho-init',
      date: '2018-06-21'
    },
    {
      title: {
        'en-US': 'Implementando SCD tipo 2 no Pentaho Data Integration ',
        'pt-BR': ' Implementando SCD tipo 2 no Pentaho Data Integration '
      },
      slug: 'scd2-on-pdi',
      category: 'pentaho',
      date: '2018-07-12'
    },
        {
      title: {
        'en-US': 'Guia de sobrevivencia MDX I ',
        'pt-BR': ' Guia de sobrevivencia MDX I '
      },
      slug: 'survival-mdx1',
      category: 'pentaho',
      date: '2018-07-17'
    }

  ]
}
