class TokenWatcher {
  constructor() {
    this._p = undefined;
    this._trigger = undefined;
    this.init();
  }

  init() {
    this._p = new Promise(resolve => {
      console.log('初始化完成了');
      this._trigger = resolve;
    });
  }

  done() {
    this._trigger(Math.random() * 1000);
    console.log('完成了');
    this.init();
  }

  getPromise() {
    return this._p;
  }
}

const watcher = new TokenWatcher();

async function trigger() {
  invoke();
  console.log('异步通知发送完成，等待回调');
  const r = await watcher.getPromise();
  return r;
}

function invoke() {
  console.log('触发异步获取token');
  return new Promise(resolve => {
    setTimeout(() => {
      watcher.done();
      resolve();
    }, 1500);
  });
}

trigger().then(data => console.log(data));