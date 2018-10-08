import React, { Component } from 'react';
import * as actions from '../actions';
import './../App.css';
import { connect } from 'react-redux';
import DEFAULT_MOVIE from '../constants/defaultMovie';
import 'bootstrap/dist/css/bootstrap.css';
import HeaderComponent from './HeaderComponent';
import MovieDashboardComponent from './MovieDashboardComponent';
import ReactFileReader from 'react-file-reader';

class App extends Component {
  constructor(params) {
    super(params);
    this.state = {
      byNameInput: '',
      byActorInput: '',
      byIdInput: -1,
    };

    this.initHandler = this.initHandler.bind(this);
    this.getAllHandler = this.getAllHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.deleteInputHandler = this.deleteInputHandler.bind(this);
    this.byNameInputHandler = this.byNameInputHandler.bind(this);
    this.byActorInputHandler = this.byActorInputHandler.bind(this);
    this.byNameHandler = this.byNameHandler.bind(this);
    this.byActorHandler = this.byActorHandler.bind(this);
    this.sortDownHandler = this.sortDownHandler.bind(this);
    this.sortUpHandler = this.sortUpHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  componentDidMount() {
    this.props.getAll();
  }

  sortUpHandler() {
    this.props.sortUp();
    this.props.sortUp();
    this.props.sortUp();
  }

  sortDownHandler() {
    this.props.sortDown();
  }

  deleteInputHandler(event) {
    this.setState({ deleteInput: event.target.value });
  }

  byNameInputHandler(event) {
    this.setState({ byNameInput: event.target.value });
  }

  byActorInputHandler(event) {
    this.setState({ byActorInput: event.target.value });
  }

  initHandler() {
    this.props.init();
  }

  getAllHandler() {
    this.props.getAll();
  }

  addHandler() {
    this.props.addNew(DEFAULT_MOVIE());
  }

  deleteHandler(item) {
    if (item) {
      this.props.movieDelete(item);
    }
  }

  byNameHandler() {
    this.props.searchByName(this.state.byNameInput);
  }

  byActorHandler() {
    this.props.searchByActor(this.state.byActorInput);
  }

  uploadHandler(item) {
    this.props.uploadHandler(item);
  }

  handleFiles = files => {
    // FileReader.readAsText
    console.log(files[0]);
    const reader = new FileReader();
    reader.onload = function(theFile) {
      let data = theFile.srcElement.result;
      let temp = data.split('\n');
      console.log(temp);
    };
    reader.readAsText(files[0]);
  };

  render() {
    return (
      <div className="container">
        {console.log('on render >>>>', this.props.movies)}

        {/*HEADER*/}
        <div className="row justify-content-center">
          <HeaderComponent />
        </div>

        {/*INPUTS AND BUTTONS*/}
        <div className="row justify-content-center">
          {/*SEARCH BY ACTOR*/}
          <div
            className="input-group input-group-lg col-lg-4"
            style={{ marginBottom: '30px' }}
          >
            <input
              type={'text'}
              value={this.state.byActorInput}
              onChange={this.byActorInputHandler}
              className="form-control"
              placeholder="ACTOR..."
            />
            <button onClick={this.byActorHandler} className="btn btn-dark">
              SEARCH
            </button>
          </div>

          {/*SEARCH BY TITLE*/}
          <div
            className="input-group input-group-lg col-lg-4"
            style={{ marginBottom: '30px' }}
          >
            <input
              type="text"
              value={this.state.byNameInput}
              onChange={this.byNameInputHandler}
              className="form-control"
              placeholder="TITLE..."
            />
            <button onClick={this.byNameHandler} className="btn btn-dark">
              SEARCH
            </button>
          </div>

          {/*BUTTONS GROUP*/}
          <div
            className="btn-group col-lg-4 justify-content-center"
            style={{ marginBottom: '30px' }}
          >
            <button onClick={this.getAllHandler} className="btn btn-dark">
              GET ALL
            </button>
            <button onClick={this.sortUpHandler} className="btn btn-dark">
              SORT
            </button>
            <button className="btn btn-dark">IMPORT</button>
            <button onClick={this.addHandler} className="btn btn-dark">
              ADD
            </button>
          </div>
        </div>

        <ReactFileReader
          fileTypes={['.txt', '.json']}
          handleFiles={this.handleFiles}
          multipleFiles={false}
        >
          <button onClick={this.uploadHandler} className="btn">
            Upload
          </button>
        </ReactFileReader>

        {/*<span>Errors:</span>*/}
        {/*<div> {this.props.errors && this.props.errors.map(err => <p key={Math.round(Math.random()*20000)}>{err.message}</p>)}</div>*/}

        {/*FILM CARDS*/}
        <div className="row justify-content-center">
          {this.props.movies && (
            <MovieDashboardComponent
              movieData={this.props.movies}
              deleteHandler={this.deleteHandler}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.getAll,
    errors: state.errors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => dispatch(actions.init()),

    getAll: () => dispatch(actions.movieGetAll()),
    addNew: body => dispatch(actions.movieAddNew(body)),
    movieDelete: id => dispatch(actions.movieDelete(id)),

    searchByName: name => dispatch(actions.searchByName(name)),
    searchByActor: name => dispatch(actions.searchByActor(name)),

    sortDown: () => dispatch(actions.sortDown()),
    sortUp: () => dispatch(actions.sortUp()),

    uploadHandler: () => dispatch(actions.upload()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
