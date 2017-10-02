// @flow
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { createAnnouncement } from 'app/actions/AnnouncementsActions';

type Props = {
  event?: number,
  meeting?: number,
  group?: number,
  createAnnouncement: (...any) => void
};

class AnnouncementInline extends Component {
  props: Props;

  send = events => {
    this.props.createAnnouncement({
      events,
      message: 'Hello world',
      send: true
    });
  };

  render() {
    const events = [this.props.event];

    return (
      <div>
        <p>hallo</p>
        <button
          onClick={() => {
            this.send(events);
          }}
        >
          SEND
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createAnnouncement
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementInline);
