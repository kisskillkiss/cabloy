// eslint-disable-next-line
module.exports = appInfo => {
  const config = {};

  // site
  config.site = {
    base: {
      title: 'Community',
      subTitle: 'Everything About CabloyJS',
      description: '',
      keywords: '',
    },
    host: {
      url: 'http://community.example.com',
      rootPath: '',
    },
    language: {
      default: 'en-us',
      items: 'en-us',
    },
    themes: {
      'en-us': 'cms-themecommunity',
    },
    edit: {
      mode: 1, // markdown
    },
    env: {
      format: {
        date: 'YYYY-MM-DD',
        time: 'HH:mm:ss',
      },
      article2: {
        recentNum: 5,
      },
      comment: {
        order: 'asc',
        recentNum: 5,
      },
      brother: {
        order: 'desc',
      },
      loadMore: {
        loadOnScroll: false,
      },
    },
    profile: {

    },
  };

  return config;
};
