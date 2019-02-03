import React, { Component } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { getLocation } from "../../actions/dashboardActions";
import { connect } from "react-redux";
import { View, Icon, FlatList, StyleSheet } from "react-native";
import { Form, Input, Button } from "native-base";

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

class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionList: [],
      searchQuery: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange(e) {
    const provider = new OpenStreetMapProvider();
    const searchQuery = e.target.value;
    provider.search({ query: e.target.value }).then(results => {
      if (this.props.setLocation !== undefined) {
        this.props.setLocation(this.props.name, searchQuery);
      }
      this.setState({ suggestionList: results, searchQuery: searchQuery });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const query = { query: this.state.searchQuery };
    this.props.setMapCoordinate(this.state.suggestionList);
    this.props.getLocation(query);
  }

  render() {
    const { suggestionList } = this.state;
    const { name, placeholder } = this.props;
    let locationSuggestion = [];
    if (suggestionList.length > 0) {
      locationSuggestion = suggestionList.map((data, index) => {
        return <option key={"options" + index} value={data.label} />;
      });
    }
    return (
      <View>
        <Form onSubmit={this.handleSubmit}>
          <View>
            <Input
              type="text"
              placeholder={placeholder}
              onChange={this.handleOnChange}
              list={name}
              name={name}
            />
            <FlatList
              data={locationSuggestion}
              renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            />
          </View>
          <View>
            {/* {this.props.showButton ? (
                <Button
                  style={{ width: "100%", marginTop: "-1px" }}
                  className="btn btn-primary"
                  onPress={this.handleSubmit}
                >
                  <Icon className="fa fa-search" aria-hidden="true" />
                </Button>
              ) : null} */}
          </View>
        </Form>
      </View>
    );
  }
}

export default connect(
  null,
  { getLocation }
)(LocationSearchBox);
