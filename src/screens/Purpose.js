import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Button, Text, Modal, Provider, Portal } from 'react-native-paper'
import Background from '../components/Background'
import TextInput from '../components/TextInput';
import GlobalContext from '../context/GlobalContext';
import ButtonComponent from '../components/Button';
import { storeData } from '../asyncStorage/storageFunctions';
import { Icon } from 'react-native-elements';
import BackButton from '../components/BackButton';

export default function Purpose({ navigation }) {
    const { purpose, setPurpose } = useContext(GlobalContext);

    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState({ value: '', error: '' });
    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
        setValue({ value: '', error: '' });
        setIndex(null);
    }
    const [indexx, setIndex] = useState(null);
    const containerStyle = { backgroundColor: 'white', paddingTop: 35, paddingBottom: 35, paddingLeft: 20, paddingRight: 20, width: '80%', borderRadius: 10, alignSelf: 'center' };
    const addItem = async () => {
        if (indexx === null) {
            if (value.value.length === 0) {
                setValue({ ...value, error: 'Please enter a value' });
            } else {
                let check = false;
                purpose.map((item) => {
                    if (item.toLowerCase() === value.value.toLowerCase()) {
                        setValue({ ...value, error: 'Value already exists' });
                        check = true;
                    }

                    return;
                });

                console.log(purpose);
                if (check === true) return;
                hideModal();
                setPurpose((prev) => [...prev, value.value]);
                setValue({ value: '', error: '' });
                let temp = {
                    data: purpose,
                }
                await storeData('purpose', JSON.stringify(temp));

            }
        } else {
            if (value.value.length === 0) {
                setValue({ ...value, error: 'Please enter a value' });
            } else {
                let check = false;
                purpose.map((item, index) => {
                    if (item.toLowerCase() === value.value.toLowerCase() && index !== indexx) {
                        setValue({ ...value, error: 'Value already exists' });
                        check = true;
                    }

                    return;
                });

                console.log(purpose);
                if (check === true) return;

                let temp = purpose;
                temp[indexx] = value.value;
                setPurpose(temp);
                setValue({ value: '', error: '' });
                setIndex(null);
                let temp1 = {
                    data: purpose,
                }
                await storeData('purpose', JSON.stringify(temp1));
                hideModal();
            }
        }
    }
    let editItem = async (index) => {
        setIndex(index);
        setValue({ value: purpose[index], error: '' });
        showModal();
    }
    let deleteItem = async (index) => {
        let tempArr = [...purpose];
        let temp = {
            data: tempArr.filter((_, i) => i !== index),
        }
        setPurpose((p) => p.filter((_, i) => i !== index));
        await storeData('purpose', JSON.stringify(temp));
    }
    return (
        <Provider>

            <Background>
            <BackButton goBack={navigation.goBack} />
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text>Add New Purpose</Text>
                        <TextInput
                            value={value.value}
                            label="Purpose"
                            returnKeyType="next"
                            error={!!value.error}
                            errorText={value.error}
                            onChangeText={(text) => setValue({ value: text, error: '' })}
                        />
                        <View style={styles.purposeAddView}>

                            <ButtonComponent style={styles.buttonComponentR} mode="contained" onPress={hideModal} >
                                Cancel
                            </ButtonComponent>
                            <ButtonComponent style={styles.buttonComponent} mode="contained" onPress={() => addItem()} >
                                Add
                            </ButtonComponent>
                        </View>
                    </Modal>
                </Portal>
                <View style={styles.container}>
                    <View style={styles.purposeHead}>
                        <Text style={styles.purposeHeadText}>Purposes</Text>
                        <Button onPress={showModal} icon="plus" mode="contained-tonal" >Add</Button>
                    </View>
                    <View style={styles.purposeBody}>
                        {
                            purpose.map((purpose, index) => {
                                return (<View key={index} style={styles.purposeRow}>
                                    <Text style={styles.purposeSrNo}>
                                        {index + 1}
                                    </Text>
                                    <Text style={styles.purposeText}> {purpose} </Text>
                                    <View style={styles.purposeActions}>
                                        <Icon name="edit" onPress={() => editItem(index)} iconStyle={styles.purposeActionBtn1} />
                                        <Icon name="delete" onPress={() => deleteItem(index)} iconStyle={styles.purposeActionBtn2} />
                                    </View>
                                </View>)
                            })
                        }
                    </View>
                </View>
            </Background>

        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    purposeHead: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '20%',
        padding: '5%',
    },
    purposeHeadText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    purposeBody: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '80%',
        padding: '5%',
    },
    purposeText: {
        fontSize: 24,
    },
    purposeAddView: {

        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    buttonComponent: {
        width: '40%',

    },
    buttonComponentR: {
        width: '40%',
        backgroundColor: 'red',
    },
    purposeRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    purposeSrNo: {
        width: '10%',
        fontSize: 24,
    },
    purposeText: {
        width: '70%',
        fontSize: 24,
    },
    purposeActions: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        fontSize: 32,
    },
    purposeActionBtn1: {
        fontSize: 24,
        marginLeft: 20,
        color: '#303f9f',
    },
    purposeActionBtn2: {
        fontSize: 24,
        marginLeft: 20,
        color: '#d32f2f',
    },
})

