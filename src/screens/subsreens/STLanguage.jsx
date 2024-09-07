import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native'
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import styled from 'styled-components/native';

import { BaseView } from '@components';
import { LANG_MASKS } from '@constants';
import { LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from "actions"

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);


const STLanguage = ({ route, navigation }) => {
    const d = useDispatch();
    const { lang } = useSelector(({ app }) => ({ lang: app.lang }));
    const [state, setState] = React.useState({
        lang,
        ...route.params.state
    });

    const onChangeInput = (name, value) => {
        // if (name && value !== undefined) {
        //     setState({ ...state, [name]: value })
        // }
        d(appActions.setLang(value))
    }

    const handleGoBack = () => {
        // Pass data back to ScreenA using the onGoBack callback
        // route.params.onGoBack({ data: { ...state } });
        navigation.goBack();
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            if (route.params?.onGoBack) {
                route.params.onGoBack({ data: { ...state } });
            }
            navigation.dispatch(e.data.action);
        });

        return unsubscribe;
    }, [navigation, route.params, state]);

    React.useEffect(() => {
        setState({ ...state, ...route.params.state });
    }, [route.params])

    return (

        <BaseView>
            <HeaderRNE
                containerStyle={styles.header}
                style={{ height: 60 }}
                leftComponent={
                    <TouchableOpacity onPress={handleGoBack}>
                        <View style={styles.headerButton}>
                            <Title style={{ fontWeight: 400 }}>Back</Title>
                        </View>
                    </TouchableOpacity>
                }

                centerComponent={<Text style={styles.headerTitle}>Language</Text>}
                backgroundColor={"white"}
            />

            <View style={{ paddingTop: 14, flex: 1 }}>
                <SelectList
                    style={{ flex: 1 }}
                    currentValue={lang}
                    setValue={(v) => onChangeInput('lang', v)}
                    data={Object.keys(LANG_MASKS).map(e => ({ name: LANG_MASKS[e], value: e }))}
                    title="Interface language"
                />
            </View>

        </BaseView>
    )
}


const SelectList = ({ data, title, currentValue, setValue, color }) => {

    const ListItem = ({ value, name, onPress, color }) => {
        return (
            <Pressable onPress={onPress}>
                <View style={select.item}>
                    <Text style={select.text}>{name}</Text>
                    <Text style={select.checkmark}>{currentValue === value ?

                        <Icon style={{ pointerEvents: "none" }} type="antdesign" size={24} name="check" color={color ? color : "#5fb1e7"} />
                        : ""}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <>
            <Label style={{ marginBottom: 7 }}>{title}</Label>

            <FlatList
                contentContainerStyle={styles.listContent}
                data={data}
                renderItem={({ item }) => <ListItem {...{ ...item, color, onPress: () => setValue(item.value) }} />
                }
            />
        </>
    )
}

const select = StyleSheet.create({
    listContent: {

    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        border: "1px solid transparent",
        borderBottomColor: "#e6eaf0",
        minHeight: 48,
    },
    text: {
        lineHeight: 48,
        paddingLeft: 18,
        paddingRight: 10
    },
    checkmark: {
        marginRight: 10
    }
})


// header 
const styles = StyleSheet.create({
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: 'center'
    },
    combinedInput: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
        marginBottom: 14,
        backgroundColor: "white",
        border: "1px solid #e5e5eaff"
    },
    header: {
        padding: 0,
        minHeight: 55,
        paddingVertical: 0,
        paddingHorizontal: 0
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        height: 55,
        minWidth: 55,
        pointerEvents: "none",
        userSelect: "none",
        paddingLeft: 18,
        paddingRight: 18,
    },
    headerTitle: {
        minHeight: 55,
        lineHeight: 55,
        color: "black",
        fontSize: 17,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        userSelect: "none",
    },
    activeBtn: {
        fontSize: 17,
    }
});

const Title = styled.Text`
        min-height: 36px;
        line-height:36px;
        color: black;
        font-size: 17px;
        font-weight: 600;
        align-items: center;
        justify-content: center;
`
const Label = styled.Text`
  font-size: 12px;
  color: #6a767d;
  text-transform: uppercase;
  margin-left: 15px;
`



export default STLanguage