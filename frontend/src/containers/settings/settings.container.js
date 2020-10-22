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
    const [addMode, setAddMode] = useState({});
    const [settingsInfo, setSettings] = useState({...settings})
    const settingDict = {
        defaultEmail: 'Default Email'
    }

    const showSettingForm = (value) => {
        setAddMode({ ...addMode, [value]: true });
    }

    const hideSettingForm = (value) => {
        setAddMode({ ...addMode, [value]: false });
    }

    const handleChange = event => {
        console.log(settingsInfo)
        const { name, value } = event.target;

        setSettings({ ...settingsInfo, [name]: value });
    };

    const submitSettingsForUpdate = () => {
        props.updateSettings(settingsInfo);
        setAddMode({});
    }

    return (
        <div className="size-holder middle">
            <h3 className='centered'>Settings</h3>
            <SettingsItem
                keyVal="defaultEmail"
                setting={{defaultEmail: settings['defaultEmail']}} />
            {settings.defaultEmail ?
                <div className="grid90">
                    {addMode.email ?
                        <div className="inner-border-left">
                            <div className="slight-drop">
                                <FormInput
                                    className="slight-drop"
                                    label='Default Email'
                                    type='text'
                                    name='defaultEmail'
                                    value={settingsInfo.defaultEmail}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        :
                        <div className="inner-border-left">
                            <h5>
                                {settings.defaultEmail}
                            </h5>
                        </div>
                    }
                    {addMode.email ?
                        <div className="grid50 inner-border-right">
                            <img 
                                className="icon" 
                                onClick={submitSettingsForUpdate}
                                src={save}
                                alt="save" />
                            <img 
                                className="icon" 
                                onClick={() => { hideSettingForm("email") }}
                                src={cancel}
                                alt="cancel" />
                        </div>
                        :
                        <div className="grid100 inner-border-right">
                                <img 
                                    className="icon" 
                                    onClick={() => { showSettingForm("email") }}
                                    src={edit}
                                    alt="edit" />
                        </div>
                    }
                </div>
                :
                null
            }
            {settings.defaultPointOfContact ?
                <div className="grid90">
                    {addMode.POC ?
                        <div className="inner-border-left">
                            <div className="slight-drop">
                                <FormInput
                                    className="slight-drop"
                                    label='Default POC'
                                    type='text'
                                    name='defaultPointOfContact'
                                    value={settingsInfo.defaultPointOfContact}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        :
                        <div className="inner-border-left">
                            <h5>
                                {settings.defaultPointOfContact}
                            </h5>
                        </div>
                    }
                    {addMode.POC ?
                        <div className="grid50 inner-border-right">
                            <img 
                                className="icon" 
                                onClick={submitSettingsForUpdate}
                                src={save}
                                alt="save" />
                            <img 
                                className="icon" 
                                onClick={() => { hideSettingForm("POC") }}
                                src={cancel}
                                alt="cancel" />
                        </div>
                        :
                        <div className="grid100 inner-border-right">
                                <img 
                                    className="icon" 
                                    onClick={() => { showSettingForm("POC") }}
                                    src={edit}
                                    alt="edit" />
                        </div>
                    }
                </div>
                :
                null
            }
            {settings.address ?
                <div>
                    {settings.address}
                </div>
                :
                null
            }
            {settings.companyName ?
                <div>
                    {settings.companyName}
                </div>
                :
                null
            }
            {settings.address ?
                <div>
                    {settings.address}
                </div>
                :
                null
            }
            {settings.county ?
                <div>
                    {settings.county}
                </div>
                :
                null
            }
            {settings.state ?
                <div>
                    {settings.state}
                </div>
                :
                null
            }
            {settings.zipCode ?
                <div>
                    {settings.zipCode}
                </div>
                :
                null
            }
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateSettings: (settings) => {
            dispatch(updateSettings(settings))
        }
    }
}

const mapStateToProps = state => ({
    settings: state.user.settings
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
