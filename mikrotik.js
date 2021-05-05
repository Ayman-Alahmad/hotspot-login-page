class MikrotikVariables {
  constructor(post) {
    this.mac = post['mac'];
    this.ip = post['ip'];
    this.username = post['username'];
    this.linklogin = post['link-login'];
    this.linkorig = post['link-orig'];
    this.error = post['error'];
    this.trial = post['trial'];
    this.loginby = post['login-by'];
    this.chapid = post['chap-id'];
    this.chapchallenge = post['chap-challenge'];
    this.linkloginonly = post['link-login-only'];
    this.linkorigesc = post['link-orig-esc'];
    this.macesc = post['mac-esc'];
    this.identity = post['identity'];
    this.bytesinnice = post['bytes-in-nice'];
    this.bytesoutnice = post['bytes-out-nice'];
    this.sessiontimeleft = post['session-time-left'];
    this.uptime = post['uptime'];
    this.refreshtimeout = post['refresh-timeout'];
    this.linkstatus = post['link-status'];
    this.server_address = post['server-address'];
    this.server_name = post['server-name'];

  }
}

module.exports = MikrotikVariables
