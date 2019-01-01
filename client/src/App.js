import React, { Component } from "react";
import AccountKit from "react-facebook-account-kit";
import axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.storeUser = this.storeUser.bind(this);
  }

  async storeUser(resp) {
    let data = { code: resp.code };
    await axios.post("http://localhost:4000", data);
  }

  render() {
    return (
      <div>
        <AccountKit
          appId="<app_Id>" // Update this!
          version="<app_version>" // Version must be in form v{major}.{minor}
          onResponse={resp => {
            this.storeUser(resp);
          }}
          csrf={"csrf"} // Required for security
          countryCode={"+91"} // eg. +60
          phoneNumber={""} // eg. 12345678
          display={"fullcreen"}
          emailAddress={"default email address"} // eg. me@site.com
        >
          {p => <button {...p}>Initialize Account Kit</button>}
        </AccountKit>
      </div>
    );
  }
}

export default App;
