import React, { useState } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { updateSettings } from '../../reducers/user/user.actions';
import FormInput from '../../shared/elements/form-input/form-input.component';
import save from '../../shared/assets/save.png';
import cancel from '../../shared/assets/cancel.png';
import edit from '../../shared/assets/Edit.png';
import '../invoice/invoice.styles.scss';
import SettingsItem from '../../components/settings/settingsItem';


const SettingsContainer = (props) => {
    const settings = props.settings;
    const settingDict = {
        defaultEmail: 'Default Email',
        defaultPointOfContact: "Default Point Of Contact",
        companyName: "Company Name",
        address: "Address",
        state: "State",
        zipCode: "Zip Code",
        defaultPhone: "Default Phone Number"
    }

    return (
        <div className="middle minimal">
            <h3 className='centered'>Settings</h3>
            {Object.keys(settingDict).map(key => (
                <SettingsItem
                    key={key}
                    keyVal={key}
                    title={settingDict[key]}
                    setting={{[key]: settings[key]}} />   
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    settings: state.user.settings
});

export default connect(mapStateToProps)(SettingsContainer);
