import React from 'react';
import { connect } from 'react-redux';
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
