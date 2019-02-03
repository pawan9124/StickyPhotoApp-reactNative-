import * as Expo from "expo";
import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import getTheme from "../../native-base-theme/components";
import platform from "../../native-base-theme/variables/platform";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Actions } from "react-native-router-flux";
import { loginUser } from "../../actions/authActions";
import {
  Container,
  Button,
  Text,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  StyleProvider,
  Content,
  Grid,
  Col,
  Row,
  Input,
  Item,
  Form,
  Label,
  Footer,
  FooterTab,
  Spinner
} from "native-base";

const styles = StyleSheet.create({
  topMargin: {
    // marginTop: 25
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  footer: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 60,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});

class Login extends Component {
  constructor() {
    super();
    this.state = { email: "", password: "", errors: {} };

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //redirect the user
      Actions.dashboard();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      Actions.dashboard();
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("HERER");
    const userData = { email: this.state.email, password: this.state.password };
    this.props.loginUser(userData);
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={styles.topMargin}>
          <Header noShadow style={{ backgroundColor: "white" }}>
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 1 }}>
              <Icon
                name="logo-twitter"
                style={{ alignSelf: "center", color: "#4286f4" }}
              />
            </Body>
            <Right style={{ flex: 1 }}>
              <Button transparent>
                <Text style={{ color: "#4286f4" }}>Sign up</Text>
              </Button>
              <Button transparent>
                <Icon name="more" style={{ color: "#4286f4" }} />
              </Button>
            </Right>
          </Header>
          <Content style={styles.content}>
            <Text style={styles.heading}>Login to Twitter</Text>
            <Form>
              <Item stackedLabel last>
                <Label>Phone number, email address, or username</Label>
                <Input
                  name="password"
                  onChangeText={text => this.setState({ email: text })}
                />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input
                  name="password"
                  onChangeText={text => this.setState({ password: text })}
                  secureTextEntry={true}
                />
              </Item>
            </Form>
            <Button
              transparent
              style={{
                margin: 15,
                marginTop: 25,
                width: "50%",
                alignSelf: "center"
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 14, color: "#AAA" }}
              >
                Forgot password?
              </Text>
            </Button>
          </Content>
          <Footer style={styles.footer}>
            {this.props.loginStatus === "ongoing" ? <Spinner /> : null}
            {this.props.loginStatus === "failed" ? (
              <Text style={{ color: "#f92a3f" }}>Login Failed</Text>
            ) : null}
            <Button
              rounded
              style={{ backgroundColor: "#4286f4", marginLeft: 20 }}
              onPress={this.onSubmit}
            >
              <Text>Log in</Text>
            </Button>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const mapStatesToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStatesToProps,
  { loginUser }
)(Login);
