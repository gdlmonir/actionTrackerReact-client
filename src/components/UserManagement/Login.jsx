import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonPage,
  IonRow,
  IonCol,
  IonText,
  IonImg,
} from "@ionic/react";
import "../../theme/custom.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(LoginRequest);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <IonPage className="login">
        <IonGrid>
          <IonRow>
            <IonCol className="side-banner" size-md="6" size-sm="12"></IonCol>
            <IonCol size-md="6" size-sm="12" className="test">
              <div className="auto-tr">
                <IonText color="primary">
                  <h4>Welcome back!</h4>
                </IonText>
                <form onSubmit={this.onSubmit}>
                  <IonItem className="form-group">
                    <IonInput
                      type="text"
                      className={classnames("", {
                        "is-invalid": errors.username,
                      })}
                      placeholder="Email Address"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}
                    />
                    {errors.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </IonItem>
                  <IonItem className="form-group">
                    <IonInput
                      type="password"
                      className={classnames("", {
                        "is-invalid": errors.password,
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </IonItem>
                  <IonButton type="submit">Submit</IonButton>
                </form>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonPage>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);
