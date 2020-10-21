import React from 'react';
import { connect } from 'react-redux';


const SettingsContainer = (props) => {
    const addMode = {}

    const showSettingForm = () => {
        
    }

    return (
        <div className="size-holder middle">
            <h3 className='centered'>Settings</h3>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateSettings: (update) => {
            // dispatch(fetchInvoicesByDate(update))
        }
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
