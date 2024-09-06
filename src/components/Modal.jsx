import { StyleSheet } from 'react-native'
import { View, KeyboardAvoidingView, Modal as RNModal, Platform } from 'react-native'


const Modal = ({ isOpen, withInput, children, ...rest }) => {
    const content = withInput ? (
        <KeyboardAvoidingView
            style={styles.modalWindow}
            behavior={Platform.OS === 'ios'}
        >
            {children}
        </KeyboardAvoidingView>)
        :
        (
            <View style={styles.modalWindow}>
                {children}
            </View>
        )
    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...rest}
        >
            {content}
        </RNModal>
    )
}

const styles = StyleSheet.create({
    modalWindow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: 12,
        backgroundColor: "rgba(24, 24, 27, 0.6)"

    }
})

export default Modal;

