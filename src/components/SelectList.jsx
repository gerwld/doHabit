import React, { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { Text, View, Pressable, FlatList, StyleSheet } from "react-native"
import { getTheme } from "@constants"
import { Label } from "styles/crudtask"
import { Icon } from "@rneui/themed"

const SelectList = React.memo(({ data, title, currentValue, setValue, color, theme, withoutTranslate }) => {
    const { t } = useTranslation()

    const select = StyleSheet.create({
        item: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: getTheme(theme).bgHighlight,
            
            borderWidth: 1,
            borderColor: `${getTheme(theme).borderColor}`,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            minHeight: 54,
            marginBottom: -1
        },
        text: {
            fontSize: 16,
            paddingLeft: 18,
            paddingRight: 10,
            color: getTheme(theme).textColorHighlight,
        },
        maskText: {
            fontSize: 12,
            opacity: 0.6,
            paddingLeft: 18,
            paddingRight: 10,
            paddingTop: 2,
            color: getTheme(theme).textColorHighlight,
        },
        checkmark: {
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center"
        }
    })

    const keyExtractor = useCallback((item) => {
        return item.value
    })

    const ListItem = ({ value, mask, name, onPress, color }) => {
        console.log();
        
        return (
            <Pressable onPress={onPress}>
                <View style={select.item}>
                    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center"}}>
                        <Text style={select.text}>{withoutTranslate ? name : t(value + "")}</Text>
                        {mask ? <Text style={select.maskText}>{mask}</Text> : null}
                    </View>
                    {currentValue === value  
                   ? 
                   (<View style={select.checkmark}>
                        <Icon style={{ pointerEvents: "none", height: 24 }} type="antdesign" size={24} name="check" color={color ? color : "#5fb1e7"} />
                    </View>)
                    : null}
                </View>
            </Pressable>
        )
    }

    return (
        <>
            <Label style={{ marginBottom: 7 }}>{title}</Label>

            <FlatList
                contentContainerStyle={{ paddingBottom: 10 }}
                keyExtractor={keyExtractor}
                data={data}
                renderItem={({ item }) => <ListItem {...{ ...item, color, onPress: () => setValue(item.value) }} />
                }
            />
        </>
    )
});

export default SelectList;