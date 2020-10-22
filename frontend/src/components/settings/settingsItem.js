import React, { useState } from 'react';
import { connect } from 'react-redux';
import CustomButton from '../../shared/elements/button/custom-button.component';
import { updateSettings } from '../../reducers/user/user.actions';
import FormInput from '../../shared/elements/form-input/form-input.component';
import save from '../../shared/assets/save.png';
import cancel from '../../shared/assets/cancel.png';
import edit from '../../shared/assets/Edit.png';
import '../../containers/invoice/invoice.styles.scss';


const SettingsItem = (props) => {
    const setting = props.setting[props.keyVal];
    const [addMode, setAddMode] = useState(false);
    const [settingsInfo, setSettings] = useState({...props.setting})

    const showSettingForm = () => {
        setAddMode(!addMode);
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setSettings({[name]: value });
    };

    const submitSettingsForUpdate = () => {
        props.updateSettings(settingsInfo);
        setAddMode(false);
    }

    return (
        <div>
            {setting ?
                <div className="grid90">
                    {addMode ?
                        <div className="inner-border-left">
                            <div className="slight-drop">
                                <FormInput
                                    className="slight-drop"
                                    label=""
                                    type='text'
                                    name={props.keyVal}
                                    value={settingsInfo[props.keyVal]}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        :
                        <div className="inner-border-left">
                            <h5>
                                {setting}
                            </h5>
                        </div>
                    }
                    {addMode ?
                        <div className="grid50 inner-border-right">
                            <img 
                                className="icon" 
                                onClick={submitSettingsForUpdate}
                                src={save}
                                alt="save" />
                            <img 
                                className="icon" 
                                onClick={showSettingForm}
                                src={cancel}
                                alt="cancel" />
                        </div>
                        :
                        <div className="grid100 inner-border-right">
                                <img 
                                    className="icon" 
                                    onClick={showSettingForm}
                                    src={edit}
                                    alt="edit" />
                        </div>
                    }
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

export default connect(null, mapDispatchToProps)(SettingsItem);