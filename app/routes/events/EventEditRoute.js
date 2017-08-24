import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  fetchEvent,
  editEvent,
  deleteEvent,
  setCoverPhoto
} from 'app/actions/EventActions';
import { uploadFile } from 'app/actions/FileActions';
import EventEditor from './components/EventEditor';
import {
  selectEventById,
  selectPoolsWithRegistrationsForEvent,
  selectRegistrationsFromPools,
  selectWaitingRegistrationsForEvent
} from 'app/reducers/events';
import fetchOnUpdate from 'app/utils/fetchOnUpdate';

const mapStateToProps = (state, props) => {
  const eventId = props.params.eventId;
  const event = selectEventById(state, { eventId });
  const actionGrant = state.events.actionGrant;
  const pools = selectPoolsWithRegistrationsForEvent(state, { eventId });

  const registrations = selectRegistrationsFromPools(state, { eventId });
  const waitingRegistrations = selectWaitingRegistrationsForEvent(state, {
    eventId
  });
  const valueSelector = formValueSelector('eventEditor');
  return {
    initialValues: {
      ...event,
      pools: pools.map(pool => ({
        ...pool,
        permissionGroups: (pool.permissionGroups || [])
          .map(group => ({ label: group.name, value: group.id }))
      })),
      company: event.company && {
        label: event.company.name,
        value: event.company.id
      }
    },
    actionGrant,
    event: {
      ...event,
      isPriced: valueSelector(state, 'isPriced'),
      eventType: valueSelector(state, 'eventType')
    },
    eventId,
    pools: valueSelector(state, 'pools'),
    registrations,
    waitingRegistrations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(
      {
        fetchEvent,
        deleteEvent,
        handleSubmitCallback: editEvent,
        uploadFile,
        setCoverPhoto
      },
      dispatch
    )
  };
};

const loadData = ({ eventId }, props) => {
  props.fetchEvent(eventId);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  fetchOnUpdate(['eventId', 'loggedIn'], loadData)
)(EventEditor);
