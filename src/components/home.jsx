import React, { PureComponent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sortBy from "lodash/sortBy";
import ProfileCard from "../atoms/profile-card/profile-card";
import Pagination from "./pagination/pagination";
import Filters from "./filters/filters";
import SortField from "../atoms/sort";
import SelectedFilters from "./selected-filters/selected-filters";
import SearchBar from "../atoms/search-bar";
const API_URL = "https://rickandmortyapi.com/api/character/";
class Home extends PureComponent {
  constructor() {
    super();
    this.state = {
      loading: false,
      pageNo: 1,
      characters: [],
      pageInfo: {},
      sort: "asc",
      count: 0,
      searchText: "",
      filters: {
        species: [],
        gender: [],
        status: [],
      },
    };
  }
  componentDidMount() {
    this.getCharactersInit();
  }

  /**
   * What query to make to end point based on current state
   */
  getApiQuery = () => {
    let appliedFilters = "";
    const searchText = this.state.searchText;
    for (let type in this.state.filters) {
      let filters = this.state.filters[type]
        .filter((item) => item.checked === true)
        .map((val) => val.value);
      appliedFilters += filters.length
        ? "&" + type + "=" + filters.join(",")
        : "";
    }
    if (searchText) appliedFilters += "&name=" + searchText;
    let pageInfo = "?page=" + this.state.pageNo;
    return API_URL + pageInfo + appliedFilters;
  };

  /**
   * Get Characters on page load
   */
  getCharactersInit = () => {
    this.setState({ loading: true });
    try {
      this.resetState(async () => {
        const resp = await axios.get(this.getApiQuery());
        this.setCharactersState(resp);
        this.initFiltersData();
      });
    } catch (err) {
      this.resetState();
    }
  };

  resetState(callback) {
    this.setState(
      {
        characters: [],
        loading: false,
        count: 0,
        searchText: "",
        filters: {
          species: [],
          gender: [],
          status: [],
        },
      },
      () => {
        callback();
      }
    );
  }

  /**
   * Get Characters when filters are applied
   */
  getCharactersOnFilter = async () => {
    this.setState({ loading: true });
    try {
      const resp = await axios.get(this.getApiQuery());
      this.setCharactersState(resp);
    } catch (err) {
      this.setState({ characters: [], loading: false, count: 0 });
    }
  };

  /**
   * Set the state as per response from api
   */
  setCharactersState = (resp) => {
    const respCharacters = resp.data.results;
    const pageInfo = resp.data.info;
    const count = resp.data.info.count;
    this.setState(
      {
        characters: respCharacters,
        pageInfo: pageInfo,
        count: count,
        loading: false,
      },
      () => {
        this.handleSort(this.state.sort);
      }
    );
  };

  /**
   * When pagination is clicked
   */
  handlePageClick = (event, page) => {
    event.preventDefault();
    this.setState(
      {
        pageNo: page,
      },
      () => {
        this.getCharactersOnFilter();
        //this.initFiltersData();
      }
    );
  };

  /**
   * Fetch filters data from characters response
   */
  initFiltersData = () => {
    const speciesFilter = [];
    const genderFilter = [];
    const statusFilter = [];
    this.state.characters.forEach((character) => {
      speciesFilter.indexOf(character.species) < 0 &&
        speciesFilter.push(character.species);
      genderFilter.indexOf(character.gender) < 0 &&
        genderFilter.push(character.gender);
      statusFilter.indexOf(character.status) < 0 &&
        statusFilter.push(character.status);
    });
    this.setState({
      filters: {
        species: this.getCheckboxObject(speciesFilter),
        gender: this.getCheckboxObject(genderFilter),
        status: this.getCheckboxObject(statusFilter),
      },
    });
  };

  /**
   * Set label,value,checked object as a filter
   * @param type the type of filter to set
   */
  getCheckboxObject(type) {
    return type.map((filter) => {
      return {
        label: filter,
        value: filter,
        checked: false,
      };
    });
  }

  /**
   * Fetch Characters again When a filter is selected
   */
  applyFilter = (type, event) => {
    const filterType = type;
    const filterValue = event.target.value;
    if (event.target.checked) {
      this.updateCheckboxState(true, filterType, filterValue);
    } else {
      this.updateCheckboxState(false, filterType, filterValue);
    }
    //set the page back to 1 and apply filter
    this.setState(
      {
        pageNo: 1,
      },
      () => {
        this.getCharactersOnFilter();
      }
    );
  };

  /**
   * Set state.filters true or false based on check unchecked value
   */
  updateCheckboxState = (state, filterType, filterValue) => {
    const updated = this.state.filters[filterType].map((filter) => {
      if (filter.value === filterValue) {
        filter.checked = state;
      } else {
        filter.checked = false;
      }
      return filter;
    });
    const updatedFilterState = Object.assign({}, this.state.filters, {
      [filterType]: updated,
    });
    this.setState({
      filters: updatedFilterState,
    });
  };

  handleSort = (order) => {
    const sortedCharacters = [...this.state.characters];
    let sorted;
    if (order === "desc") {
      sorted = sortBy(sortedCharacters, "id").reverse();
    } else {
      sorted = sortBy(sortedCharacters, "id");
    }
    this.setState({
      characters: sorted,
      sort: order,
    });
  };

  removeFilter = (filterType) => {
    this.updateCheckboxState(false, filterType, "");
    this.setState(
      {
        pageNo: 1,
      },
      () => {
        this.getCharactersOnFilter();
      }
    );
  };

  handleChange = (e) => {
    const word = e.target.value;
    if (!word) this.getCharactersInit();
    this.setState({
      searchText: word,
    });
  };

  handleSearch = async (e) => {
    e.persist();
    e.preventDefault();
    //const word = this.state.searchText;
    this.setState({ loading: true });
    try {
      //const resp = await axios.get(API_URL + "?name=" + word);
      const resp = await axios.get(this.getApiQuery());
      this.setCharactersState(resp);
    } catch (err) {
      this.setState({ characters: [], loading: false, count: 0 });
    }
  };

  render() {
    const {
      loading,
      sort,
      filters,
      characters,
      pageNo,
      pageInfo,
      searchText,
    } = this.state;
    return (
      <>
        <div className="container-fluid">
          <div className={`wrapper${loading ? " loading" : ""}`}>
            <Filters
              filtersData={filters}
              onFilterChecked={this.applyFilter}
            ></Filters>
            <div className="characters">
              <SelectedFilters
                removeFilter={this.removeFilter}
                selectedFilters={filters}
              />
              <div className="search-sort">
                <SearchBar
                  applySearch={this.handleSearch}
                  handleChange={this.handleChange}
                  searchValue={searchText}
                />
                <SortField handleSort={this.handleSort} order={sort} />
              </div>
              <div className="charactersWrap">
                {characters && characters.length ? (
                  characters.map((character) => {
                    return (
                      <Link
                        key={character.id}
                        to={{
                          pathname: `/details/${character.id}`,
                        }}
                      >
                        <ProfileCard details={character} />
                      </Link>
                    );
                  })
                ) : (
                  <h2>Nothing found !!</h2>
                )}
              </div>
            </div>
          </div>
          {this.state.characters.length ? (
            <Pagination
              activePage={pageNo}
              pageDetails={pageInfo}
              pageClick={this.handlePageClick}
            />
          ) : null}
        </div>
      </>
    );
  }
}
export default Home;
