let config = {};
config.devTag = ["localhost", "192.168", "fill", "trade.bstchain"];
config.is = "test1";
config.devHttp =
  config.is === "test" ? "http://trade.bstchain.com" : "http://dingyi888.com";
config.proHttp = window.location.origin;
config.isDev =
  config.devTag.findIndex(e => {
    return window.location.origin.indexOf(e) > -1;
  }) > -1;
config.http = config.isDev ? config.devHttp : config.proHttp;

export default config;
