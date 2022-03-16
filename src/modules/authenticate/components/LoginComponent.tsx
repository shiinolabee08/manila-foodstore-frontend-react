import { Alert, Button, Form, Input } from 'element-react';
import * as React from 'react';

export interface LoginState {
  form: {
    username: string;
    password: string;
  },
  formRef: any;
  formSubmitting: boolean;
  rules: {
    username: [
      { required: boolean, message: string, trigger: string },
    ],
    password: [
      { required: boolean, message: string, trigger: string },
    ]
  }
}

export default class LoginComponent extends React.Component <any, LoginState> {

  constructor(props: any) {
    super(props);

    this.state = {
      form: {
        username: '',
        password: '',
      },
      formRef: React.createRef(),
      formSubmitting: false,
      rules: {
        username: [
          { required: true, message: 'You must enter your username.', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'You must enter your password.', trigger: 'blur' },
        ]
      }
    };
  }

  onChange(key: string, value: string) {
    this.setState({ form: Object.assign({}, this.state.form, { [key]: value })});
  }

  handleSubmit(e: any) {
    e.preventDefault();

    this.state.formRef.current.validate((valid: boolean) => {
      if(valid) {
        this.setState({ formSubmitting : true });
        this.props.submitForm(this.state.form);
        this.setState({ formSubmitting : false });
      }
    })

  }

  handleReset(e: any) {
    e.preventDefault();

    this.setState({ form: Object.assign({}, this.state.form, {
      username: '',
      password: '',
    })});
    this.state.formRef.current.resetFields();
  }

  render() {
    return (
      <div>
        <Form ref={this.state.formRef} className="en-US"  model={this.state.form} rules={this.state.rules} labelWidth="120">
          <Form.Item label="Username" prop="username">
            <Input value={this.state.form.username} onChange={this.onChange.bind(this, 'username')}></Input>
          </Form.Item>
          <Form.Item label="Password" prop="password">
          <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')}></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={this.state.formSubmitting} disabled={this.props.noOfAttempts >= 5} onClick={this.handleSubmit.bind(this)}>Log-in</Button>
            <Button onClick={this.handleReset.bind(this)} disabled={this.state.formSubmitting || this.props.noOfAttempts >= 5}>Reset</Button>
          </Form.Item>
        </Form>
        { !this.props.successLogin && this.props.isFormSubmitted && <><Alert title="Error logging in." type="error" showIcon={true} /><br /></>}
        { this.props.noOfAttempts >= 5 && <Alert title="You succeeded the maximum login attempts." type="error" showIcon={true} closable={false}/> }
      </div>
    );
  }
}