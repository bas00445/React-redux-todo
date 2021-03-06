import React, { Component } from 'react';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { checkoutNote, deleteNote } from '../../actions';

// Material Components
import { Card } from 'material-ui/Card';

// Components
import NoteItem from '../../components/note-item/note-item';

class NoteList extends Component {

  componentWillReceiveProps(nextProps) {
    console.log('Note-list: ', nextProps);
  }

  renderNotes() {
    if (this.props.filter == 'all') {
      return this.props.notes.map((note) => {
        return (
          <NoteItem note={note} key={note.id}
            onCheckout={() => { this.props.checkoutNote(note.id) }}
            onDelete={() => { this.props.deleteNote(note) }} />
        );
      })
    } else if (this.props.filter == 'completed') {
      return this.props.notes.map((note) => {
        if (note.complete == true) {
          return (
            <NoteItem note={note} key={note.id}
              onCheckout={() => { this.props.checkoutNote(note.id) }}
              onDelete={() => { this.props.deleteNote(note) }} />
          );
        }
      })
    } else if (this.props.filter == 'inCompleted') {
      return this.props.notes.map((note) => {
        if (note.complete == false) {
          return (
            <NoteItem note={note} key={note.id}
              onCheckout={() => { this.props.checkoutNote(note.id) }}
              onDelete={() => { this.props.deleteNote(note) }} />
          );
        }
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.renderNotes()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notes: state.notes,
    filter: state.filter,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkoutNote: checkoutNote,
    deleteNote: deleteNote,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);