import * as React from "react";
import { Layout, Card } from 'element-react';
import LoginComponent from "../components/LoginComponent";
import { AuthenticateService } from "../services/authenticate.service";
import { useEffect, useState } from "react";

export interface UserLoginRequest {
  username: string;
  password: string;
}

/* export default class LoginPage extends React.Component <{}, initialState> {
  service: AuthenticateService;

  constructor(props: any) {
    super(props);

    this.state = {
      noOfAttempts: props.noOfAttempts,
      limitNoOfAttempts: props.limitNoOfAttempts,
      loginSubmitObserver: props.loginSubmitObserver
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.service = new AuthenticateService();
  }


  onSubmit(formData: UserLoginRequest) {
    console.log('Submit trigger login attempt.');

    const loginSubmitObserver = (formData: UserLoginRequest) => {
      useEffect(() => {
        this.service.login(formData.username, formData.password);
      }, [formData]);
    }

    loginSubmitObserver(formData);

  }

  render() {

    return (
      <div>
        <Layout.Row type="flex" gutter="20" align="middle" justify="space-around" className="row-bg">
          <Layout.Col span="6">
            <Card className="box-card">
              <LoginComponent submitForm={this.onSubmit}></LoginComponent>
            </Card>
          </Layout.Col>
        </Layout.Row>
      </div>
    )
  }
} */

// Refactor because we need to use React's Hooks like
// useEffect unfortunately useEffect will only work on functional components not class componentStack
function LoginPage() {
  const service = new AuthenticateService();

  const [form] = useState({ username: '', password: '' });
  const [, setLoginResponse] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);
  const [noOfAttempts, setNoOfAttempts] = useState(0);

  async function loginRequest(form: UserLoginRequest) {
    const result = /* await service.login(form.username, form.password) */false;

    if (!isFormSubmitted) {
      setIsFormSubmitted(true);
    }

    setNoOfAttempts(noOfAttempts+1);
    setLoginResponse(result);

    if (result) {
      setSuccessLogin(true);
    } else {
      setSuccessLogin(false);
    }
  }

  useEffect(() => {
    if (form.username.length && form.password.length) {
      loginRequest(form);
    }
  });

  const handleSubmit = (form: UserLoginRequest) => {
    loginRequest(form);
  }

  return (
    <div>
      <Layout.Row type="flex" gutter="20" align="middle" justify="space-around" className="row-bg">
        <Layout.Col span="6">
          <Card className="box-card">
            <LoginComponent submitForm={handleSubmit} successLogin={successLogin} noOfAttempts={noOfAttempts} isFormSubmitted={isFormSubmitted}></LoginComponent>
          </Card>
        </Layout.Col>
      </Layout.Row>
    </div>
  )
}

export default LoginPage;