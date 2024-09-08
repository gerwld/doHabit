import { useTranslation } from "react-i18next"
import { Text, View, Pressable, FlatList, StyleSheet } from "react-native"
import { getTheme } from "@constants"
import { Label } from "styles/crudtask"
import { Icon } from "@rneui/themed"

const SelectList = ({ data, title, currentValue, setValue, color, theme, withoutTranslate }) => {
    const { t } = useTranslation()

    const select = StyleSheet.create({
        item: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: getTheme(theme).bgHighlight,
            border: `1px solid ${getTheme(theme).borderColor}`,
            minHeight: 48,
        },
        text: {
            lineHeight: 48,
            paddingLeft: 18,
            paddingRight: 10,
            color: getTheme(theme).textColor,
        },
        checkmark: {
            marginRight: 10
        }
    })

    const ListItem = ({ value, name, onPress, color }) => {
        return (
            <Pressable onPress={onPress}>
                <View style={select.item}>
                    <Text style={select.text}>{withoutTranslate ? name : t(value + "")}</Text>
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
                contentContainerStyle={{ paddingBottom: 10 }}
                data={data}
                renderItem={({ item }) => <ListItem {...{ ...item, color, onPress: () => setValue(item.value) }} />
                }
            />
        </>
    )
}

export default SelectList;